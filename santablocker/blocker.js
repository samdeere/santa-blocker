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
    initialBody.hide();
    $('body').load(chrome.extension.getURL("blocker.html"), function(){
        setupBlocker();
    });
    // http://stackoverflow.com/questions/32269398/load-html-file-from-file-system-with-chrome-extension    
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
    $(".blocker-success").css("display", "none");
    $(".blocker-failure").css("display", "none");
    $(".blocker-retry").css("display", "none");
    $(".blocker-text-input").val();
}

function checkAnswer(answer){
    if(currentQuestion.answer === answer){
        $(".blocker-success").css("display", "block");
        initialBody.show();
    }
    else {
        $(".blocker-failure").css("display", "block");
        $(".blocker-retry").css("display", "block");
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