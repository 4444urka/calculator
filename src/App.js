import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
    const [inputValue, setInputValue] = useState('0');

   function addSum() {
    if (inputValue !== "" && (!isNaN(Number(inputValue[inputValue.length - 1]))) ||
            inputValue[inputValue.length - 1] === ")") {
        if (!isNaN(Number(inputValue)))
            setInputValue(Number(inputValue).toString() + '+');
        else
            setInputValue(inputValue + '+');
        }
    }

    function addSubtract() {
        if (inputValue === "0")
            setInputValue('-');
        else if (!isNaN(Number(inputValue[inputValue.length - 1])) ||
            inputValue[inputValue.length - 1] === ")" ||
                inputValue[inputValue.length - 1] === "(")

            if (!isNaN(Number(inputValue)))
                setInputValue(Number(inputValue).toString() + '-');
            else
                setInputValue(inputValue + '-');
    }
    
    function addMultiply() {
        if (inputValue !== "" && (!isNaN(Number(inputValue[inputValue.length - 1]))) ||
            inputValue[inputValue.length - 1] === ")")

            if (!isNaN(Number(inputValue)))
                setInputValue(Number(inputValue).toString() + '×');
            else
                setInputValue(inputValue + '×');
    }
    
    function addDivision() {
        if (inputValue !== "" && (!isNaN(Number(inputValue[inputValue.length - 1]))) ||
            inputValue[inputValue.length - 1] === ")")

            if (!isNaN(Number(inputValue)))
                setInputValue(Number(inputValue).toString() + '÷');
            else
                setInputValue(inputValue + '÷');
    }
    
    function addPoint() {
        let splited_string = inputValue.split(/[ +\-×÷()]/);
        if (inputValue !== "" && (!isNaN(Number(inputValue[inputValue.length - 1]))) &&
            inputValue[inputValue.length - 1] !== ")" && inputValue[inputValue.length - 1] !== "("
            && splited_string[splited_string.length - 1].indexOf('.') === -1) {

            setInputValue(inputValue + '.');
        }
    }
    
    function addNumber(number) {
        if (inputValue === "0" || inputValue === 'ERROR')
            setInputValue(number.toString());
        else
            setInputValue(inputValue + number.toString());
    }
    
    function addScob(scob) {
        if (scob === "(") {
            if (inputValue === "0" || inputValue === 'ERROR')
                setInputValue(scob);
            else if (inputValue[inputValue.length - 1] === "+" || inputValue[inputValue.length - 1] === "×"
            || inputValue[inputValue.length - 1] === "÷" || inputValue[inputValue.length - 1] === "-"
                || inputValue[inputValue.length - 1] === "(")
                setInputValue(inputValue + scob);
        }
        else if (scob === ")") {
            if (inputValue !== "0" && !isNaN(Number(inputValue[inputValue.length - 1])))
                setInputValue(inputValue + scob);
        }
    }
    
    function result() {
        try {
            let Result = eval(inputValue.replace(/÷/g, '/').replace(/×/g, '*')).toString();
            if (Result === 'Infinity' || Result === '-Infinity' || Result === 'NaN')
                setInputValue('ERROR');
            else
                setInputValue(Result);
        }
        catch(error) {
            setInputValue('ERROR');
        }
    }

    function eraseAll() {
        setInputValue('0');
    }
    
    function eraseLast() {
        setInputValue(inputValue.slice(0, -1));
        if (inputValue.length === 1 || inputValue === 'ERROR')
            setInputValue('0');
    }

    window.addEventListener('DOMContentLoaded', () => {
        const buttons = document.getElementsByTagName('button');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                }
            });
        }
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.key >= '0' && event.key <= '9'))
                addNumber(event.key);

            else if (event.key === '(' || event.key === ')')
                addScob(event.key);

            else if (event.key === '+')
                addSum();

            else if (event.key === '-')
                addSubtract();

            else if (event.key === '*')
                addMultiply();

            else if (event.key === '/')
                addDivision();

            else if (event.key === '.')
                addPoint();

            else if (event.key === 'Enter')
                result();

            else if (event.key === 'Backspace')
                eraseLast();

            else if (event.key === 'Delete')
                eraseAll();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputValue]);

  return (
      <div className="App">
          <div id="WaterMark">ВЁРСТКА BY АДСКИЙСАТАНА666</div>
          <div id="input">{inputValue}</div>
          <div className="Buttons">
              <div>
                  <button type="button" onClick={eraseAll}>C</button>
                  <button type="button" onClick={() => addScob('(')}>(</button>
                  <button type="button" onClick={() => addScob(')')}>)</button>
                  <button type="button" onClick={eraseLast}>←</button>
              </div>
              <div>
                  <button type="button" onClick={addSum}>+</button>
                  <button type="button" onClick={() => addNumber(1)}>1</button>
                  <button type="button" onClick={() => addNumber(2)}>2</button>
                  <button type="button" onClick={() => addNumber(3)}>3</button>
              </div>
              <div>
                  <button type="button" onClick={addSubtract}>-</button>
                  <button type="button" onClick={() => addNumber(4)}>4</button>
                  <button type="button" onClick={() => addNumber(5)}>5</button>
                  <button type="button" onClick={() => addNumber(6)}>6</button>
              </div>
              <div>
                  <button type="button" onClick={addMultiply}>×</button>
                  <button type="button" onClick={() => addNumber(7)}>7</button>
                  <button type="button" onClick={() => addNumber(8)}>8</button>
                  <button type="button" onClick={() => addNumber(9)}>9</button>
              </div>
              <div>
                  <button type="button" onClick={addDivision}>÷</button>
                  <button type="button" onClick={addPoint}>.</button>
                  <button type="button" onClick={() => addNumber(0)}>0</button>
                  <button type="button" onClick={result}>=</button>
              </div>
          </div>
      </div>
  );
}

export default App;
