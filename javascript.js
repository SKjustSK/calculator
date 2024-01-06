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

let currentNum = [];
let previousNum = null;
let operation = null;
let answer = 0;

// Adding eventListeners to buttons

// Number Inputs
let numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        let num = number.classList[1];
        currentNum.push(buttonList[num]);
        currentInputDisplay();

        console.log(buttonList[num]); // TEST
    });
});

// Operations
let operations = document.querySelectorAll('.operation');
operations.forEach((op) => {
    op.addEventListener('click', () => {
        if (operation !== null && currentNum.length !== 0 && previousNum !== null)
        {
            equate();
            operation = op.classList[1];
            console.log(operation); // TEST
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

                console.log(`previousNum: ${previousNum}`); // TEST
            }
            console.log(operation); // TEST
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

    console.log(`answer: ${answer}`); // TEST
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
    console.log(`currentNum: ${num}`); // TEST
    answer = compute(previousNum, num , operation);

    // Clears Data if 0 divided by 0
    if (answer === 'Undefined')
    {   
        let currentInputText = document.querySelector('.currentInputText');
        currentInputText.textContent = `${answer}`; 
        previousInputDisplay();
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

        console.log(answer); // TEST
    }  

    // Resets operation 
    operation = null;
}

function clearData()
{
    currentNum = [];
    previousNum = null;
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

function currentInputDisplay()
{
    let currentInputText = document.querySelector('.currentInputText');
    let currentDisplayNum = '0';
    if (currentNum.length !== 0)
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