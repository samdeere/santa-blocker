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
    console.log("christmas content -" + hasChristmasContent);
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

function showBlocker(){
    $('body').children().hide();
    $('body').load(chrome.extension.getURL("blocker.html"));
    // http://stackoverflow.com/questions/32269398/load-html-file-from-file-system-with-chrome-extension
}
    
//question manager

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

function setCurrentQuestion(number){
    currentQuestion = questions[number];
}

function checkAnswer(answer){
    if(currentQuestion.answer === answer){
        $(".blocker-success").css("display", "block");
    }
    else {
        $(".blocker-failure").css("display", "block");
    }
}

function setupBlockerQuestion(){
    var questionIndex = getRandomIntInclusive(0, question.length)
    setCurrentQuestion(questionIndex);
    $('.blocker-question').text(currentQuestion.question);
    $('.blocker-answer').click(function(){
        var answer = $(".blocker-text-input").val();
        checkAnswer(answer)
    });
}

function attemptAnswer(){

}

function getRandomIntExclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


//parallax manager