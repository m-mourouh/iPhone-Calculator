class Calculator {
  static operators = ["+", "-", "*", "/"];
  constructor() {
    this.displayElement = document.getElementById("display");
    this.operatorsButtons = document.querySelectorAll(".operator");
    this.operator = false;
    this.operation = "";
    this.expression = [];
    this.result = "";
  }

  updateDisplay() {
    this.displayElement.textContent = this.result;
    this.toggleActiveOperatorBtn(null, false);
  }

  updateExpression(value) {
    const isNumber =
      typeof this.expression[this.expression.length - 1] === "number";
    if (isNumber) {
      this.expression = [];
      this.expression.push(value);
      this.operator = true;
    } else {
      this.expression.push(value);
    }
    if (this.operator) {
      this.result = value;
      this.updateDisplay();
    } else {
      this.result += value;
      this.updateDisplay();
    }
    this.operator = false;
  }

  setOperation(btn, operation) {
    this.operation = operation;
    this.toggleActiveOperatorBtn(btn, true);
    if (!this.operator) {
      this.expression.push(operation);
      this.operator = true;
    } else {
      this.expression.pop();
      this.expression.push(operation);
    }
  }

  calculate() {
    if (this.expression.length == 0) return;
    let result = eval(this.expression.join(""));
    this.result = this.formatNumber(result);
    this.expression = [];
    this.expression.push(result);
    this.operator = false;
    this.updateDisplay();
  }
  percent() {
    this.removeDigitsFromExpression();
    const result = this.result / 100;
    this.expression.push(result);
    this.result = this.formatNumber(result);
    this.updateDisplay();
  }
  removeDigitsFromExpression() {
    const resultLength = this.result.toString().split("").length;
    //remove the number of digits from the expression
    for (let i = 0; i < resultLength; i++) {
      this.expression.pop();
    }
  }
  invert() {
    if (this.expression.length == 0) return;
    this.removeDigitsFromExpression();
    const result = this.result * -1;
    this.expression.push(result);
    this.result = this.formatNumber(result);
    this.updateDisplay();
  }
  toggleActiveOperatorBtn(btn, option) {
    if (option) {
      this.operatorsButtons.forEach((operator) => {
        operator.classList.remove("active");
        btn.classList.add("active");
      });
    } else {
      this.operatorsButtons.forEach((operator) => {
        operator.classList.remove("active");
      });
    }
  }
  clear() {
    this.expression = [];
    this.result = "";
    this.operator = false;
    this.updateDisplay();
  }
  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }
  toExponential(n, d) {
    return parseFloat(n).toExponential(d);
  }
  formatNumber(n) {
    let num = n;
    if (this.isFloat(n)) {
      num = parseFloat(n.toFixed(5));
    }
    if (num.toString().length >= 9) {
      num = this.toExponential(num, 2);
    }
    return num;
  }
}

const calculator = new Calculator();

function handleButtonClick(btn) {
  const value = btn.getAttribute("data-value");

  if (value === "clear") {
    calculator.clear();
  } else if (value === "calculate") {
    calculator.calculate();
  } else if (value === "invert") {
    calculator.invert(btn);
  } else if (value === "percent") {
    calculator.percent();
  } else if (Calculator.operators.includes(value)) {
    calculator.setOperation(btn, value);
  } else {
    calculator.updateExpression(value);
  }
}

//Select all buttons
const buttons = document.querySelectorAll(".btn");
//Add event listener to each button
buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    handleButtonClick(btn);
  });
});
