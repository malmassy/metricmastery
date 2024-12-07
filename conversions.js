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

/*
A problem takes the form "Convert m * 10^n i[u]^[uExp] to o[u]^[uExp]"

"m" is a 2 decimal 1.00 <= m < 10.00.
"n" is an integer +/-(1.00 <= n <= 10)
"i" is the metric prefix on the input units (e.g. "c" for centi-)
"o" is the metric prefex on the output units (e.g. "n" for nano-)
"u" is the type of metric unit (e.g. "L" for liters, "m" or meters) (SAME FOR BOTH INPUT AND OUTPUT)
"uExp" is whether the metric units are squared or cubed (SAME FOR BOTH INPUT AND OUTPUT)
*/

let quesM, quesN, i, o, u, uExpText; // Declare variables to store problem details
let uExpVal, iPrefixVal, oPrefixVal, ansN; // Helpers to calculating the answer.


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
    quesM = getRandomNumber(1, 10, 2); // Random number with 2 decimals
    quesN = getRandomInteger(-10, 10); // Random integer between -10 and 10
    u = getRandomElement(units);
    i = getRandomElement(prefixesArray); // Random prefix for "a"
    o = getRandomElement(prefixesArray); // Random prefix for "b"
    uExpText = getRandomElement(unitExpsArray);

    uExpVal = unitExps.get(uExpText);
    iPrefixVal = prefixes.get(i);
    oPrefixVal = prefixes.get(o);

    ansN = quesN + uExpVal * (iPrefixVal - oPrefixVal);

    // Ensure prefixes are different
    // Don't let the output be "micro" so they don't have to type "mu"...
    if (i === o || o === "&mu;" || Math.abs(ansN) > 41) {
        return generateProblem();
    }

    // Display the problem
    const problemElement = document.getElementById("problem");
    problemElement.innerHTML = `
        <span id="quesM">${quesM}</span>
         × 10<span id="quesN"><sup>${quesN}</sup></span> 
        <span id="i">${i}</span>${u}<span id="uExpText1"><sup>${uExpText}</sup></span>
        to <span id="o">${o}${u}</span><span id="uExpText2"><sup>${uExpText}</sup></span>`;

    // Clear previous inputs and feedback
    document.getElementById("ansM").value = "";
    document.getElementById("ansN").value = "";
    document.getElementById("ansUnit").value = "";
    document.getElementById("ansUnitExp").value = "";

    generatePreSanity();
}


function generatePreSanity() {
        document.getElementById("presanity").innerHTML = `
            <div>
            The exponent for the "Input unit prefix" <b>(${i})</b>
            is
            <select id="unitComparison">
                <option value=""></option>
                <option value="bigger">bigger</option>
                <option value="smaller">smaller</option>
            </select>
            than the exponent for the "output unit prefix" <b>(${o})</b>.</br>This means that one 
            <input type="text" id="singularUnit" placeholder="bigger unit" style="width: 120px;">
            is made up of many 
            <input type="text" id="pluralUnit" placeholder="smaller units" style="width: 120px;">.</br>
            When converting from
            <input type="text" id="inputUnit" placeholder="input unit" style="width: 120px;">
            to
            <input type="text" id="outputUnit" placeholder="output unit" style="width: 120px;">,
            you will need 
            <select id="unitComparison">
                <option value=""></option>
                <option value="more">more</option>
                <option value="less">less</option>
            </select>
            of the output units to be the same size as the input units.
             </br>
            I expect the exponent of my answer to be 
            <select id="exponentComparison">
                <option value=""></option>
                <option value="bigger">bigger</option>
                <option value="smaller">smaller</option>
            </select>
            than the exponent of the question <b>(${quesN})</b>.
        </div>`
}

function reset() {
    usedHint = false;
    document.getElementById("answer").innerHTML="";
    document.getElementById("hint").innerHTML="";
    document.getElementById("button-hint").innerHTML="Show Hints";
    document.getElementById("ansM").style.backgroundColor = "";
    document.getElementById("ansN").style.backgroundColor = "";
    document.getElementById("ansUnit").style.backgroundColor = "";
    document.getElementById("ansUnitExp").style.backgroundColor = "";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("scratch-work").value = "";
}

