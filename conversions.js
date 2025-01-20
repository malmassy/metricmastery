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

const unitExponents = {
    base: { value: 1, fullText: '', expText: ''},
    square: { value: 2, fullText: 'square ', expText: '<sup>2</sup>'},
    cubic: { value: 3, fullText: 'cubic ', expText: '<sup>3</sup>'}
}

// Variables to store problem details
let quesM, quesN, numeratorUnits, numInputPrefix, numOutputPrefix, numUnitExp;
let hasDenominatorUnits = false, denInputPrefix = 'base', denOutputPrefix = 'base', denUnitExp = 'base';
let useScientificNotation, useFullUnitName;

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

function setProblemValues() {
    numeratorUnits = getRandomElement(Object.keys(units));

    quesM = getRandomNumber(1, 10, 2);
    quesN = getRandomInteger(-7, 10);
    numInputPrefix = getRandomElement(Object.keys(metricPrefixes));

    do {
        numOutputPrefix = getRandomElement(Object.keys(metricPrefixes));
    } while (numOutputPrefix === numInputPrefix || numOutputPrefix == 'micro');

    if (numeratorUnits == 'meters') {
        numUnitExp = getRandomElement(Object.keys(unitExponents));
        hasDenominatorUnits = false;
    } else {
        numUnitExp = 'base';
        hasDenominatorUnits = Math.random() < 0.4;
    }

    if (hasDenominatorUnits) {
        denInputPrefix = getRandomElement(Object.keys(metricPrefixes));

        do {
            denOutputPrefix = getRandomElement(Object.keys(metricPrefixes));
        } while (denInputPrefix === denOutputPrefix || denOutputPrefix == 'micro');

        denUnitExp = getRandomElement(Object.keys(unitExponents));
    } else {
        denInputPrefix = 'base';
        denOutputPrefix = 'base';
        denUnitExp = 'base';
    }
}

function getAnswerN(showAnswer) {

    if (showAnswer) {
        console.log(
            `${quesN} + ${unitExponents[numUnitExp].value} * (${metricPrefixes[numInputPrefix].exponent} - ${metricPrefixes[numOutputPrefix].exponent}) -((${metricPrefixes[denInputPrefix].exponent} - ${metricPrefixes[denOutputPrefix].exponent}) * ${unitExponents[denUnitExp].value});`
        );
    }


    return quesN + 
        unitExponents[numUnitExp].value * 
        (metricPrefixes[numInputPrefix].exponent - metricPrefixes[numOutputPrefix].exponent) -
        ((metricPrefixes[denInputPrefix].exponent - metricPrefixes[denOutputPrefix].exponent) * unitExponents[denUnitExp].value);
}

function getTextFullUnitsNoDenom(inputOrOutput) {
    // e.g. 'cubic millimeters'
    if (inputOrOutput == 'input') {
        return `${unitExponents[numUnitExp].fullText}${numInputPrefix == 'base' ? '' : numInputPrefix}${numeratorUnits}`;
    } else {
        return `${unitExponents[numUnitExp].fullText}${numOutputPrefix == 'base' ? '' : numOutputPrefix}${numeratorUnits}`;
    }
}

function getTextAbbrevUnitsNoDenom(inputOrOutput) {
    if (inputOrOutput == 'input') {
        return `${metricPrefixes[numInputPrefix].symbol}${units[numeratorUnits].symbol}${unitExponents[numUnitExp].expText}`;
    } else {
        return `${metricPrefixes[numOutputPrefix].symbol}${units[numeratorUnits].symbol}${unitExponents[numUnitExp].expText}`;
    }
}

function getTextFullUnitsWithDenom(inputOrOutput) {
    if (inputOrOutput == 'input') {
        return `${numInputPrefix == 'base' ? '' : numInputPrefix}${numeratorUnits} 
        per ${unitExponents[denUnitExp].fullText}${denInputPrefix == 'base' ? '' : denInputPrefix}meter`;
    } else {
        return `${numOutputPrefix == 'base' ? '' : numOutputPrefix}${numeratorUnits} 
        per ${unitExponents[denUnitExp].fullText}${denOutputPrefix == 'base' ? '' : denOutputPrefix}meter`;
    }
}

