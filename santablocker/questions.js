var currentQuestion;

var makeQuestion = function (question, answer){
    return {
        question: question,
        answer: answer
    }
}

var questions = [
    makeQuestion("question 1", "answer 1"),
    makeQuestion("question 2", "answer 2"),
    makeQuestion("question 3", "answer 3"),
    makeQuestion("question 4", "answer 4"),
    makeQuestion("question 5", "answer 5")
]

function setupQuestions(){
    setCurrentQuestion();
    $('.blocker-answer').click(function(){
        var answer = $(".blocker-text-input").val();
        checkAnswer(answer);
    });
    $('.blocker-retry').click(function(){
        setCurrentQuestion();
    });
}

function setCurrentQuestion(){
    var questionIndex = getRandomInt(0, questions.length);
    currentQuestion = questions[questionIndex];
    $('.blocker-question').text(currentQuestion.question);
    reset();
}

function checkAnswer(answer){
    reset();
    if(currentQuestion.answer === answer){
        $(".blocker-success").css("display", "block");
        $('.santa-blocker-body').addClass('hide');
        $('.santa-blocker-hidden').removeClass('hide');
    }
    else {
        $(".blocker-failure").removeClass('hide');
        $(".blocker-retry").removeClass('hide');
    }
}

function reset(){
    $(".blocker-success").addClass('hide');
    $(".blocker-failure").addClass('hide');
    $(".blocker-retry").addClass('hide');
    $(".blocker-text-input").val();
}