function updateAnswer() {
    let answer = document.getElementById("answer");
    let input_question = `
        <span id="quesM">${quesM}</span>
         × 10<span id="quesN"><sup>${quesN}</sup></span> 
        <span id="i">${i}</span>${u}<span id="uExpText1"><sup>${uExpText}</sup></span>`;

    answer.innerHTML = `<i>${input_question} =</i> <b>${document.getElementById("ansM").value} x 10<sup>${document.getElementById("ansN").value}</sup>
    ${document.getElementById("ansUnit").value}<sup>${document.getElementById("ansUnitExp").value}</sup></b>
    `;
}

// Function to check the student's answer
function checkAnswer() {
    const ansMSubmit = document.getElementById("ansM").value;
    const ansNSubmit = document.getElementById("ansN").value; // Currently not validated
    const ansUnitSubmit = document.getElementById("ansUnit").value;
    const ansUnitExpSubmit = document.getElementById("ansUnitExp").value;

    const ansM = quesM;
    // const ans2 = n + unitExps.get(uExp) * (prefixes.get(i) - prefixes.get(o));
    const ansUnit = o + u;
    const ansUnitExp = uExpText;

    let feedback = document.getElementById("feedback");
    let correct = true;

    document.getElementById("ansM").style.backgroundColor = "";
    document.getElementById("ansN").style.backgroundColor = "";
    document.getElementById("ansUnit").style.backgroundColor = "";
    document.getElementById("ansUnitExp").style.backgroundColor = "";
    
    // Check each answer and update background color
    if (ansMSubmit == ansM) {
        document.getElementById("ansM").style.backgroundColor = "lightgreen";
    } else {
        // console.log(`Number: Answered ${ansMSubmit} instead of ${ansM}.`);
        document.getElementById("ansM").style.backgroundColor = "lightcoral";
        correct = false;
    }

    if (ansNSubmit == ansN) {
        document.getElementById("ansN").style.backgroundColor = "lightgreen";
    } else {
        // console.log(`Exponent: Answered ${ansNSubmit} instead of ${ansN}.`);
        document.getElementById("ansN").style.backgroundColor = "lightcoral";
        correct = false;
    }

    if (ansUnitSubmit == ansUnit) {
        document.getElementById("ansUnit").style.backgroundColor = "lightgreen";
    } else {
        // console.log(`unitExps: Answered ${ansUnitSubmit} instead of ${ansUnit}.`);
        document.getElementById("ansUnit").style.backgroundColor = "lightcoral";
        correct = false;
    }
    if (ansUnitExpSubmit == ansUnitExp || (ansUnitExpSubmit == 1 && ansUnitExp =="")) {
        document.getElementById("ansUnitExp").style.backgroundColor = "lightgreen";
    } else {
        // console.log(`Power: Answered ${ansUnitExpSubmit} instead of ${ansUnitExp}.`);
        document.getElementById("ansUnitExp").style.backgroundColor = "lightcoral";
        correct = false;
    }

    ansCompareText = (ansNSubmit > quesN) ? 'greater' : 'less';
    unitsCompareText = (oPrefixVal > iPrefixVal) ? 'bigger' : 'smaller';

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
    const newWindow = window.open('prefixes.html', '', 'width=500,height=1600,resizable=yes,scrollbars=yes');
}

