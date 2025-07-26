class Calculator {
    constructor(expressionDisplayElement, resultDisplayElement) {
        this.expressionDisplayElement = expressionDisplayElement;
        this.resultDisplayElement = resultDisplayElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "0";
        this.previousOperand = "";
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === "Error") {
            this.clear();
            return;
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === "") {
            this.currentOperand = "0";
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.currentOperand === "Error") return;
        if (number === "." && this.currentOperand.includes(".")) return;
        if (this.currentOperand === "0" && number !== ".") {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "Error") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "0";
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "/":
                if (current === 0) {
                    this.currentOperand = "Error";
                    this.operation = undefined;
                    this.previousOperand = "";
                    this.updateDisplay();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = Math.round(computation * 1e10) / 1e10;
        this.operation = undefined;
        this.previousOperand = "";
        this.updateDisplay();
    }

    updateDisplay() {
        this.resultDisplayElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.expressionDisplayElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.expressionDisplayElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const expressionDisplayElement = document.querySelector(
    "[data-expression-display]"
);
const resultDisplayElement = document.querySelector("[data-result-display]");

const calculator = new Calculator(
    expressionDisplayElement,
    resultDisplayElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
    });
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
});

clearButton.addEventListener("click", () => {
    calculator.clear();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
});
