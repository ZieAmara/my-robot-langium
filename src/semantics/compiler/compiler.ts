import { Add, AddSubExpression, AddSubOperator, And, ArithmeticExpression, Backward, BooleanExpression, BooleanOperator, CallEntity, CallFunction, CallFunctionExpr, Clock, ClockLeft, ControlRobot, Divise, Entity, EqualTo, Expression, Fonction, Forward, GetDistance, GetSensor, GetSpeed, GetTimestamp, If, Left, Loop, LowerOrEqualTo, LowerThan, Movement, MultiDivExpression, MultiDivOperator, Multiply, Not, Or, Parameter, Program, ReturnStatement, ReturnType, Right, Rotate, SetSpeed, Statement, Sub, UnaryArithmeticExpression, UnaryBooleanExpression, Unit, UpperOrEqualTo, UpperThan, Value, VariableAssignation, VariableStatement } from "../../language/generated/ast.js";
import { Visitor } from "../../language/visitorGenerator/visitor.js";

export class CompilerVisitor implements Visitor {
    private arduinoCode = `
#include <PinChangeInt.h>
#include <PinChangeIntConfig.h>
#include <EEPROM.h>
#define _NAMIKI_MOTOR	 //for Namiki 22CL-103501PG80:1
#include <fuzzy_table.h>
#include <PID_Beta6.h>
#include <MotorWheel.h>
#include <Omni4WD.h>

//#include <fuzzy_table.h>
//#include <PID_Beta6.h>

/*

            \                    /
   wheel1   \                    /   wheel4
   Left     \                    /   Right


                              power switch

            /                    \
   wheel2   /                    \   wheel3
   Right    /                    \   Left

*/

/*
  irqISR(irq1,isr1);
  MotorWheel wheel1(5,4,12,13,&irq1);

  irqISR(irq2,isr2);
  MotorWheel wheel2(6,7,14,15,&irq2);

  irqISR(irq3,isr3);
  MotorWheel wheel3(9,8,16,17,&irq3);

  irqISR(irq4,isr4);
  MotorWheel wheel4(10,11,18,19,&irq4);
*/

irqISR(irq1, isr1);
MotorWheel wheel1(3, 2, 4, 5, &irq1);

irqISR(irq2, isr2);
MotorWheel wheel2(11, 12, 14, 15, &irq2);

irqISR(irq3, isr3);
MotorWheel wheel3(9, 8, 16, 17, &irq3);

irqISR(irq4, isr4);
MotorWheel wheel4(10, 7, 18, 19, &irq4);


Omni4WD Omni(&wheel1, &wheel2, &wheel3, &wheel4);

void setup() {
  //TCCR0B=TCCR0B&0xf8|0x01;    // warning!! it will change millis()
  TCCR1B = TCCR1B & 0xf8 | 0x01; // Pin9,Pin10 PWM 31250Hz
  TCCR2B = TCCR2B & 0xf8 | 0x01; // Pin3,Pin11 PWM 31250Hz

  Omni.PIDEnable(0.31, 0.01, 0, 10);
}

void _forward(int distance) {
    Omni.setCarAdvance(Omni.getCarSpeedMMPS());
    Omni.delayMS(distance/Omni.getCarSpeedMMPS()*1000);
    Omni.setCarStop();
}

void _backward(int distance) {
    Omni.setCarBackoff(Omni.getCarSpeedMMPS());
    Omni.delayMS(distance/Omni.getCarSpeedMMPS()*1000);
    Omni.setCarStop();
}

void _left(int distance) {
    Omni.setCarLeft(Omni.getCarSpeedMMPS());
    Omni.delayMS(distance/Omni.getCarSpeedMMPS()*1000);
    Omni.setCarStop();
}

void _right(int distance) {
    Omni.setCarRight(Omni.getCarSpeedMMPS());
    Omni.delayMS(distance/Omni.getCarSpeedMMPS()*1000);
    Omni.setCarStop();
}

void _rotate(int angle) {
    if (angle > 0) {
        Omni.setCarRotateRight(Omni.getCarSpeedMMPS());
    } else {
        Omni.setCarRotateLeft(Omni.getCarSpeedMMPS());
    }

    int circumference = wheel1.getCirMM();
    int distance = (angle / 360.0) * circumference;
    int timeToWait = (distance / Omni.getCarSpeedMMPS()) * 1000;
    Omni.delayMS(timeToWait);
    Omni.setCarStop();
}

`;
    
