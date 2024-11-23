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
            this.arduinoCode += "\n" + this.visitFonction(f);
            ;
        });
        return this.arduinoCode;
    }
    visitFonction(node) {
        return this.visitReturnType(node.returnType)
            + node.name + " (" + node.parameter.map(p => this.visitParameter(p)).join(",") + ") { \n\t"
            + node.body.map(s => this.visitStatement(s)).join("\t") + "; \n}";
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
        switch (node.$type) {
            case "If":
                return this.visitIf(node);
            case "Loop":
                return this.visitLoop(node);
            case "ReturnStatement":
                return this.visitReturnStatement(node);
            case "VariableStatement":
                return this.visitVariableStatement(node);
            case "Parameter":
                return this.visitParameter(node);
            case "VariableAssignation":
                return this.visitVariableAssignation(node);
            case "SetSpeed":
                return this.visitSetSpeed(node);
            case "CallFunction":
                return this.visitCallFunction(node);
            case "Backward":
                return this.visitBackward(node);
            case "Forward":
                return this.visitForward(node);
            case "Left":
                return this.visitLeft(node);
            case "Right":
                return this.visitRight(node);
            case "Clock":
                return this.visitClock(node);
            case "ClockLeft":
                return this.visitClockLeft(node);
            default:
                return "// Unknown statement\n";
        }
    }
    visitReturnStatement(node) {
        return this.visitExpression(node.returnValue);
    }
    visitIf(node) {
        var result = "\n\tif (" + this.visitExpression(node.condition) + ") {\n\t\t"
            + node.thenStatement.map(s => this.visitStatement(s)).join("\t\t") + "}\n";
        if (node.elseStatement) {
            result += " else { \n"
                + node.elseStatement.map(s => this.visitStatement(s)).join("\t\t") + "}\n";
        }
        return result;
    }
    visitLoop(node) {
        return "\n\tloop (" + this.visitExpression(node.condition) + ") { \n\t\t"
            + node.body.map(s => this.visitStatement(s)).join("\t\t") + "}\n";
    }
    visitControlRobot(node) {
        switch (node.$type) {
            case "Movement":
                return this.visitMovement(node);
            case "Backward":
                return this.visitBackward(node);
            case "Forward":
                return this.visitForward(node);
            case "Left":
                return this.visitLeft(node);
            case "Right":
                return this.visitRight(node);
            case "Rotate":
                return this.visitRotate(node);
            case "Clock":
                return this.visitClock(node);
            case "ClockLeft":
                return this.visitClockLeft(node);
            default:
                return "// Unknown control robot\n";
        }
    }
    visitMovement(node) {
        switch (node.$type) {
            case "Backward":
                return this.visitBackward(node);
            case "Forward":
                return this.visitForward(node);
            case "Left":
                return this.visitLeft(node);
            case "Right":
                return this.visitRight(node);
            default:
                return "// Unknown movement\n";
        }
    }
    visitBackward(node) {
        const distance = this.visitExpression(node.distance);
        return `Omni.setCarAdvance(${distance});\n`;
    }
    visitForward(node) {
        const distance = this.visitExpression(node.distance);
        return `Omni.setCarBackoff(${distance});\n`;
    }
    visitLeft(node) {
        const distance = this.visitExpression(node.distance);
        return `Omni.setCarLeft(${distance});\n`;
    }
    visitRight(node) {
        const distance = this.visitExpression(node.distance);
        return `Omni.setCarRight(${distance});\n`;
    }
    visitRotate(node) {
        switch (node.$type) {
            case "Clock":
                return this.visitClock(node);
            case "ClockLeft":
                return this.visitClockLeft(node);
            default:
                return "// Unknown rotate\n";
        }
    }
    visitClock(node) {
        const angle = this.visitExpression(node.angle);
        return `Omni.setCarRotate(${angle});\n`;
    }
    visitClockLeft(node) {
        const angle = this.visitExpression(node.angle);
        return `Omni.setCarRotateLeft(${angle});\n`;
    }
    visitEntity(node) {
        switch (node.$type) {
            case "Parameter":
                return this.visitParameter(node);
            case "VariableStatement":
                return this.visitVariableStatement(node);
            default:
                return "// Unknown entity\n";
        }
    }
    visitParameter(node) {
        var result = node.type + " " + node.name;
        if (node.value != null) {
            result += " = " + this.visitValue(node.value);
        }
        return result;
    }
    visitVariableStatement(node) {
        var result = node.type + " " + node.name;
        if (node.value != null) {
            result += " = " + this.visitValue(node.value);
        }
        return result + ";\n";
    }
    visitVariableAssignation(node) {
        var _a;
        return ((_a = node.variable.ref) === null || _a === void 0 ? void 0 : _a.name) + " = " + this.visitValue(node.value) + ";\n";
    }
    visitSetSpeed(node) {
        return "Omni.setMotorAllAdvance(" + this.visitExpression(node.distance) + ");\n";
    }
    visitCallFunction(node) {
        var _a;
        return ((_a = node.fonction.ref) === null || _a === void 0 ? void 0 : _a.name) + "(" + node.args.map(p => this.visitExpression(p)).join(",") + ");\n";
    }
    visitExpression(node) {
        switch (node.$type) {
            case "UnaryBooleanExpression":
                return this.visitUnaryBooleanExpression(node);
            case "CallEntity":
                return this.visitCallEntity(node);
            case "CallFunctionExpr":
                return this.visitCallFunctionExpr(node);
            case "GetSensor":
                return this.visitGetSensor(node);
            case "Value":
                return this.visitValue(node);
            case "ArithmeticExpression":
                return this.visitArithmeticExpression(node);
            case "BooleanExpression":
                return this.visitBooleanExpression(node);
            default:
                return "// Unknown expression\n";
        }
    }
    visitUnaryBooleanExpression(node) {
        return node;
    }
    visitUnaryArithmeticExpression(node) {
        switch (node.$type) {
            case "CallFunctionExpr":
                return this.visitCallFunctionExpr(node);
            case "CallEntity":
                return this.visitCallEntity(node);
            case "GetSensor":
                return this.visitGetSensor(node);
            case "Value":
                return this.visitValue(node);
            default:
                return "// Unknown unary arithmetic expression\n";
        }
    }
    visitCallFunctionExpr(node) {
        var _a;
        return ((_a = node.fonction.ref) === null || _a === void 0 ? void 0 : _a.name) + "(" + node.args.map(p => this.visitExpression(p)).join(",") + ")";
    }
    visitCallEntity(node) {
        var _a;
        return this.visitExpression((_a = node.entity.ref) === null || _a === void 0 ? void 0 : _a.value);
    }
    visitGetSensor(node) {
        return node;
    }
    visitValue(node) {
        return node.value;
    }
    visitArithmeticExpression(node) {
        var result = this.visitUnaryArithmeticExpression(node.leftOperand);
        let count = 0;
        node.operator.forEach(() => {
            count++;
        });
        for (let i = 0; i < count; i++) {
            result += " " + this.visitArithmeticOperator(node.operator[i]) + " "
                + this.visitUnaryArithmeticExpression(node.rightOperand[i]);
        }
        return result;
    }
    visitArithmeticOperator(node) {
        switch (node.$type) {
            case "Add":
                return this.visitAdd(node);
            case "Sub":
                return this.visitSub(node);
            case "Multiply":
                return this.visitMultiply(node);
            case "Divise":
                return this.visitDivise(node);
            default:
                return "";
        }
    }
    visitAdd(node) {
        return "+";
    }
    visitSub(node) {
        return "-";
    }
    visitMultiply(node) {
        return "*";
    }
    visitDivise(node) {
        return "/";
    }
    visitBooleanExpression(node) {
        return this.visitUnaryArithmeticExpression(node.leftCondition) + " "
            + this.visitBooleanOperator(node.operator) + " "
            + this.visitUnaryArithmeticExpression(node.rightCondition);
    }
    visitBooleanOperator(node) {
        switch (node.$type) {
            case "LowerThan":
                return this.visitLowerThan(node);
            case "EqualTo":
                return this.visitEqualTo(node);
            case "UpperThan":
                return this.visitUpperThan(node);
            case "Not":
                return this.visitNot(node);
            case "Or":
                return this.visitOr(node);
            case "LowerOrEqualTo":
                return this.visitLowerOrEqualTo(node);
            case "UpperOrEqualTo":
                return this.visitUpperOrEqualTo(node);
            case "And":
                return this.visitAnd(node);
            default:
                return "";
        }
    }
    visitLowerThan(node) {
        return "<";
    }
    visitEqualTo(node) {
        return "===";
    }
    visitUpperThan(node) {
        return ">";
    }
    visitNot(node) {
        return "!";
    }
    visitOr(node) {
        return "||";
    }
    visitLowerOrEqualTo(node) {
        return "<=";
    }
    visitUpperOrEqualTo(node) {
        return ">=";
    }
    visitAnd(node) {
        return "&&";
    }
}
//# sourceMappingURL=compiler.js.map