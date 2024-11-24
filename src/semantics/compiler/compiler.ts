import { Add, And, ArithmeticExpression, ArithmeticOperator, Backward, BooleanExpression, BooleanOperator, CallEntity, CallFunction, CallFunctionExpr, Clock, ClockLeft, ControlRobot, Divise, Entity, EqualTo, Expression, Fonction, Forward, GetDistance, GetSensor, GetSpeed, GetTimestamp, If, Left, Loop, LowerOrEqualTo, LowerThan, Movement, Multiply, Not, Or, Parameter, Program, ReturnStatement, ReturnType, Right, Rotate, SetSpeed, Statement, Sub, UnaryArithmeticExpression, UnaryBooleanExpression, Unit, UpperOrEqualTo, UpperThan, Value, VariableAssignation, VariableStatement } from "../../language/generated/ast.js";
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
            this.arduinoCode += "\n" + this.visitFonction(f as Fonction);;
        })
        return this.arduinoCode
    }
	
    visitFonction(node : Fonction) : any {
        return this.visitReturnType(node.returnType as ReturnType)
        + node.name + " (" + node.parameter.map(p => this.visitParameter(p as Parameter)).join(",") + ") { \n\t" 
        + node.body.map(s => this.visitStatement(s as Statement)).join("\t") + "\n}\n";
    }
	
    visitReturnType(node : ReturnType) : any {
        switch (node.returnType) {
            case "number":
                return "float ";
            case "boolean":
                return "bool ";
            default:
                return "void ";
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
                return "// Unknown statement\n";
        }
    }
	
    visitReturnStatement(node : ReturnStatement) : any{
        return 'return ' + this.visitExpression(node.returnValue as Expression) + ";";
    }
	
    visitIf(node : If) : any {
        var result = "\n\tif (" + this.visitExpression(node.condition as BooleanExpression) + ") {\n\t\t" 
        + node.thenStatement.map(s => this.visitStatement(s as Statement)).join("\t\t") + "}\n";

        if (node.elseStatement) {
            result += " else { \n" 
            + node.elseStatement.map(s => this.visitStatement(s as Statement)).join("\t\t") + "}\n";
        }
        return result;
    }
	
    visitLoop(node : Loop) : any {
        return "\n\tloop (" + this.visitExpression(node.condition as BooleanExpression) + ") { \n\t\t" 
        + node.body.map(s => this.visitStatement(s as Statement)).join("\t\t") + "\n\t}\n"; 
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
                return "// Unknown control robot\n";
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
                return "// Unknown movement\n";
        }
    }
	
    visitBackward(node : Backward) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return"_backward(" + distanceToMillimeter + ");\n";
    }
	
    visitForward(node : Forward) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return "_forward(" + distanceToMillimeter + ");\n";
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
                return "// Unknown rotate\n";
        }
    }
	
    visitClock(node : Clock) : any {
        const angle = this.visitExpression(node.angle as Expression);
        return "_rotate(" + angle + ");\n";
        
    }
	
    visitClockLeft(node : ClockLeft) : any {
        const angle = -this.visitExpression(node.angle as Expression);
        return "_rotate(" + angle + ");\n";
    }
	
    visitEntity(node : Entity) : any {
        switch (node.$type) {
            case "Parameter":
                return this.visitParameter(node as Parameter);
            case "VariableStatement":
                return this.visitVariableStatement(node as VariableStatement);
            default:
                return "// Unknown entity\n";
        }
    }
	
    visitParameter(node : Parameter) : any {
        var result = node.type + " " + node.name;
        if (node.value != null) {
            result += " = " + this.visitValue(node.value as Value);
        }
        return result;
    }
	
    visitVariableStatement(node : VariableStatement) : any {
        var result = node.type + " " + node.name;
        if (node.value != null) {
            result += " = " + this.visitValue(node.value as Value);
        }
        return result + ";\n";
    }
	
    visitVariableAssignation(node : VariableAssignation) : any {
        return node.variable.ref?.name + " = " + this.visitValue(node.value as Value) + ";\n";
    }
	
    visitSetSpeed(node : SetSpeed) : any {
        const distance = this.visitExpression(node.distance as Expression);
        const distanceInMillimeter = this.toMillimeter(distance, node.unit);
        return "Omni.setCarSpeedMMPS(" + distanceInMillimeter + ", 9999);\n";
    }
	
    visitCallFunction(node : CallFunction) : any {
        return node.fonction.ref?.name + "(" + node.args.map(p => this.visitExpression(p as Expression)).join(",") + ");\n";
    }
	
    visitExpression(node : Expression) : any {
        switch (node.$type) {
            case "ArithmeticExpression":
                return this.visitArithmeticExpression(node as ArithmeticExpression);
            case "UnaryArithmeticExpression":
                return this.visitUnaryArithmeticExpression(node as UnaryArithmeticExpression);
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
                return "// Unknown expression\n";
        }
    }
	
    visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any {
        return node;
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
                return "// Unknown unary arithmetic expression\n";
        }
    }
	
    visitCallFunctionExpr(node : CallFunctionExpr) : any {
        return node.fonction.ref?.name + "(" + node.args.map(p => this.visitExpression(p as Expression)).join(",") + ")";
    }
	
    visitCallEntity(node : CallEntity) : any {
        return node.entity.ref?.name;
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
                return "// Unknown get sensor\n";
        }
    }

    visitGetDistance(node : GetDistance) : any {
        return 0;
    }
    
    visitGetSpeed(node : GetSpeed) : any {
        return "Omni.getCarSpeedMMPS()";
    }
    
    visitGetTimestamp(node : GetTimestamp) : any {
        return "Omni.getTimestamp()";
    }
	
    visitValue(node : Value) : any {
        return node.value;
    }
	
    visitArithmeticExpression(node : ArithmeticExpression) : any {
        const leftValue = this.visitUnaryArithmeticExpression(node.leftOperand as UnaryArithmeticExpression);
        const rightValues = node.rightOperand.map(operand => this.visitUnaryArithmeticExpression(operand as UnaryArithmeticExpression));
        const operator = node.operator;
        let compt =-1;
        let result = leftValue;

        for (const rightValue of rightValues) {
            compt++
            result = result + operator[compt] + rightValue;
        }

        return result;
    }
	
    visitArithmeticOperator(node : ArithmeticOperator) : any {
        switch (node.$type) {
            case "Add":
                return this.visitAdd(node as Add);
            case "Sub":
                return this.visitSub(node as Sub);
            case "Multiply":
                return this.visitMultiply(node as Multiply);
            case "Divise":
                return this.visitDivise(node as Divise);
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

        return leftValue + " " + operator + " " + rightValue;
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
                return "Operator not found";
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