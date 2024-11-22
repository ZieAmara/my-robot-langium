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
        + node.name + " (" + node.parameter.map(p => this.visitParameter(p as Parameter)).join(",") + ") { \n" 
        + node.body.map(s => this.visitStatement(s as Statement)).join("; \n") + "}";
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
        return "Ok";
    }
	
    visitReturnStatement(node : ReturnStatement) : any{}
	
    visitIf(node : If) : any {}
	
    visitLoop(node : Loop) : any {}
	
    visitControlRobot(node : ControlRobot) : any {}
	
    visitMovement(node : Movement) : any {}
	
    visitBackward(node : Backward) : any {}
	
    visitForward(node : Forward) : any {}
	
    visitLeft(node : Left) : any {}
	
    visitRight(node : Right) : any {}
	
    visitRotate(node : Rotate) : any {}
	
    visitClock(node : Clock) : any {}
	
    visitClockLeft(node : ClockLeft) : any {}
	
    visitEntity(node : Entity) : any {}
	
    visitParameter(node : Parameter) : any {
        return "Ok";
    }
	
    visitVariableStatement(node : VariableStatement) : any {}
	
    visitVariableAssignation(node : VariableAssignation) : any {}
	
    visitSetSpeed(node : SetSpeed) : any {}
	
    visitCallFunction(node : CallFunction) : any {}
	
    visitExpression(node : Expression) : any {}
	
    visitUnaryBooleanExpression(node : UnaryBooleanExpression) : any {}
	
    visitUnaryArithmeticExpression(node : UnaryArithmeticExpression) : any {}
	
    visitCallFunctionExpr(node : CallFunctionExpr) : any {}
	
    visitCallEntity(node : CallEntity) : any {}
	
    visitGetSensor(node : GetSensor) : any {}
	
    visitValue(node : Value) : any {}
	
    visitArithmeticExpression(node : ArithmeticExpression) : any {}
	
    visitArithmeticOperator(node : ArithmeticOperator) : any {}
	
    visitAdd(node : Add) : any {}
	
    visitSub(node : Sub) : any {}
	
    visitMultiply(node : Multiply) : any {}
	
    visitDivise(node : Divise) : any {}
	
    visitBooleanExpression(node : BooleanExpression) : any {}
	
    visitBooleanOperator(node : BooleanOperator) : any {}
	
    visitLowerThan(node : LowerThan) : any {}
	
    visitEqualTo(node : EqualTo) : any {}
	
    visitUpperThan(node : UpperThan) : any {}
	
    visitNot(node : Not) : any {}
	
    visitOr(node : Or) : any {}
	
    visitLowerOrEqualTo(node : LowerOrEqualTo) : any {}
	
    visitUpperOrEqualTo(node : UpperOrEqualTo) : any {}
	
    visitAnd(node : And) : any {}
}