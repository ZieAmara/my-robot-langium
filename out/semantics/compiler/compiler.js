export class CompilerVisitor {
    constructor() {
        this.arduinoCode = `
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
    }
    visitProgram(node) {
        node.fonction.map(f => {
            this.arduinoCode += this.visitFonction(f);
            ;
        });
        return this.arduinoCode;
    }
    visitFonction(node) {
        return this.visitReturnType(node.returnType)
            + node.name + " (" + node.parameter.map(p => this.visitParameter(p)).join(",") + ") { \n"
            + node.body.map(s => this.visitStatement(s)).join("; \n") + "}";
    }
    visitReturnType(node) {
        switch (node.returnType) {
            case "number":
                return "float ";
            case "boolean":
                return "bool ";
            default:
                return "void ";
        }
    }
    visitStatement(node) {
        return "Ok";
    }
    visitReturnStatement(node) { }
    visitIf(node) { }
    visitLoop(node) { }
    visitControlRobot(node) { }
    visitMovement(node) { }
    visitBackward(node) { }
    visitForward(node) { }
    visitLeft(node) { }
    visitRight(node) { }
    visitRotate(node) { }
    visitClock(node) { }
    visitClockLeft(node) { }
    visitEntity(node) { }
    visitParameter(node) {
        return "Ok";
    }
    visitVariableStatement(node) { }
    visitVariableAssignation(node) { }
    visitSetSpeed(node) { }
    visitCallFunction(node) { }
    visitExpression(node) { }
    visitUnaryBooleanExpression(node) { }
    visitUnaryArithmeticExpression(node) { }
    visitCallFunctionExpr(node) { }
    visitCallEntity(node) { }
    visitGetSensor(node) { }
    visitValue(node) { }
    visitArithmeticExpression(node) { }
    visitArithmeticOperator(node) { }
    visitAdd(node) { }
    visitSub(node) { }
    visitMultiply(node) { }
    visitDivise(node) { }
    visitBooleanExpression(node) { }
    visitBooleanOperator(node) { }
    visitLowerThan(node) { }
    visitEqualTo(node) { }
    visitUpperThan(node) { }
    visitNot(node) { }
    visitOr(node) { }
    visitLowerOrEqualTo(node) { }
    visitUpperOrEqualTo(node) { }
    visitAnd(node) { }
}
//# sourceMappingURL=compiler.js.map