    const questions = [
      { text: "How long is a pencil?", answer: 18, unit: "cm" },
      { text: "How tall is a giraffe?", answer: 500, unit: "cm" },
      { text: "What is the average weight of a cat?", answer: 4, unit: "kg" },
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
      questionElem.textContent = `${currentQuestion.text} (${currentQuestion.unit})`;
      answerInput.value = "";
      resultElem.textContent = "";
      correctIndicator.style.left = "50%";
      userIndicator.style.left = "-10px"; // Reset the user indicator
      correctLabel.textContent = `Correct Answer: ${currentQuestion.answer}${currentQuestion.unit}`;
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
      userLabel.textContent = `Your Answer: ${userAnswer}${currentQuestion.unit}`;

      // Feedback for the result
      let points = 0;
      let feedback = `You were ${absoluteError.toFixed(1)}${currentQuestion.unit} (${Math.abs(
        percentageError.toFixed(1)
      )}%) `;

      if (Math.abs(percentageError) <= 5) {
        feedback += "too close. Excellent!";
        points = 3;
      } else if (Math.abs(percentageError) <= 10) {
        feedback += "too close. Good job!";
        points = 2;
      } else if (Math.abs(percentageError) <= 20) {
        feedback += "away. Not bad.";
        points = 1;
      } else {
        feedback += "off. Try again!";
      }

      feedback += ` This is worth ${points} point${points === 1 ? "" : "s"}.`;
      resultElem.textContent = feedback;
    }

    submitButton.addEventListener("click", handleSubmit);
    window.addEventListener("load", loadNewQuestion);