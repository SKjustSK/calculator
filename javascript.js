/*
1) Record User input until he/she hits anything other than NUMBERS and store it to a NUM1
    Display NUMBERS on CURRENTINPUT
    On hitting OPERATIONS->
    Display NUM1 with OPERATION on PREVIOUSINPUT
    CLEAR CURRENTINPUT
    Repeat 1)
        On hitting OPERATIONS
            Compute NUM1 and NUM2 with respective operation
            2) if '='
                Display COMPUTATED NUM to CURRENTINPUT
            else if other operation
                Store COMPUTATED NUM
                Repeat 1) until 2) is achieved
*/

/*
*/

const buttonList = {
    // {AC: 'AC'},
    // {CLEAR: 'CLEAR'},
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
            let num = currentNum.join('');
            console.log(`currentNum: ${num}`); // TEST
            answer = compute(previousNum, num, operation);

            // Clears Data if 0 divided by 0
            if (answer === 'Undefined')
            {
                clearData();
                console.log('Data Clear!'); 
            } 
            else
            {
                previousNum = answer;
                currentNum = [];
                operation = op.classList[1];

                console.log(answer); // TEST
                console.log(operation); // TEST
            }  
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

});

// AC CLEAR

// Decimal

// Functions

function clearData()
{
    currentNum = [];
    previousNum = null;
    operation = null;
    answer = null;
}

// To compute currentNum and previousNum
function compute(x , y , operation)
{
    x = Number(x);
    y = Number(y);
    if (operation === 'add')
    {
        return x + y;
    }
    else if (operation === 'subtract')
    {
        return x - y;
    }
    else if (operation === 'multiply')
    {
        return x*y;
    }
    else if (operation === 'divide')
    {
        if (y === 0)
        {
            return 'Undefined';
        }
        return x/y;
    }
}