function getTextAbbrevUnitsWithDenom(inputOrOutput) {
        if (inputOrOutput == 'input') {
        return `${metricPrefixes[numInputPrefix].symbol}${units[numeratorUnits].symbol}${unitExponents[numUnitExp].expText}/${metricPrefixes[denInputPrefix].symbol}m${unitExponents[denUnitExp].expText}`;
    } else {
        return `${metricPrefixes[numOutputPrefix].symbol}${units[numeratorUnits].symbol}${unitExponents[numUnitExp].expText}/${metricPrefixes[denOutputPrefix].symbol}m${unitExponents[denUnitExp].expText}`;        
    }
}

function setQuestionText() {
    useScientificNotation = Math.random() < 0.5;
    useFullUnitName = Math.random() < 0.5;

    let mDisplayText;

    if (useScientificNotation) {
        mDisplayText = `${quesM} x 10<sup>${quesN}</sup>`;
    } else {
        mDisplayText = `${getValueFromSN(quesM, quesN)}`;
    }

    let iDisplay, oDisplay;

    if (hasDenominatorUnits && useFullUnitName) {
        iDisplay = getTextFullUnitsWithDenom('input');
        oDisplay = getTextFullUnitsWithDenom('output');
    } else if (!hasDenominatorUnits && useFullUnitName) {
        iDisplay = getTextFullUnitsNoDenom('input');
        oDisplay = getTextFullUnitsNoDenom('output');
    } else if (hasDenominatorUnits && !useFullUnitName) {
        iDisplay = getTextAbbrevUnitsWithDenom('input');
        oDisplay = getTextAbbrevUnitsWithDenom('output');
    } else {
        iDisplay = getTextAbbrevUnitsNoDenom('input');
        oDisplay = getTextAbbrevUnitsNoDenom('output');
    }

    document.getElementById('problem').innerHTML = `Convert ${mDisplayText} ${iDisplay} to ${oDisplay}.`;
    document.getElementById('unitDisplay').innerHTML = `${oDisplay}`;
}

// Main Function to Generate Problems
function generateProblem() {
    collapseAll();
    clearAnswerAndFeedback();

    // Avoid problematic cases where the answer is too large.    
    do {
        setProblemValues();
    } while (Math.abs(getAnswerN() > 47));

    console.log(getAnswerN(true));

    setQuestionText();

    // Save problem details for validation
    window.problemDetails = { quesM, quesN, numeratorUnits, numInputPrefix, numOutputPrefix, numUnitExp,
        denInputPrefix, denOutputPrefix, denUnitExp
    };

    if (hasDenominatorUnits) {
        document.getElementById('stepZero').style.display = 'inline-block';
        updateStepZeroHint();
    } else {
        document.getElementById('stepZero').style.display = 'none';
    }
    updateStepOneHint();
    updateStepTwoHint();
    updateStepThreeHint();
    updateStepFourHint();

    if (hasDenominatorUnits) {
        document.getElementById('stepThreeB').style.display = 'inline-block';
        updateStepThreeBHint();
    } else {
        document.getElementById('stepThreeB').style.display = 'none';
    }

}

function updateStepZeroHint() {
    const stepZeroHint = document.getElementById('step-0-hint');

    let iDisplay, oDisplay;

    let mDisplayText;

    if (useScientificNotation) {
        mDisplayText = `${quesM} x 10<sup>${quesN}</sup>`;
    } else {
        mDisplayText = `${getValueFromSN(quesM, quesN)}`;
    }

    if (useFullUnitName) {
        iDisplay = getTextFullUnitsNoDenom('input');
        oDisplay = getTextFullUnitsNoDenom('output');
    } else {
        iDisplay = getTextAbbrevUnitsNoDenom('input');
        oDisplay = getTextAbbrevUnitsNoDenom('output');
    }

    let numProblem = `Convert ${mDisplayText} ${iDisplay} to ${oDisplay}.`;

    stepZeroHint.innerHTML = `Ignore the denominator units for now, and first solve as if the problem is just:</br><b>${numProblem}</b>`;
}