function showHint() {
    let hint = document.getElementById("hint");
    if (hint.innerHTML != "") {
        hint.innerHTML = "";
        document.getElementById("button-hint").innerHTML="Show Hints";
        return;
    }

    document.getElementById("button-hint").innerHTML="Hide Hints";

    const tableHTML = `
        <table class="table" style="justify-content: left;">
            <tr><td><b>Number</b></td><td>For number, just pull the number from the question down. <span onmouseover="showNumberHint()" onmouseleave="clearNumberHint()"><u>Hint</u></span></td>
            <tr><td><b>Unit</b></td><td>For unit, just pull the output units from the question down. <span onmouseover="showUnitHint()" onmouseleave="clearUnitHint()"><u>Hint</u></span></td>
            <tr><td><b>Unit Exponent</b></td><td>For unit exponent, just pull the unit exponent from the question down.</br><span id="noUnitExp">If there is no unit exponent, just leave it blank.</span> <span onmouseover="showUnitExpHint()" onmouseleave="clearUnitExpHint()"><u>Hint</u></span></td>
            <tr><td><b>Exponent</b></td><td>
            <table style="width: 90%;">
            <tr><td>Input Prefix</td><td>${i} = ${iPrefixVal}</td></tr>
            <tr><td>Output Prefix</td><td>${o} = ${oPrefixVal}</td></tr>
            <tr><td>Unit Exponent</td><td>${uExpVal}</td></tr>
            <tr><td>Question Exponent</td><td>${quesN}</td></tr>
            <tr style="line-height: 1.5;"><td><b>Answer Exponent</b></td><td>
                <div>(${iPrefixVal} - ${oPrefixVal}) * ${uExpVal} + ${quesN}</div>
                <div>(${iPrefixVal - oPrefixVal}) * ${uExpVal} + ${quesN}</div>
                <div>${(iPrefixVal - oPrefixVal) * uExpVal} + ${quesN}</div>

            <b><div id="expHint" onmouseover="showExpHint()" onmouseleave="clearExpHint()"><u>${ansN}</u></b>
            </td></tr>



            </table>
            </td></tr>
        </table>
        ` 
    hint.innerHTML = tableHTML;
}

function showNumberHint() {
    document.getElementById("quesM").style.backgroundColor = "lightcoral";
}

function showNumberHint() {
    document.getElementById("quesM").style.backgroundColor = "aqua";
    document.getElementById("ansM").style.backgroundColor = "aqua";
}

function clearNumberHint() {
    document.getElementById("quesM").style.backgroundColor = "";
    document.getElementById("ansM").style.backgroundColor = "";    
}

function showUnitHint() {
    document.getElementById("o").style.backgroundColor = "aqua";
    document.getElementById("ansUnit").style.backgroundColor = "aqua";
}

function clearUnitHint() {
    document.getElementById("o").style.backgroundColor = "";
    document.getElementById("ansUnit").style.backgroundColor = "";    
}

function showUnitExpHint() {
    document.getElementById("uExpText1").style.backgroundColor = "aqua";
    document.getElementById("uExpText2").style.backgroundColor = "aqua";
    if (uExpVal == 1) {
        document.getElementById("noUnitExp").style.backgroundColor = "aqua";
    }
    document.getElementById("ansUnitExp").style.backgroundColor = "aqua";
}

function clearUnitExpHint() {
    document.getElementById("uExpText1").style.backgroundColor = "";
    document.getElementById("uExpText2").style.backgroundColor = "";
    document.getElementById("ansUnitExp").style.backgroundColor = "";
    document.getElementById("noUnitExp").style.backgroundColor = "";
}

function clearUnitExpHint1() {
    document.getElementById("uExpText1").style.backgroundColor = "";
    document.getElementById("uExpText2").style.backgroundColor = "";
    document.getElementById("ansUnitExp").style.backgroundColor = "";
}

function showExpHint() {
    document.getElementById("expHint").style.backgroundColor = "aqua";
    document.getElementById("ansN").style.backgroundColor = "aqua";
}

function clearExpHint() {
    document.getElementById("expHint").style.backgroundColor = "";
    document.getElementById("ansN").style.backgroundColor = "";    
}


function showShortExpHint() {
    document.getElementById("ansN").style.backgroundColor = "aqua";
    document.getElementById("hint-ansN").innerHTML = `(${iPrefixVal} - ${oPrefixVal}) * ${uExpVal} + ${quesN} = ${ansN}`;
}

function clearShortExpHint() {
    document.getElementById("ansN").style.backgroundColor = ""; 
    document.getElementById("hint-ansN").innerHTML = "Hint";

}