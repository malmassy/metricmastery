// Runs when the page is loaded
window.onload = function() {
    generateProblem();
};

// Constants
const units = {
    meters: { symbol: 'm' },
    grams: { symbol: 'g' },
    liters: { symbol: 'L' },
};

// Variables to store problem details
let quesM, quesN, inputPrefix, outputPrefix, unitExp;
let uExpVal, iPrefixVal, oPrefixVal, ansN;

// Utility Functions
function getRandomNumber(min, max, decimals) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getValueForQuestion() {
    quesM = getRandomNumber(1, 10, 2);
    quesN = getRandomInteger(-7, 10);
    return [quesM, quesN];
}

function getValueFromSN(m, n) {
    const value = m * Math.pow(10, n);
    if (Math.abs(value) >= 1) {
        return value.toLocaleString('en-US', { maximumFractionDigits: 4 });
    } else {
        const decimalPlaces = Math.abs(n) + Math.floor(Math.log10(Math.abs(m))) + 2;
        return value.toFixed(decimalPlaces > 0 ? decimalPlaces : 0).replace(/\.?0+$/, '');
    }
}

function collapseAll() {
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(collapsible => {
        collapsible.classList.remove('active');
        const content = collapsible.nextElementSibling;
        content.style.display = 'none';
    });
}

function clearAnswerAndFeedback() {
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('answerInput').value = '';

}

// Main Function to Generate Problems
function generateProblem() {
    collapseAll();
    clearAnswerAndFeedback();

    const unit = getRandomElement(Object.keys(units));
    let unitExp = 1;

    if (unit == 'meters') {
        unitExp = getRandomInteger(1, 3);
    }

    // Generate prefixes for input and output
    let inputPrefix, outputPrefix;
    do {
        inputPrefix = getRandomElement(Object.keys(metricPrefixes));
        outputPrefix = getRandomElement(Object.keys(metricPrefixes));
    } while (outputPrefix === inputPrefix || outputPrefix == 'micro');

    // Generate question values
    const quesM = getRandomNumber(1, 10, 2);
    const quesN = getRandomInteger(-7, 10);

    // Calculate the answer
    const inputExp = metricPrefixes[inputPrefix].exponent;
    const outputExp = metricPrefixes[outputPrefix].exponent;
    const ansN = quesN + unitExp * (inputExp - outputExp);

    // Avoid problematic cases
    if (Math.abs(ansN) > 47) {
        return generateProblem();
    }

    /*
    console.log(quesM);
    console.log(quesN);
    console.log(ansN);
    */

    // Format the question
    const useScientificNotation = Math.random() < 0.5;
    const useFullUnitName = Math.random() < 0.5;
    const quesDisplay = useScientificNotation
        ? `${quesM} x 10<sup>${quesN}</sup>`
        : `${getValueFromSN(quesM, quesN)}`;

    let iDisplay;
    let oDisplay;

    let unitExpText;

    if (unitExp == 2) {
        unitExpText = "square ";
    } else if (unitExp == 3) {
        unitExpText = "cubic ";
    } else {
        unitExpText = "";
    }

    if (useFullUnitName) {
        iDisplay = `${unitExpText}${inputPrefix === 'base' ? '' : inputPrefix}${unit}`;
        oDisplay = `${unitExpText}${outputPrefix === 'base' ? '' : outputPrefix}${unit}`;
    } else {
        iDisplay = `${metricPrefixes[inputPrefix].symbol}${units[unit].symbol}<sup>${unitExp == 1 ? '' : unitExp}</sup>`;
        oDisplay = `${metricPrefixes[outputPrefix].symbol}${units[unit].symbol}<sup>${unitExp == 1 ? '' : unitExp}</sup>`;
    }

    // Display the problem
    const problemElement = document.getElementById('problem');
    problemElement.innerHTML = `Convert ${quesDisplay} ${iDisplay} to ${oDisplay}.`;

    // Save problem details for validation
    window.problemDetails = { quesM, quesN, ansN, unit, inputPrefix, outputPrefix, unitExp };

    updateStepOneHint(useScientificNotation, quesM, quesN);
    updateStepTwoHint(inputPrefix, outputPrefix);
    updateStepThreeHint(inputExp, outputExp, unitExp, quesN, ansN);
    updateStepFourHint(quesM, ansN, oDisplay);
}

