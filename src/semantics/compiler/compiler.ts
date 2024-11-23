import { Add, And, ArithmeticExpression, ArithmeticOperator, Backward, BooleanExpression, BooleanOperator, CallEntity, CallFunction, CallFunctionExpr, Clock, ClockLeft, ControlRobot, Divise, Entity, EqualTo, Expression, Fonction, Forward, GetSensor, If, Left, Loop, LowerOrEqualTo, LowerThan, Movement, Multiply, Not, Or, Parameter, Program, ReturnStatement, ReturnType, Right, Rotate, SetSpeed, Statement, Sub, UnaryArithmeticExpression, UnaryBooleanExpression, UpperOrEqualTo, UpperThan, Value, VariableAssignation, VariableStatement } from "../../language/generated/ast.js";
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


`;
    
    visitProgram(node : Program) : any {
        node.fonction.map(f => {
            this.arduinoCode += this.visitFonction(f as Fonction);;
        })
        return this.arduinoCode
    }
	
    visitFonction(node : Fonction) : any {
        return this.visitReturnType(node.returnType as ReturnType)
        + node.name + " (" + node.parameter.map(p => this.visitParameter(p as Parameter)).join(",") + ") { \n\t" 
        + node.body.map(s => this.visitStatement(s as Statement)).join("; \n\t") + "; \n}\n";
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
        return "Ok \n";
    }
	
    visitReturnStatement(node : ReturnStatement) : any{
        return this.visitExpression(node.returnValue as Expression);
    }
	
    visitIf(node : If) : any {
        var result = "if (" + this.visitExpression(node.condition as BooleanExpression) + ") { \n" 
        + node.thenStatement.map(s => this.visitStatement(s as Statement)).join("; \n\t") + "}\n";

        if (node.elseStatement) {
            result += " else { \n" 
            + node.elseStatement.map(s => this.visitStatement(s as Statement)).join("; \n\t") + "}\n";
        }
        return result;
    }
	
    visitLoop(node : Loop) : any {
        return "loop (" + this.visitExpression(node.condition as BooleanExpression) + ") { \n\t" 
        + node.body.map(s => this.visitStatement(s as Statement)).join("; \n\t") + "}\n"; 
    }
	
    visitControlRobot(node : ControlRobot) : any {
        return "Ok \n";
    }
	
    visitMovement(node : Movement) : any {}
	
    visitBackward(node : Backward) : any {}
	
    visitForward(node : Forward) : any {}
	
    visitLeft(node : Left) : any {}
	
    visitRight(node : Right) : any {}
	
    visitRotate(node : Rotate) : any {}
	
    visitClock(node : Clock) : any {}
	
    visitClockLeft(node : ClockLeft) : any {}
	
    visitEntity(node : Entity) : any {
        return "Ok \n";
    }
	
    visitParameter(node : Parameter) : any {
        var result = node.type + " " + node.name;
        if (node.value != null) {
            result += " = " + this.visitValue(node.value as Value) + ";\n";
        }
        return result;
    }
	
    visitVariableStatement(node : VariableStatement) : any {
        var result = node.type + " " + node.name;
        if (node.value != null) {
            result += " = " + this.visitValue(node.value as Value) + ";\n";
        }
        return result;
    }
	
    visitVariableAssignation(node : VariableAssignation) : any {
        return node.variable.ref?.name + " = " + this.visitValue(node.value as Value) + ";\n";
    }
	
    visitSetSpeed(node : SetSpeed) : any {}
	
    visitCallFunction(node : CallFunction) : any {
        return node.fonction.ref?.name + "(" + node.args.map(p => this.visitExpression(p as Expression)).join(",") + ");\n";
    }
	
    visitExpression(node : Expression) : any {
        return "Ok \n";
    }
	
    visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any {}
	
    visitUnaryArithmeticExpression(node : UnaryArithmeticExpression) : any {}
	
    visitCallFunctionExpr(node : CallFunctionExpr) : any {
        return node.fonction.ref?.name + "(" + node.args.map(p => this.visitExpression(p as Expression)).join(",") + ")";
    }
	
    visitCallEntity(node : CallEntity) : any {}
	
    visitGetSensor(node : GetSensor) : any {}
	
    visitValue(node : Value) : any {
        return "VALUE \n";
    }
	
    visitArithmeticExpression(node : ArithmeticExpression) : any {
        var result = this.visitUnaryArithmeticExpression(node.leftOperand as UnaryArithmeticExpression);
        let count = 0;
        node.operator.forEach(()=> {
            count++;
        })
        for (let i = 0; i < count; i++) {
            result += " " + this.visitArithmeticOperator(node.operator[i] as ArithmeticOperator) + " " 
            + this.visitUnaryArithmeticExpression(node.rightOperand[i] as UnaryArithmeticExpression);
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
                return "";
        }
    }
	
    visitAdd(node : Add) : any {
        return "+";
    }
	
    visitSub(node : Sub) : any {
        return "-";
    }
	
    visitMultiply(node : Multiply) : any {
        return "*";
    }
	
    visitDivise(node : Divise) : any {
        return "/";
    }
	
    visitBooleanExpression(node : BooleanExpression) : any {
        return this.visitUnaryArithmeticExpression(node.leftCondition as UnaryArithmeticExpression) + " " 
        + this.visitBooleanOperator(node.operator as BooleanOperator) + " " 
        + this.visitUnaryArithmeticExpression(node.rightCondition as UnaryArithmeticExpression) + ";\n";
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
                return "";
        }
    }
	
    visitLowerThan(node : LowerThan) : any {
        return "<";
    }
	
    visitEqualTo(node : EqualTo) : any {
        return "===";
    }
	
    visitUpperThan(node : UpperThan) : any {
        return ">";
    }
	
    visitNot(node : Not) : any {
        return "!";
    }
	
    visitOr(node : Or) : any {
        return "||";
    }
	
    visitLowerOrEqualTo(node : LowerOrEqualTo) : any {
        return "<=";
    }
	
    visitUpperOrEqualTo(node : UpperOrEqualTo) : any {
        return ">=";
    }
	
    visitAnd(node : And) : any {
        return "&&";
    }
}