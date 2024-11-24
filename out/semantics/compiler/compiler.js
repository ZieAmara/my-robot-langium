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
    }
    visitProgram(node) {
        node.fonction.map(f => {
            this.arduinoCode += `\n${this.visitFonction(f)}`;
        });
        return this.arduinoCode;
    }
    visitFonction(node) {
        const returnType = this.visitReturnType(node.returnType);
        const name = node.name;
        const parameter = node.parameter.map(p => this.visitParameter(p)).join(",");
        const body = node.body.map(s => this.visitStatement(s)).join("\t");
        return returnType + name + `(${parameter}) { \n\t${body} \n}\n`;
    }
    visitReturnType(node) {
        switch (node.returnType) {
            case "number":
                return `float `;
            case "boolean":
                return `bool `;
            default:
                return `void `;
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
                return `Unknown statement ${node.$type}`;
        }
    }
    visitReturnStatement(node) {
        const returnValue = this.visitExpression(node.returnValue);
        return `return ${returnValue};`;
    }
    visitIf(node) {
        const condition = this.visitExpression(node.condition);
        var body = `${node.thenStatement.map(s => this.visitStatement(s)).join(";\n\t\t")}\t}`;
        if (node.elseStatement) {
            body += ` else { \n\t\t${node.elseStatement.map(s => this.visitStatement(s)).join(";\n\t\t")}`;
        }
        return `\n\tif (${condition}) {\n\t\t${body}\t}\n`;
    }
    visitLoop(node) {
        const condition = this.visitExpression(node.condition);
        const body = node.body.map(s => this.visitStatement(s)).join(";\n\t\t");
        return `\n\tloop (${condition}) {\n\t\t${body}\n\t}\n`;
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
                return `Unknown control robot ${node.$type}`;
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
                return `Unknown movement ${node.$type}`;
        }
    }
    visitBackward(node) {
        const distance = this.visitExpression(node.distance);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `_backward(${distanceToMillimeter})`;
    }
    visitForward(node) {
        const distance = this.visitExpression(node.distance);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `_forward(${distanceToMillimeter})`;
    }
    visitLeft(node) {
        const distance = this.visitExpression(node.distance);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `Omni.setCarLeft(${distanceToMillimeter})`;
    }
    visitRight(node) {
        const distance = this.visitExpression(node.distance);
        const distanceToMillimeter = this.toMillimeter(distance, node.unit);
        return `Omni.setCarRight(${distanceToMillimeter})`;
    }
    visitRotate(node) {
        switch (node.$type) {
            case "Clock":
                return this.visitClock(node);
            case "ClockLeft":
                return this.visitClockLeft(node);
            default:
                return `Unknown rotate ${node.$type}`;
        }
    }
    visitClock(node) {
        const angle = this.visitExpression(node.angle);
        return `_rotate(${angle})`;
    }
    visitClockLeft(node) {
        const angle = -this.visitExpression(node.angle);
        return `_rotate(${angle})`;
    }
    visitEntity(node) {
        switch (node.$type) {
            case "Parameter":
                return this.visitParameter(node);
            case "VariableStatement":
                return this.visitVariableStatement(node);
            default:
                return `Unknown entity ${node.$type}`;
        }
    }
    visitParameter(node) {
        const type = node.type;
        const name = node.name;
        var value = ``;
        if (node.value != null) {
            value = `= ${this.visitValue(node.value)}`;
        }
        return `${type}: ${name} ${value}`;
    }
    visitVariableStatement(node) {
        const type = node.type;
        const name = node.name;
        var value = ``;
        if (node.value != null) {
            value = `= ${this.visitValue(node.value)}`;
        }
        return `${type} ${name} ${value}`;
    }
    visitVariableAssignation(node) {
        const value = `= ${this.visitValue(node.value)}`;
        if (node.variable.ref) {
            const name = node.variable.ref.name;
            return `${name} ${value}`;
        }
        return `Variable not found`;
    }
    visitSetSpeed(node) {
        const distance = this.visitExpression(node.distance);
        const distanceInMillimeter = this.toMillimeter(distance, node.unit);
        return `Omni.setCarSpeedMMPS(${distanceInMillimeter}, 9999)`;
    }
    visitCallFunction(node) {
        const args = node.args.map(p => this.visitExpression(p)).join(",");
        if (node.fonction.ref) {
            const name = node.fonction.ref.name;
            return `${name}(${args})`;
        }
        return `Function not found`;
    }
    visitExpression(node) {
        switch (node.$type) {
            case "ArithmeticExpression":
                return this.visitArithmeticExpression(node);
            case "UnaryArithmeticExpression":
                return this.visitUnaryArithmeticExpression(node);
            case "BooleanExpression":
                return this.visitBooleanExpression(node);
            case "UnaryBooleanExpression":
                return this.visitUnaryBooleanExpression(node);
            case "CallEntity":
                return this.visitCallEntity(node);
            case "CallFunctionExpr":
                return this.visitCallFunctionExpr(node);
            case "GetSensor":
                return this.visitGetSensor(node);
            case "GetDistance":
                return this.visitGetDistance(node);
            case "GetSpeed":
                return this.visitGetSpeed(node);
            case "GetTimestamp":
                return this.visitGetTimestamp(node);
            case "Value":
                return this.visitValue(node);
            default:
                return `Unknown expression ${node.$type}`;
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
            case "GetDistance":
                return this.visitGetDistance(node);
            case "GetSpeed":
                return this.visitGetSpeed(node);
            case "GetTimestamp":
                return this.visitGetTimestamp(node);
            case "Value":
                return this.visitValue(node);
            default:
                return "// Unknown unary arithmetic expression\n";
        }
    }
    visitCallFunctionExpr(node) {
        const args = node.args.map(p => this.visitExpression(p)).join(",");
        if (node.fonction.ref) {
            const name = node.fonction.ref.name;
            return `${name}(${args})`;
        }
        return `Function not found`;
    }
    visitCallEntity(node) {
        if (!node.entity.ref) {
            return `Entity not found`;
        }
        return node.entity.ref.name;
    }
    visitGetSensor(node) {
        switch (node.$type) {
            case "GetDistance":
                return this.visitGetDistance(node);
            case "GetSpeed":
                return this.visitGetSpeed(node);
            case "GetTimestamp":
                return this.visitGetTimestamp(node);
            default:
                return `Unknown sensor ${node.$type}`;
        }
    }
    visitGetDistance(node) {
        return 0;
    }
    visitGetSpeed(node) {
        return `Omni.getCarSpeedMMPS()`;
    }
    visitGetTimestamp(node) {
        return `Omni.getTimestamp()`;
    }
    visitValue(node) {
        return node.value;
    }
    visitArithmeticExpression(node) {
        const leftValue = this.visitUnaryArithmeticExpression(node.leftOperand);
        const rightValues = node.rightOperand.map(operand => this.visitUnaryArithmeticExpression(operand));
        const operator = node.operator;
        let compt = -1;
        let result = leftValue;
        for (const rightValue of rightValues) {
            compt++;
            result = result + operator[compt] + rightValue;
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
                return "Operator not found";
        }
    }
    visitAdd(node) {
        return node.symbole;
    }
    visitSub(node) {
        return node.symbole;
    }
    visitMultiply(node) {
        return node.symbole;
    }
    visitDivise(node) {
        return node.symbole;
    }
    visitBooleanExpression(node) {
        const leftValue = this.visitUnaryArithmeticExpression(node.leftCondition);
        const rightValue = this.visitUnaryArithmeticExpression(node.rightCondition);
        const operator = this.visitBooleanOperator(node.operator);
        return leftValue + " " + operator + " " + rightValue;
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
                return "Operator not found";
        }
    }
    visitLowerThan(node) {
        return node.symbole;
    }
    visitEqualTo(node) {
        return node.symbole;
    }
    visitUpperThan(node) {
        return node.symbole;
    }
    visitNot(node) {
        return node.symbole;
    }
    visitOr(node) {
        return node.symbole;
    }
    visitLowerOrEqualTo(node) {
        return node.symbole;
    }
    visitUpperOrEqualTo(node) {
        return node.symbole;
    }
    visitAnd(node) {
        return node.symbole;
    }
    toMillimeter(distance, unit) {
        switch (unit) {
            case "cm":
                return distance * 10;
            case "m":
                return distance * 1000;
            default:
                return distance;
        }
    }
}
//# sourceMappingURL=compiler.js.map