const buttonList = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8', 
    nine: '9', 
};

let currentNum = [];
let previousNum = null;
let operation = null;
let answer = null;

// Adding eventListeners to buttons

// Number Inputs
let numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        let num = number.classList[1];
        currentNum.push(buttonList[num]);

        console.log(buttonList[num]);
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
allClear.addEventListener('click', clearData);

// Clear
let clear = document.querySelector('.CLEAR');
clear.addEventListener('click', () => {
    currentNum.pop();
});

// Decimal

// Functions

function equate()
{
    let num = currentNum.join("");
    console.log(`currentNum: ${num}`); // TEST
    answer = compute(previousNum, num , operation);

    // Resets operation 
    operation = null;

    // Clears Data if 0 divided by 0
    if (answer === 'Undefined')
    {
        clearData();
    } 
    // Setups next inputs
    else
    {
        previousNum = answer;
        currentNum = [];
        
        console.log(answer); // TEST
    }  
}

function clearData()
{
    currentNum = [];
    previousNum = null;
    operation = null;
    answer = null;
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