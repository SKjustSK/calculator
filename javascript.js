const buttonList = {
    zero: '0', one: '1',
    two: '2', three: '3',
    four: '4', five: '5',
    six: '6', seven: '7',
    eight: '8', nine: '9', 
};

const operatorList = {
    add: '+',
    subtract: '-',
    multiply: 'x',
    divide: '/',
};

// Variables we will be using
let currentNum = [];
let previousNum = 0;
let operation = null;
let answer = 0;

// Initialing display
currentInputDisplay();

/*
    Adding eventListeners to buttons
*/

// Number Inputs
let numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        let num = number.classList[1];

        // 13 is hard limit of display of calculator
        if (currentNum.length < 13)
        {
            currentNum.push(buttonList[num]);
        }
        currentInputDisplay();
    });
});

// Operations
let operations = document.querySelectorAll('.operation');
operations.forEach((op) => {
    op.addEventListener('click', () => {
        if (operation !== null && currentNum.length !== 0)
        {
            equate();
            operation = op.classList[1];
        }
        else
        {
            operation = op.classList[1];
            // To safeguard from first inputting operation then numbers, OR to change operations
            if (currentNum.length !== 0)
            {
                previousNum = currentNum.join("");
                currentNum = [];
                operation = op.classList[1];
            }
        }
        previousInputDisplay();
        currentInputDisplay();
    });
});

// Equals
let equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
    if (currentNum.length === 0)
    {
        answer = previousNum;
    }
    else 
    {
        equate();
    }
});

// All CLear
let allClear = document.querySelector('.allClear');
allClear.addEventListener('click', () => {
    clearData();
    previousInputDisplay('');
    currentInputDisplayANSWER();
});

// Clear
let clear = document.querySelector('.CLEAR');
clear.addEventListener('click', () => {
    currentNum = [];
    currentInputDisplay();
});

// Decimal

// Computing Functions

function equate()
{
    let num = currentNum.join("");

    // When user hits enter without any operations
    if (operation === null)
    {   
        operation = 'add'; // previousNum will be zero in any case, therefore wont affect calculations
    }

    answer = compute(previousNum, num , operation);

    // if divided by zero
    if (answer === 'Undefined')
    {   
        currentInputDisplay(answer);
        previousInputDisplay(`${previousNum} ${operatorList[operation]} ${currentNum.join('')}`);
        clearData();
    } 
    // Setups next inputs
    else
    {
        // To display previousnum + currentnum when equated 
        previousInputDisplay(`${previousNum} ${operatorList[operation]} ${currentNum.join('')}`);

        previousNum = answer;
        currentNum = [];
        currentInputDisplayANSWER();
    }  

    // Resets operation 
    operation = null;
}

function clearData()
{
    previousNum = 0;
    currentNum = [];
    operation = null;
    answer = 0;
    console.log("Data Clear!");
}

function compute(x , y , operation)
{
    x = Number(x);
    y = Number(y);
    let ans = y;

    // previousNum undefined, so output currentNum
    if (x === undefined)
    {
        return ans;
    }
    
    if (operation === 'add')
    {
        ans = x + y;
    }
    else if (operation === 'subtract')
    {
        ans = x - y;
    }
    else if (operation === 'multiply')
    {
        ans = x * y;
    }
    else if (operation === 'divide')
    {
        if (y === 0)
        {
            return 'Undefined';
        }
        ans = x / y;
    }

    // To remove trailing zeroes for whole numbers
    if (ans - ans.toFixed(0) === 0)
    {
        return ans;
    }
    else
    {
        return ans.toFixed(5);
    }
}

// Display Functions

function currentInputDisplay(display)
{
    let currentInputText = document.querySelector('.currentInputText');
    // This is done because joining currentNum with no elements will not result to 0
    let currentDisplayNum = '0';
    if (display !== undefined)
    {
        currentDisplayNum = display;
    }
    else if (currentNum.length !== 0)
    {
        currentDisplayNum = currentNum.join('');
    }

    currentInputText.textContent = `${currentDisplayNum}`;
}

function currentInputDisplayANSWER()
{
    let currentInputText = document.querySelector('.currentInputText');
    currentInputText.textContent = `${answer}`;
}

function previousInputDisplay(display)
{
    let previousInputText = document.querySelector('.previousInputText');
    let previousDisplayNum = '';
    if (display === undefined)
    {
        previousDisplayNum = `${previousNum} ${operatorList[operation]}`;
    }
    else
    {
        previousDisplayNum = `${display}`;
    }
    previousInputText.textContent = previousDisplayNum;
}