window.onload = function() {
    generateProblem();
}
// Map object for metric prefixes and their corresponding powers of 10
const prefixes = new Map([
    ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12],
    ["G", 9], ["M", 6], ["k", 3], ["h", 2], ["da", 1], ["", 0],
    ["d", -1], ["c", -2], ["m", -3], ["&mu;", -6], ["n", -9], 
    ["p", -12], ["f", -15], ["a", -18], ["z", -21], ["y", -24]
]);
const prefixesArray = Array.from(prefixes.keys());

const units = ['m','g','L','s'];

// Allow for basic units, units-squared or units-cubed.
const unitExps = new Map([
    ["", 1], ["2", 2], ["3", 3]
]);
const unitExpsArray = Array.from(unitExps.keys());

let m, n, i, o, u, uExp, ans2, usedHint; // Declare variables to store problem details

usedHint = false;

// Function to generate random numbers between min and max
function getRandomNumber(min, max, decimals) {
    const factor = Math.pow(10, decimals);
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

// Function to pick a random element from an array
function getRandomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

// Function to generate a random integer
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to randomly decide unit type (basic, squared, or cubed)
function getUnitType() {
    return getRandomElement(unitExpsArray);
}

// Function to generate a new problem
function generateProblem() {
    reset();
    m = getRandomNumber(1, 10, 2); // Random number with 2 decimals
    n = getRandomInteger(-10, 10); // Random integer between -10 and 10
    u = getRandomElement(units);
    uExp = getRandomElement(unitExpsArray);
    i = getRandomElement(prefixesArray); // Random prefix for "a"
    o = getRandomElement(prefixesArray); // Random prefix for "b"


    ans2 = n + unitExps.get(uExp) * (prefixes.get(i) - prefixes.get(o));

    // Ensure prefixes are different
    if (i === o || o === "&mu;") {
        return generateProblem();
    }

    // Display the problem
    const problemElement = document.getElementById("problem");
    problemElement.innerHTML = `${m} × 10<sup>${n}</sup> ${i}${u}${uExp ? `<sup>${uExp}</sup>` : ""} to ${o}${u}${uExp ? `<sup>${uExp}</sup>` : ""}`;

    // Clear previous inputs and feedback
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("feedback").innerHTML = "";
}

function reset() {
    usedHint = false;
    prefixHint.innerHTML="";
    expHint.innerHTML="";
    document.getElementById("input1").style.backgroundColor = "";
    document.getElementById("input2").style.backgroundColor = "";
    document.getElementById("input3").style.backgroundColor = "";
    document.getElementById("input4").style.backgroundColor = "";
}

function updateAnswer() {
    let answer = document.getElementById("answer");
    // answer.innerHTML = "blah";
}

// Function to check the student's answer
function checkAnswer() {
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value; // Currently not validated
    const input3 = document.getElementById("input3").value;
    const input4 = document.getElementById("input4").value;

    const ans1 = m;
    console.log(unitExps.get(u));
    // const ans2 = n + unitExps.get(uExp) * (prefixes.get(i) - prefixes.get(o));
    const ans3 = o + u;
    const ans4 = uExp;

    console.log(ans1);
    console.log(ans2);
    console.log(ans3);
    console.log(ans4);

    let feedback = document.getElementById("feedback");
    let correct = true;

    document.getElementById("input1").style.backgroundColor = "";
    document.getElementById("input2").style.backgroundColor = "";
    document.getElementById("input3").style.backgroundColor = "";
    document.getElementById("input4").style.backgroundColor = "";
    
    // Check each answer and update background color
    if (input1 == ans1) {
        document.getElementById("input1").style.backgroundColor = "lightgreen";
    } else {
        console.log(`Number: Answered ${input1} instead of ${ans1}.`);
        document.getElementById("input1").style.backgroundColor = "lightcoral";
        correct = false;
    }

    if (input2 == ans2) {
        document.getElementById("input2").style.backgroundColor = "lightgreen";
    } else {
        console.log(`Exponent: Answered ${input2} instead of ${ans2}.`);
        document.getElementById("input2").style.backgroundColor = "lightcoral";
        correct = false;
    }

    if (input3 == ans3) {
        document.getElementById("input3").style.backgroundColor = "lightgreen";
    } else {
        console.log(`unitExps: Answered ${input3} instead of ${ans3}.`);
        document.getElementById("input3").style.backgroundColor = "lightcoral";
        correct = false;
    }
    if (input4 == ans4 || (input4 == 1 && ans4 =="")) {
        document.getElementById("input4").style.backgroundColor = "lightgreen";
    } else {
        console.log(`Power: Answered ${input4} instead of ${ans4}.`);
        document.getElementById("input4").style.backgroundColor = "lightcoral";
        correct = false;
    }

    // Provide feedback
    if (correct) {
        feedback.innerHTML = "Correct! Well done!";
        feedback.className = "feedback correct";
    } else {
        feedback.innerHTML = "Incorrect. Try again!";
        feedback.className = "feedback incorrect";
    }
}

// Function to open a new window with the prefixes table
function seePrefixes() {
    const tableHTML = `
        <html>
            <head>
                <title>Metric Prefixes</title>
                <style>
                    table { width: 400px; border-collapse: collapse; }
                    th, td { padding: 5px; text-align: center; border: 1px solid black; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h2>Metric Prefixes</h2>
                <table>
                    <tr><th>Prefix</th><th>Power of 10</th></tr>
                    ${Array.from(prefixes.entries()).map(([prefix, power]) => `
                        <tr><td>${prefix}</td><td>10<sup>${power}</sup></td></tr>
                    `).join('')}
                </table>
            </body>
        </html>
    `;

    const newWindow = window.open('', '', 'width=500,height=1600,resizable=yes,scrollbars=yes');
    newWindow.document.write(tableHTML);
    newWindow.document.close();
}

function showPrefixHint() {
    inputPrefixVal = prefixes.get(i);
    outputPrefixVal = prefixes.get(o);

    if (inputPrefixVal == 0) {
        iPrefixText = "Base unit ";
    } else {
        iPrefixText = i;
    }

    if (outputPrefixVal == 0) {
        oPrefixText = "Base unit ";
    } else {
        oPrefixText = o;
    }


    hintText = `${iPrefixText} = ${inputPrefixVal}</br>${oPrefixText} = ${outputPrefixVal}</br></br>`

    usedHint = true;

    prefixHint.innerHTML = hintText;                  
}

function showHint() {
    expAnsText1 = `${n} + [${unitExps.get(uExp)} * (${prefixes.get(i)} - ${prefixes.get(o)})]`; 
    expAnsText2 = `${n} + [${unitExps.get(uExp)} * ${prefixes.get(i) - prefixes.get(o)}]`;
    expAnsText3 = `${n} + ${unitExps.get(uExp) * (prefixes.get(i) - prefixes.get(o))}`;

    hintText = `
        Q + [U * (I-O)]</br></br>
        ${expAnsText1}</br>
        ${expAnsText2}</br>
        ${expAnsText3}</br>
        ${ans2}
        `;

        expHint.innerHTML = hintText;            
}