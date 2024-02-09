document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const keys = document.querySelectorAll('.keys button');

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const keyValue = key.dataset.key;
      if (keyValue === '=') {
        calculate();
      } else if (keyValue === 'c') {
        clearDisplay();
      } else {
        appendValue(keyValue);
      }
    });
  });

  document.addEventListener('keydown', event => {
    const keyValue = event.key;
    if (keyValue.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      appendValue(keyValue);
    } else if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculate();
    } else if (event.key === 'Delete' || event.key === 'Backspace' || event.key === 'c') {
      event.preventDefault();
      clearDisplay();
    } else if (event.key === 's' || event.key === 'c' || event.key === 't' || event.key === 'r') {
      event.preventDefault();
      appendValue(event.key);
    }
  });

  function appendValue(value) {
    display.value += value;
  }

  function clearDisplay() {
    display.value = '';
  }

  function calculate() {
    try {
      let result = display.value;
      if (result.includes('sin') || result.includes('cos') || result.includes('tan') || result.includes('sqrt')) {
        result = evalAdvanced(result);
      } else {
        result = eval(result);
      }
      display.value = result;
    } catch (error) {
      display.value = 'Error';
    }
  }

  function evalAdvanced(expression) {
    expression = expression.replace(/sin/g, 'Math.sin');
    expression = expression.replace(/cos/g, 'Math.cos');
    expression = expression.replace(/tan/g, 'Math.tan');
    expression = expression.replace(/sqrt/g, 'Math.sqrt');
    return eval(expression);
  }
});