function updateStepOneHint(useScientificNotation, quesM, quesN) {
    const stepOneHint = document.getElementById('step-1-hint');
    let hint;

    if (useScientificNotation) {
        hint = `${quesM} x 10<sup><b>${quesN}</b></sup> is already in scientific notation. Proceed to Step 2.`;
    } else {
        hint = `${getValueFromSN(quesM, quesN)} = <b>${quesM} x 10<sup><b>${quesN}</b></sup></b>.`;
    }

    stepOneHint.innerHTML = hint;
}

function updateStepTwoHint(inputPrefix, outputPrefix) {
    const stepTwoHint = document.getElementById('step-2-hint');
    let hint;

    hint = `${inputPrefix}, ${metricPrefixes[inputPrefix].symbol}, <b>${metricPrefixes[inputPrefix].exponent}</b>
            </br>
            ${outputPrefix}, ${metricPrefixes[outputPrefix].symbol}, <b>${metricPrefixes[outputPrefix].exponent}</b>`;

    stepTwoHint.innerHTML = hint;
}

function updateStepThreeHint(inputExp, outputExp, unitExp, quesN, ansN) {
    const stepThreeHint = document.getElementById('step-3-hint');
    let hint = `<p>
        "I" Input Prefix Exponent: ${inputExp}</br>
        "O" Output Prefix Exponent: ${outputExp}</br>
        "U" Unit Exponent: ${unitExp}</br>
        "Q" Question Value Exponent:  ${quesN}</br></br>
        (I - O) x U + Q &rarr;
        [ (<u>${inputExp}</u> - <u>${outputExp}</u>) x <u>${unitExp}</u> + <u>${quesN}</u> ] = <b>${ansN}</b>.
    </p>`;

    stepThreeHint.innerHTML = hint;
}

function updateStepFourHint(quesM, ansN, oDisplay) {
    const stepFourHint = document.getElementById('step-4-hint');
    let hint = `${quesM} x 10<sup>${ansN}</sup> ${oDisplay}.`;

    stepFourHint.innerHTML = hint;
}

function checkAnswer() {
    document.getElementById('feedback').style.display = 'inline-block';

    const answer = document.getElementById('answerInput').value.trim();
    const feedbackElement = document.getElementById('feedback');

    const regex = /^([0-9]\.[\d]+)\s?(?:[xX]\s?10)\s?\^(-?\d+)\s?([a-zA-Z]+)(?:\^([1-9]))?(?:[\s\.]*)$/;
    const match = answer.match(regex);

    let ansM, base, ansN, ansUnits, ansUnitsExp;

    if (!match) {
        feedbackElement.style.textAlign = "left";
        feedbackElement.innerHTML = `
            Your answer does not appear to be properly formatted.</br></br>
            It should be something like:</br>1.23 x 10^5 cm^2</br>1.23x10^4 deciliters.
            `;

        return;
    }

    ansM = match[1];
    ansN = match[2];
    ansUnits = match[3];
    ansUnitsExp = (match[4] == null ? 1 : match[4]);
    console.log(`ansM: ${ansM}\nansN: ${ansN}\nansUnits: ${ansUnits}\nansUnitsExp: ${ansUnitsExp}`);
    console.log(`corrM: ${window.problemDetails.quesM}\ncorrN: ${window.problemDetails.ansN}\ncorrUnitExp: ${window.problemDetails.unitExp}`);
    
    let acceptableUnits = [
        `${window.problemDetails.outputPrefix === 'base' ? '' : window.problemDetails.outputPrefix}${window.problemDetails.unit}`,
        `${metricPrefixes[window.problemDetails.outputPrefix].symbol}${units[window.problemDetails.unit].symbol}`
        ];


    mCorrect = ansM == window.problemDetails.quesM;
    nCorrect = ansN == window.problemDetails.ansN;
    unitsCorrect = acceptableUnits.includes(ansUnits);
    unitExpCorrect = ansUnitsExp == window.problemDetails.unitExp;


    // Generate feedback for each component
    const feedbackItems = [
        { correct: mCorrect, label: 'Mantissa' },
        { correct: nCorrect, label: 'Exponent' },
        { correct: unitsCorrect, label: 'Units' },
        { correct: unitExpCorrect, label: 'Unit Exponent' },
    ];

    feedbackElement.innerHTML = feedbackItems.map(item => `
        <div class="feedback-item">
            <span>${item.correct ? '✅' : '❌'}</span>
            <span>${item.label}</span>
        </div>
    `).join('');

    // Overall feedback
    if (feedbackItems.every(item => item.correct)) {
        feedbackElement.innerHTML += '<div class="feedback-item correct">✅ Correct! Well done!</div>';
    } else {
        feedbackElement.innerHTML += '<div class="feedback-item incorrect">❌ Incorrect. Please try again.</div>';
    }
}