    visitProgram(node : Program) : any {
        node.fonction.map(f => {
            this.arduinoCode += `\n${this.visitFonction(f as Fonction)}`;
        })
        return this.arduinoCode
    }
	
    visitFonction(node : Fonction) : any {
        const returnType = this.visitReturnType(node.returnType as ReturnType);
        const name = node.name;
        const parameter = node.parameter.map(p => this.visitParameter(p as Parameter)).join(",");
        const body = node.body.map(s => this.visitStatement(s as Statement)).join("\t");
        return returnType + name + `(${parameter}) { \n\t${body} \n}\n`;
    }
	
    visitReturnType(node : ReturnType) : any {
        switch (node.returnType) {
            case "number":
                return `float `;
            case "boolean":
                return `bool `;
            default:
                return `void `;
        }
    }
	
    visitStatement(node : Statement) : any {
        switch (node.$type) {
            case "If":
                return this.visitIf(node as If);
            case "Loop":
                return this.visitLoop(node as Loop);
            case "ReturnStatement":
                return this.visitReturnStatement(node as ReturnStatement);
            case "VariableStatement":
                return this.visitVariableStatement(node as VariableStatement);
            case "Parameter":
                return this.visitParameter(node as Parameter);
            case "VariableAssignation":
                return this.visitVariableAssignation(node as VariableAssignation);
            case "SetSpeed":
                return this.visitSetSpeed(node as SetSpeed);
            case "CallFunction":
                return this.visitCallFunction(node as CallFunction);
            case "Backward":
                return this.visitBackward(node as Backward);
            case "Forward":
                return this.visitForward(node as Forward);
            case "Left":
                return this.visitLeft(node as Left);
            case "Right":
                return this.visitRight(node as Right);
            case "Clock":
                return this.visitClock(node as Clock);
            case "ClockLeft":
                return this.visitClockLeft(node as ClockLeft);
            default:
                return `Unknown statement ${node.$type};\n`;
        }
    }
	
    visitReturnStatement(node : ReturnStatement) : any{
        const returnValue = this.visitExpression(node.returnValue as Expression);
        return `return ${returnValue};\n`;
    }
	
    visitIf(node : If) : any {
        const condition = this.visitExpression(node.condition as BooleanExpression);
        var body = `${node.thenStatement.map(s => this.visitStatement(s as Statement)).join("\t\t")}\t}`;

        if (node.elseStatement) {
            body += ` else { \n\t\t${node.elseStatement.map(s => this.visitStatement(s as Statement)).join("\t\t")}`;
        }
        return `\n\tif (${condition}) {\n\t\t${body}\t}\n`;
    }
	
    visitLoop(node : Loop) : any {
        const condition = this.visitExpression(node.condition as BooleanExpression);
        const body = node.body.map(s => this.visitStatement(s as Statement)).join("\t\t");
        return `\n\tloop (${condition}) {\n\t\t${body}\t}\n`;
    }
	
    visitControlRobot(node : ControlRobot) : any {
        switch (node.$type) {
            case "Movement":
                return this.visitMovement(node as Movement);
            case "Backward":
                return this.visitBackward(node as Backward);
            case "Forward":
                return this.visitForward(node as Forward);
            case "Left":
                return this.visitLeft(node as Left);
            case "Right":
                return this.visitRight(node as Right);
            case "Rotate":
                return this.visitRotate(node as Rotate);
            case "Clock":
                return this.visitClock(node as Clock);
            case "ClockLeft":
                return this.visitClockLeft(node as ClockLeft);
            default:
                return `Unknown control robot ${node.$type};\n`;
        }
    }
	
