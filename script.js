const display = document.getElementById("display");

// Select buttons
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const equalsBtn = document.getElementById("equals");

// State
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;

// Operator functions

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

// Logic

function operate(operator, a, b) {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
}

// Display value
function updateDisplay(value) {
  display.value = value;
}

// Event Listeners

// Numbers
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (currentOperator === null) {
      firstNumber += button.textContent;
      updateDisplay(firstNumber);
    } else {
      secondNumber += button.textContent;
      updateDisplay(secondNumber);
    }
  });
});

// Operators
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (firstNumber === "") return;

    if (secondNumber !== "") {
      calculate(); // chain operations
    }

    currentOperator = button.textContent;
  });
});

// Equals
equalsBtn.addEventListener("click", calculate);

function calculate() {
  if (firstNumber === "" || secondNumber === "") return;

  let a = parseFloat(firstNumber);
  let b = parseFloat(secondNumber);

  let result = operate(currentOperator, a, b);

  updateDisplay(result);

  // Reset state for next operation
  firstNumber = result.toString();
  secondNumber = "";
  currentOperator = null;
}

// Clear
clearBtn.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  updateDisplay("");
});

// Backspace
backspaceBtn.addEventListener("click", () => {
  if (currentOperator === null) {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber);
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber);
  }
});