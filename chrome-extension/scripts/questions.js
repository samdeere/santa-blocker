//self-actuating function 

var currentQuestion;

var makeQuestion = function (question, answer, index) {
    return {
        question: question,
        answer: answer,
        index: index
    }
}

var makeAnswer = function (answers, correctAnswerIndex) {
    var sortCounter = 1;
    var answersSorted = [];
    answers.forEach(function (answer) {
        var item = {
            text: answer,
            sortOrder: sortCounter
        };
        sortCounter++;
        answersSorted.push(item);
    })

    return {
        answers: answersSorted,
        correctAnswerIndex: correctAnswerIndex
    }
}

var questions = [
    makeQuestion("according to macaulay culkin who is meant to keep 'the change'?", makeAnswer(["filthy animal", "WAT"], 1)),
    makeQuestion("another christmas question that's really funny", "answer", makeAnswer(["1", "2", "3"], 2)),
    makeQuestion("question 3", makeAnswer(["1", "2", "3"], 3)),
    makeQuestion("question 4", makeAnswer(["1", "2", "3"], 2))
]

function setupQuestions() {
    setCurrentQuestion();
    setupAnswers(currentQuestion);
    animateIntro();
}

function setupAnswers(question) {
    question.answers.forEach(function (answer) {
        var answerDiv = $('<div class="answer-' + answer.sortOrder + ' answer-option" data-sort-order="' + answer.sortOrder + '">' + answer.text + '</div>');
        $('.answer-container').append(answerDiv);
    })

    $('.answer-option').click(function () {
        var obj = $(this);
        var sortOrder = obj.attr("data-sort-order");
        if (currentQuestion.correctAnswerIndex === sortOrder) {
            $('.santa-blocker-body').addClass('hide');
            $('.santa-blocker-hidden').removeClass('hide');
        }
        else {
            $(".answer-option").remove();
            setupAnswers(currentQuestion);
            setCurrentQuestion();
        }
    })
}

function animateIntro() {
    $(".ho-1").delay(1000).fadeIn(400);
    $(".ho-2").delay(2000).fadeIn(400);
    $(".ho-3").delay(3000).fadeIn(400);
    $(".intro-2").delay(4000).fadeIn(400);
    $(".intro-3").delay(6000).fadeIn(400);

    setTimeout(function () {
        $(".text-intro").addClass("hide");
        $(".question-container").removeClass("hide").fadeIn(400);
    }, 8000)
}

function setCurrentQuestion() {
    var questionList = questions;
    if (currentQuestion) {
        questionList = questions.filter(function (item) {
            return item.index !== currentQuestion.index;
        });
    }
    var questionIndex = getRandomInt(0, questionList.length);
    currentQuestion = questionList[questionIndex];
    $('.blocker-question').text(currentQuestion.question);
    reset();
}

function reset() {
    $(".question-option").remove();
}
