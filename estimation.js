    const questions = [
      { text: "How long is a pencil?", answer: 18, unit: "cm" },
      { text: "How tall is a giraffe?", answer: 500, unit: "cm" },
      { text: "What is the average weight of a cat?", answer: 4, unit: "kg" },
      { text: "How <b>long</b> is an unsharpened #2 pencil?", answer: 19, unit: "cm"},
      { text: "How <b>wide</b> is an unsharpened #2 pencil?", answer: 10, unit: "mm"},
      { text: "How much does a beach ball weigh?", answer: 0.5, unit: "kg"},
      { text: "What is the diameter of a beach ball?", answer: 30, unit: "cm"},
      { text: "What is the volume of a beach ball?", answer: 14_000, unit: "cm<sup>3</sup>"},
      { text: "What is the circumference of a beach ball?", answer: 94, unit: "cm"},
      { text: "If the radius of a bowling ball is 10.8cm, what is the circumference?", answer: 68, unit: "cm"},
      { text: "How tall is the state of Colorado?", answer: 450, unit: "km"},
      { text: "How wide is the state of Colorado?", answer: 600, unit: "km"},
      { text: "What is the diameter of a dime?", answer: 18, unit: "mm"},
      { text: "What is the diameter of a quarter?", answer: 24, unit: "mm"},
      { text: "What is volume of a dime?", answer: 318, unit: "mm<sup>3</sup>"},                                                  
    ];

    const questionElem = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const feedbackBar = document.getElementById("feedback-bar");
    const correctIndicator = document.getElementById("correct-indicator");
    const userIndicator = document.getElementById("user-indicator");
    const correctLabel = document.getElementById("correct-label");
    const userLabel = document.getElementById("user-label");
    const resultElem = document.getElementById("result");

    let currentQuestion;

    function loadNewQuestion() {
      currentQuestion = questions[Math.floor(Math.random() * questions.length)];
      questionElem.innerHTML = `${currentQuestion.text} (${currentQuestion.unit})`;
      answerInput.value = "";
      resultElem.textContent = "";
      correctIndicator.style.left = "50%";
      correctIndicator.hidden = true;
      userIndicator.hidden = true;
      userIndicator.style.left = "-10px"; // Reset the user indicator
      correctLabel.innerHTML = `Correct Answer: ${currentQuestion.answer}${currentQuestion.unit}`;
    }

    function handleSubmit() {
      const userAnswer = parseFloat(answerInput.value);
      if (isNaN(userAnswer)) {
        resultElem.textContent = "Please enter a valid number.";
        return;
      }

      const correctAnswer = currentQuestion.answer;
      const percentageError = ((userAnswer - correctAnswer) / correctAnswer) * 100;
      const absoluteError = Math.abs(userAnswer - correctAnswer);

      // Update positions
      const barWidth = feedbackBar.clientWidth;
      const correctPosition = barWidth / 2; // Center
      const userPosition = correctPosition + (barWidth / 40) * percentageError;

      userIndicator.style.left = `${Math.min(Math.max(userPosition, 0), barWidth - 2)}px`;
      userLabel.innerHTML = `Your Answer: ${userAnswer}${currentQuestion.unit}`;

      correctIndicator.hidden = false;
      userIndicator.hidden = false;

      // Feedback for the result
      let points = 0;
      let feedback = `The correct answer is ${currentQuestion.answer}${currentQuestion.unit}.</br></br>Your answer (${userAnswer}${currentQuestion.unit}) is ${Math.abs(
        percentageError.toFixed(1)
      )}% away from the correct answer. `;

      if (Math.abs(percentageError) <= 5) {
        points = 5;
      } else if (Math.abs(percentageError) <= 10) {
        points = 3;
      } else if (Math.abs(percentageError) <= 20) {
        points = 1;
      } else {
        //feedback += "off. Try again!";
      }

      feedback += ` This is worth ${points} point${points === 1 ? "" : "s"}.`;
      resultElem.innerHTML = feedback;
    }

    submitButton.addEventListener("click", handleSubmit);
    window.addEventListener("load", loadNewQuestion);