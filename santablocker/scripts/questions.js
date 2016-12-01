var currentQuestion;

var makeQuestion = function (question, answer, index) {
    return {
        question: question,
        answer: answer,
        index: index
    }
}

var questions = [
    makeQuestion("according to macaulay culkin who is meant to keep 'the change'?", "filthy animal",1),
    makeQuestion("another christmas question that's really funny", "answer", 2)
]

function setupQuestions() {
    setCurrentQuestion();

    $('.blocker-answer').click(function () {
        var answer = $(".blocker-text-input").val();
        checkAnswer(answer);
    });

    $('.blocker-retry').click(function () {
        setCurrentQuestion();
    });

    animateIntro();
}

function animateIntro(){
    $(".ho-1").delay(1000).fadeIn(400);
    $(".ho-2").delay(2000).fadeIn(400);
    $(".ho-3").delay(3000).fadeIn(400);
    $(".intro-2").delay(4000).fadeIn(400);
    $(".intro-3").delay(6000).fadeIn(400);

    setTimeout(function(){
        $(".text-intro").addClass("hide");
        $(".question-container").removeClass("hide").fadeIn(400);
    }, 8000)
}

function setCurrentQuestion() {
    var questionIndex = getRandomInt(0, questions.length);
    if(currentQuestion && questionIndex + 1 === currentQuestion.index){
        setCurrentQuestion();
    }
    currentQuestion = questions[questionIndex];
    $('.blocker-question').text(currentQuestion.question);
    reset();
}

function checkAnswer(answer) {
    reset();
    if (currentQuestion.answer === answer) {
        $(".blocker-success").css("display", "block");
        $('.santa-blocker-body').addClass('hide');
        $('.santa-blocker-hidden').removeClass('hide');
    }
    else {
        $(".blocker-failure").removeClass('hide');
        $(".blocker-retry").removeClass('hide');
    }
}

function reset() {
    $(".blocker-success").addClass('hide');
    $(".blocker-failure").addClass('hide');
    $(".blocker-retry").addClass('hide');
    $(".blocker-text-input").val('');
}
