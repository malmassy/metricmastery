window.onload = function() {
    loadQuestion(0);
}

const questions = 
[
	{
	type: 'conversion', 
	question: `A pharmaceutical company is testing a new medication, and they 
				need to measure out 3,781 milligrams (mg) of an active ingredient. 
				However, the lab only uses grams (g) for their measurements. 
				How many grams of the active ingredient should the lab use for the test?`
	,
	answer: '3.781 g',
	hint: 'The exponent for milligrams is -3.',
	explanation: `&bull;Re-write the question in our standard form: "Convert 3.781 * 10<sup>3</sup> mg to g".</br>
			&bull;Pull the exponent for the metric prefix units (Input &rarr; "m" &rarr; -3; Output &rarr; "base" &rarr; 0).</br>
			&bull;Use our algorithm to get the exponent for your answer: (-3 - 0) * 1 + 3 = <b>0</b>.</br>
			&bull;Write your answer in scientific notation: "3.781 * 10<sup>3</sup> mg = 3.781 * 10<sup>0</sup> g.</br>
			&bull;Convert your answer out of scientific notation: 3.781 * 10<sup>0</sup> g = (3.781 * 1) g = <b>3.781 g</b>.
	`
	},
	{
	type: 'conversion', 
	question: `During a field trip to the zoo, Jim is asked to measure the height of a specific giraffe. 
				He finds that the giraffe is 5.2 meters (m) tall. For his project, he needs to record the
				height in centimeters (cm) instead of meters. How tall is the giraffe in centimeters?`
	,
	answer: '520 cm',
	hint: 'The exponent for cm is -2.',
	explanation: `&bull;Re-write the question in our standard form: "Convert 5.2 * 10<sup>0</sup> m to cm".</br>
			&bull;Pull the exponent for the metric prefix units (Input &rarr; "base" &rarr; 0; Output &rarr; "c" &rarr; -2).</br>
			&bull;Use our algorithm to get the exponent for your answer: (0 - -2) * 1 + 0 = <b>2</b>.</br>
			&bull;Write your answer in scientific notation: "5.2 * 10<sup>0</sup> m = 5.2 * 10<sup>2</sup> cm.</br>
			&bull;Convert your answer out of scientific notation: 5.2 * 10<sup>2</sup> cm = (5.2 * 100) cm = <b>520 cm</b>.</br>
	`
	},
	{
	type: 'conversion', 
	question: `Suppose you are tasked with converting the speed of a spacecraft traveling at 138.2 kilometers per second 
			into a different unit of measurement, specifically terameters per hour.
			Determine the equivalent speed of the spacecraft in terameters per hour.`
	,
	answer: '0.00049752 Tm/h',
	hint: 'The exponent for km is 3. The exponent for Tm is 12.',
	explanation: `&bull;Re-write the question in our standard form: "Convert 1.382 * 10<sup>2</sup> km/s to Tm/h".</br>
			&bull;Convert the denominator input units to output units (3.6 * 10<sup>3</sup>s/h).
			&bull;Multiply the input numerator by the converted denominator units: (1.382 * 10<sup>2</sup> km/s) * (3.6 * 10<sup>3</sup>s/h) = 4.9752 * 10<sup>5</sup> km/h".</br>
			&bull;Convert the numerator of the input to the numerator of the output: "(4.9752 * 10<sup>5</sup> km/h) * (10<sup>-9</sup> Tm/km) = 4.9752 * 10<sup>-4</sup> Tm/h".</br>
			&bull;Convert your answer out of scientific notation: 4.9752 * 10<sup>-4</sup> Tm/h = 0.00049752 Tm/h.</br>
	`
	},
	{
	type: 'conversion', 
	question: `The city wants to build a new park on a plot of land that measures 0.0314 square kilometers (km<sup>2</sup>). 
					In order to purchase materials and plan the layout, they need to know the area of the land in square meters (m<sup>2</sup>). 
					What is the area of the park in square meters?`
	,
	answer: '31,400 m^2',
	hint: 'The exponent for km is 3. Don\'t forget the formula "(I-O)*U + Q".',
	explanation: `&bull;Re-write the question in our standard form: "Convert 3.14 * 10<sup>-2</sup> km<sup>2</sup> to m<sup>2</sup>".</br>
			&bull;Pull the exponent for the metric prefix units (Input &rarr; "k" &rarr; 3; Output &rarr; "base" &rarr; 0).</br>
			&bull;Use our algorithm to get the exponent for your answer: (3 - 0) * 2 + (-2) = <b>4</b>.</br>
			&bull;Write your answer in scientific notation: "3.14 * 10<sup>4</sup> km<sup>2</sup> = 3.14 * 10<sup>4</sup> km<sup>2</sup>.</br>
			&bull;Convert your answer out of scientific notation: 3.14 * 10<sup>4</sup> km<sup>2</sup> = 31,400 m<sup>2</sup>.</br>

	`
	},
	{
	type: 'conversion', 
	question: `A company is building a small storage tank for holding a liquid chemical. The volume of the tank is 0.00123 cubic meters (m³).
					For their documentation and legal filings, the volume needs to be reported in cubic centimeters (cm³). 
					What is the volume of the storage tank in cubic centimeters?`
	,
	answer: '1,230 cm^3',
	hint: 'The exponent for cm is -2. Don\'t forget the formula "(I-O)*U + Q".',
	explanation: `&bull;Re-write the question in our standard form: "Convert 1.23 * 10<sup>-3</sup> m<sup>3</sup> to cm<sup>3</sup>".</br>
			&bull;Pull the exponent for the metric prefix units (Input &rarr; "base" &rarr; 0; Output &rarr; "c" &rarr; -2).</br>
			&bull;Use our algorithm to get the exponent for your answer: (0 - -2) * 3 + (-3) = <b>3</b>.</br>
			&bull;Write your answer in scientific notation: "1.23 * 10<sup>-3</sup> m<sup>3</sup> = 1.23 * 10<sup>3</sup> cm<sup>3</sup>.</br>
			&bull;Convert your answer out of scientific notation: 1.23 * 10<sup>3</sup> cm<sup>3</sup> = 1,230 cm<sup>3</sup>.</br>

	`
	}
]