    visitMovement(node : Movement) : any {
        switch (node.$type) {
            case "Backward":
                return this.visitBackward(node as Backward);
            case "Forward":
                return this.visitForward(node as Forward);
            case "Left":
                return this.visitLeft(node as Left);
            case "Right":
                return this.visitRight(node as Right);
            default:
                return `Unknown movement ${node.$type};\n`;
        }
    }
	
    visitBackward(node : Backward) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `_backward(${distanceToMillimeter});\n`;
    }
	
    visitForward(node : Forward) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `_forward(${distanceToMillimeter});\n`;
    }
	
    visitLeft(node : Left) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `Omni.setCarLeft(${distanceToMillimeter});\n`;
    }
	
    visitRight(node : Right) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `Omni.setCarRight(${distanceToMillimeter});\n`;
    }
	
    visitRotate(node : Rotate) : any {
        switch (node.$type) {
            case "Clock":
                return this.visitClock(node as Clock);
            case "ClockLeft":
                return this.visitClockLeft(node as ClockLeft);
            default:
                return `Unknown rotate ${node.$type};\n`;
        }
    }
	
    visitClock(node : Clock) : any {
        const angle = this.visitExpression(node.angle as Expression);
        return `_rotate(${angle});\n`;
        
    }
	
    visitClockLeft(node : ClockLeft) : any {
        const angle = -this.visitExpression(node.angle as Expression);
        return `_rotate(${angle});\n`;
    }
	
    visitEntity(node : Entity) : any {
        switch (node.$type) {
            case "Parameter":
                return this.visitParameter(node as Parameter);
            case "VariableStatement":
                return this.visitVariableStatement(node as VariableStatement);
            default:
                return `Unknown entity ${node.$type};\n`;
        }
    }
	
    visitParameter(node : Parameter) : any {
        const type = node.type;
        const name = node.name;
        var value = ``;
        if (node.value != null) {
            value = this.visitValue(node.value as Value);
            return `${type} ${name} = ${value}`
        }
        return `${type} ${name}`;
    }
	
    visitVariableStatement(node : VariableStatement) : any {
        const type = (node.type.toString() === 'cm'|| node.type.toString() === 'mm' || node.type.toString() === 'm') 
                    ? `number` : node.type;
        const name = node.name;
        var value = ``;
        if (node.value != null) {
            value = this.visitExpression(node.value as Expression);
            return `${type} ${name} = ${value};\n`
        }
        return `${type} ${name};\n`;
    }
	
    visitVariableAssignation(node : VariableAssignation) : any {
        if (node.variable.ref) {
            const name = node.variable.ref.name;
            const value = this.visitExpression(node.value as Expression);
            return `${name} = ${value};\n`;
        }
        return `Variable not found;\n`;
    }
	
    visitSetSpeed(node : SetSpeed) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceInMillimeter = this.toMillimeter(distance, node.unit);
        return `Omni.setCarSpeedMMPS(${distanceInMillimeter}, 9999);\n`
    }
	
    visitCallFunction(node : CallFunction) : any {
        var args = ``;
        if (node.fonction.ref) {
            const name = node.fonction.ref.name;
            if (node.args != null) {
                args = node.args.map(p => this.visitExpression(p as Expression)).join(",");
                return `${name}();\n`;
            }
            return `${name}(${args});\n`;
        }
        return `Function not found;\n`;
    }
	
    visitExpression(node : Expression) : any {
        switch (node.$type) {
            case "ArithmeticExpression":
                return this.visitArithmeticExpression(node as ArithmeticExpression);
            case "UnaryArithmeticExpression":
                return this.visitUnaryArithmeticExpression(node as UnaryArithmeticExpression);
            case "AddSubExpression":
                return this.visitAddSubExpression(node as AddSubExpression);
            case "MultiDivExpression":
                return this.visitMultiDivExpression(node as MultiDivExpression);
            case "BooleanExpression":
                return this.visitBooleanExpression(node as BooleanExpression);
            case "UnaryBooleanExpression":
                return this.visitUnaryBooleanExpression(node as UnaryBooleanExpression);
            case "CallEntity":
                return this.visitCallEntity(node as CallEntity);
            case "CallFunctionExpr":
                return this.visitCallFunctionExpr(node as CallFunctionExpr);
            case "GetSensor":
                return this.visitGetSensor(node as GetSensor);
            case "GetDistance":
                return this.visitGetDistance(node as GetDistance);
            case "GetSpeed":
                return this.visitGetSpeed(node as GetSpeed);
            case "GetTimestamp":
                return this.visitGetTimestamp(node as GetTimestamp);
            case "Value":
                return this.visitValue(node as Value);
            default:
                return `Unknown expression ${node.$type};\n`;
        }
    }
	
    visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any {
        return node.value;
    }
	
    visitUnaryArithmeticExpression(node : UnaryArithmeticExpression) : any {
        switch (node.$type) {
            case "CallFunctionExpr":
                return this.visitCallFunctionExpr(node as CallFunctionExpr);
            case "CallEntity":
                return this.visitCallEntity(node as CallEntity);
            case "GetSensor":
                return this.visitGetSensor(node as GetSensor);
            case "GetDistance":
                return this.visitGetDistance(node as GetDistance);
            case "GetSpeed":
                return this.visitGetSpeed(node as GetSpeed);
            case "GetTimestamp":
                return this.visitGetTimestamp(node as GetTimestamp);
            case "Value":
                return this.visitValue(node as Value);
            default:
                return `Unknown unaryArithmeticExpression ${node.$type};\n`;
        }
    }
	
    visitCallFunctionExpr(node : CallFunctionExpr) : any {
        const args = node.args.map(p => this.visitExpression(p as Expression)).join(",");
        if (node.fonction.ref) {
            const name = node.fonction.ref.name;
            return `${name}(${args})`;
        }
        return `Function not found;\n`;
    }
	
    visitCallEntity(node : CallEntity) : any {
        if (!node.entity.ref) {
            return `Entity not found;\n`;
        }
        return `${node.entity.ref.name}`;
    }
    
    visitGetSensor(node : GetSensor) : any {
        switch (node.$type) {
            case "GetDistance":
                return this.visitGetDistance(node as GetDistance);
            case "GetSpeed":
                return this.visitGetSpeed(node as GetSpeed);
            case "GetTimestamp":
                return this.visitGetTimestamp(node as GetTimestamp);
            default:
                return `Unknown sensor ${node.$type}`;
        }
    }

    visitGetDistance(node : GetDistance) : any {
        return 0;
    }
    
    visitGetSpeed(node : GetSpeed) : any {
        return `Omni.getCarSpeedMMPS()`;
    }
    
    visitGetTimestamp(node : GetTimestamp) : any {
        return `Omni.getTimestamp()`;
    }
	
    visitValue(node : Value) : any {
        return node.value;
    }
	
    visitArithmeticExpression(node : ArithmeticExpression) : any {
        switch (node.$type) {
            case "AddSubExpression":
                return this.visitAddSubExpression(node as AddSubExpression);
            case "MultiDivExpression":
                return this.visitMultiDivExpression(node as MultiDivExpression);
            default:
                return `Unknown arithmeticExpression ${node.$type};\n`;
        }
    }

    visitAddSubExpression(node : AddSubExpression) : any {
        const leftValue = this.visitMultiDivExpression(node.leftOperand as MultiDivExpression);
        const rightValues = node.rightOperand.map(operand => this.visitMultiDivExpression(operand as MultiDivExpression));
        const operators = node.operator.map(operator => this.visitAddSubOperator(operator as AddSubOperator));
        
        let exp = leftValue;

        for (let i = 0; i < rightValues.length; i++) {
            const operator = operators[i];
            const rightValue = rightValues[i];

            exp = `${exp} ${operator} ${rightValue}`;
        }
        return exp;        
    }
    
    visitMultiDivExpression(node : MultiDivExpression) : any {
        const leftValue = this.visitUnaryArithmeticExpression(node.leftOperand as UnaryArithmeticExpression);
        const rightValues = node.rightOperand.map(operand => this.visitUnaryArithmeticExpression(operand as UnaryArithmeticExpression));
        const operators = node.operator.map(operator => this.visitMultiDivOperator(operator as MultiDivOperator));

        let compt=-1;
        let exp = leftValue;

        for (let rightValue of rightValues) {
            compt++;
            exp = `${exp} ${operators[compt]} ${rightValue}`;
        }
        return exp;

    }
	
    visitAddSubOperator(node : AddSubOperator) : any {
        switch (node.$type) {
            case "Add":
                return this.visitAdd(node as Add);
            case "Sub":
                return this.visitSub(node as Sub);
            default:
                return "Operator not found";
        }
    }
	
    visitAdd(node : Add) : any {
        return node.symbole;
    }
	
    visitSub(node : Sub) : any {
        return node.symbole;
    }

    visitMultiDivOperator(node : MultiDivOperator) : any {
        switch (node.$type) {
            case "Multiply":
                return this.visitMultiply(node as Multiply);
            case "Divise":
                return this.visitDivise(node as Divise);
            default:
                return "Operator not found";
        }
    }

	
    visitMultiply(node : Multiply) : any {
        return node.symbole;
    }
	
    visitDivise(node : Divise) : any {
        return node.symbole;
    }
	
    visitBooleanExpression(node : BooleanExpression) : any {
        const leftValue = this.visitUnaryArithmeticExpression(node.leftCondition as UnaryArithmeticExpression);
        const rightValue = this.visitUnaryArithmeticExpression(node.rightCondition as UnaryArithmeticExpression);
        const operator = this.visitBooleanOperator(node.operator as BooleanOperator);

        return `${leftValue} ${operator} ${rightValue}`;
    }
	
    visitBooleanOperator(node : BooleanOperator) : any {
        switch (node.$type) {
            case "LowerThan":
                return this.visitLowerThan(node as LowerThan);
            case "EqualTo":
                return this.visitEqualTo(node as EqualTo);
            case "UpperThan":
                return this.visitUpperThan(node as UpperThan);
            case "Not":
                return this.visitNot(node as Not);
            case "Or":
                return this.visitOr(node as Or);
            case "LowerOrEqualTo":
                return this.visitLowerOrEqualTo(node as LowerOrEqualTo);
            case "UpperOrEqualTo":
                return this.visitUpperOrEqualTo(node as UpperOrEqualTo);
            case "And":
                return this.visitAnd(node as And);
            default:
                return `Unknown operator ${node.$type}`;
        }
    }
	
    visitLowerThan(node : LowerThan) : any {
        return node.symbole;
    }
	
    visitEqualTo(node : EqualTo) : any {
        return node.symbole;
    }
	
    visitUpperThan(node : UpperThan) : any {
        return node.symbole;
    }
	
    visitNot(node : Not) : any {
        return node.symbole;
    }
	
    visitOr(node : Or) : any {
        return node.symbole;
    }
	
    visitLowerOrEqualTo(node : LowerOrEqualTo) : any {
        return node.symbole;
    }
	
    visitUpperOrEqualTo(node : UpperOrEqualTo) : any {
        return node.symbole;
    }
	
    visitAnd(node : And) : any {
        return node.symbole;
    }

    private toMillimeter(distance: number, unit: Unit): number {
        switch (unit) {
            case "cm":
                return distance * 10;
            case "m":
                return distance * 1000;
            default:
                return distance
        }
    }

}