function updateStepOneHint() {
    const stepOneHint = document.getElementById('step-1-hint');
    let hint;

    if (useScientificNotation) {
        hint = `${quesM} x 10<sup><b>${quesN}</b></sup> is already in scientific notation. Proceed to Step 2.`;
    } else {
        hint = `${getValueFromSN(quesM, quesN)} = <b>${quesM} x 10<sup><b>${quesN}</b></sup></b>.`;
    }

    stepOneHint.innerHTML = hint;
}

function updateStepTwoHint() {
    const stepTwoHint = document.getElementById('step-2-hint');
    let hint;

    hint = `<b>Inputs:</b> ${numInputPrefix}, ${metricPrefixes[numInputPrefix].symbol}, <b>${metricPrefixes[numInputPrefix].exponent}</b>
            </br>
            <b>Outputs:</b> ${numOutputPrefix}, ${metricPrefixes[numOutputPrefix].symbol}, <b>${metricPrefixes[numOutputPrefix].exponent}</b>`;

    stepTwoHint.innerHTML = hint;
}

function updateStepThreeHint() {
    const stepThreeHint = document.getElementById('step-3-hint');

    let finalValue = (metricPrefixes[numInputPrefix].exponent - metricPrefixes[numOutputPrefix].exponent) * unitExponents[numUnitExp].value + quesN;

    let hint = `<p>
        "I" Input Prefix Exponent: ${metricPrefixes[numInputPrefix].exponent}</br>
        "O" Output Prefix Exponent: ${metricPrefixes[numOutputPrefix].exponent}</br>
        "U" Unit Exponent: ${numUnitExp}</br>
        "Q" Question Value Exponent:  ${quesN}</br></br>
        (I - O) x U + Q &rarr;
        [ (<u>${metricPrefixes[numInputPrefix].exponent}</u> - <u>${metricPrefixes[numOutputPrefix].exponent}</u>) x <u>${unitExponents[numUnitExp].value}</u> + <u>${quesN}</u> ] = <b>${finalValue}</b>.
    </p>`;

    stepThreeHint.innerHTML = hint;
}


function updateStepThreeBHint() {
    const stepThreeBHint = document.getElementById('step-3b-hint');

    let hintText = 'Convert from the input unit of the denominator to the output, invert it (flip the sign of the exponent), and then add it to your exponent answer from step 3.'


    stepThreeBHint.innerHTML = hintText;
}

function updateStepFourHint() {
    const stepFourHint = document.getElementById('step-4-hint');
    let hint = `${quesM} x 10<sup>${getAnswerN()}</sup> ${document.getElementById('unitDisplay').innerHTML}.`;

    stepFourHint.innerHTML = hint;
}


function checkAnswer() {
    const feedbackElement = document.getElementById('feedback');

    feedbackElement.style.display = 'inline-block';

    const answer = document.getElementById('answerInput').value.trim();

    // Parse out the user's answer:
    const regex = /^([0-9]\.[\d]+)\s?(?:[xX]\s?10)\s?\^(-?\d+)$/;
    const match = answer.match(regex);

    if (!match) {
        feedbackElement.style.textAlign = "left";
        feedbackElement.innerHTML = `
            Your answer does not appear to be properly formatted.</br></br>
            It should be something like: 1.23 x 10^5`;

        return;
    }

    let ansM, base, ansN, ansUnits, ansUnitsExp;

    ansM = match[1];
    ansN = match[2];
    console.log(`userM: ${ansM}\nuserN: ${ansN}`);
    console.log(`corrM: ${window.problemDetails.quesM}\ncorrN: ${getAnswerN()}`);

    mCorrect = ansM == window.problemDetails.quesM;
    nCorrect = ansN == getAnswerN();

    // Generate feedback for each component
    const feedbackItems = [
        { correct: mCorrect, label: 'Mantissa' },
        { correct: nCorrect, label: 'Exponent' },
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