let currentQuestion;

// Load a random question
function loadQuestion(index) {
    currentIndex = index;
    const currentQuestion = questions[currentIndex];
    document.getElementById('question-text').innerHTML = currentQuestion.question;
    document.getElementById('hint-content').innerHTML = currentQuestion.hint;
    document.getElementById('explanation-content').style.display = 'none';
    document.getElementById('student-answer').value = '';
	document.getElementById('scratch-work').value = ''; // Clear scratch work box
}

// Load the next question
function loadNextQuestion() {
    if (currentIndex < questions.length - 1) {
        loadQuestion(currentIndex + 1);
    } else {
        loadQuestion(0);
    }
}

// Load the last question
function loadLastQuestion() {
    if (currentIndex > 0) {
        loadQuestion(currentIndex - 1);
    } else {
        loadQuestion(questions.length - 1);
    }
}

// Load a random question
function loadRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    loadQuestion(randomIndex);
}

// Check the student's answer
function checkAnswer() {
    const studentAnswer = document.getElementById('student-answer').value.trim().replace(/\s+/g, '');
    const explanationContent = document.getElementById('explanation-content');
    if (studentAnswer === currentQuestion.answer.replace(/\s+/g, '')) {
        explanationContent.style.display = 'block';
        explanationContent.innerHTML = `✅ Correct!</br></br> ${currentQuestion.explanation}`;
    } else {
        explanationContent.style.display = 'block';
        explanationContent.innerHTML = `❌ Incorrect.</br></br> ${currentQuestion.explanation}`;
    }
}

// Toggle the hint visibility
function toggleHint() {
    const hintContent = document.getElementById('hint-content');
    hintContent.style.display = hintContent.style.display === 'none' ? 'block' : 'none';
}