//this runs in the page

$(document).ready(function(){
    chrome.runtime.sendMessage({userPreferencesRequested: true}, function(response){
        if(response.blockingEnabled){
            initialize();
        }
    });
})

function initialize(){
    console.log("initialized");
    var pageText = nativeSelector().toString();
    var hasChristmasContent = pageText.match(christmasListRegex);
    console.log("christmas content - " + hasChristmasContent);
    if(hasChristmasContent){
        var hasNaughtyListContent = pageText.match(naughtListRegex);
        console.log("naughty list content - " + hasNaughtyListContent);
        if(hasNaughtyListContent){
            console.log("loading child lock");
            showBlocker();
        }
    }
}

function nativeSelector() {
    var elements = document.querySelectorAll("body, body *"); 
    var results = [];
    var child;
    for(var i = 0; i < elements.length; i++) {
        child = elements[i].childNodes[0];
        if(elements[i].hasChildNodes() && child.nodeType == 3) {
            results.push(child.nodeValue);
        }
    }
    return results;
}

var initialBody;

function showBlocker(){
    initialBody = $('body').children();
    initialBody.addClass('santa-blocker-hidden');
    $('.santa-blocker-hidden').addClass('hide');
    $('body').append('<div class="santa-blocker-body"></div>');
    $('.santa-blocker-body').load(chrome.extension.getURL("blocker.html"), function(){
        setupBlocker();
    });
}

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

var currentQuestion;

function setCurrentQuestion(){
    var questionIndex = getRandomInt(0, questions.length)
    currentQuestion = questions[questionIndex];
    $('.blocker-question').text(currentQuestion.question);
    reset();
}
function reset(){
    $(".blocker-success").addClass('hide');
    $(".blocker-failure").addClass('hide');
    $(".blocker-retry").addClass('hide');
    $(".blocker-text-input").val();
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

function setupBlocker(){
    setCurrentQuestion();
    $('.blocker-answer').click(function(){
        var answer = $(".blocker-text-input").val();
        checkAnswer(answer);
    });
    $('.blocker-retry').click(function(){
        setCurrentQuestion();
    });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//parallax manager