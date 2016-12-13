//self-actuating function 

var currentQuestion;

var makeQuestion = function (question, answers) {
    return {
        question: question,
        answer: answers
    };
};

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
    });

    return {
        answers: answersSorted,
        correctAnswerIndex: correctAnswerIndex
    };
};

var questions = [
    makeQuestion("Where does Chris Rea drive to?", makeAnswer(["Bare foot to Dundee.", "Home for Christmas."], 2)),
    makeQuestion("Which future President appeared in Home Alone 2?", makeAnswer(["Kanye West.", "Donald Trump."], 2)),
    makeQuestion("What did Jona Lewie want to stop?", makeAnswer(["He wanted to stop trade sanctions in Russia.", "He wanted to stop the cavalry."], 2)),
    makeQuestion("What did Jimmy Stewart proclaim?", makeAnswer(["‘It’s a wonderful quasi-religious holiday!!’", "‘It’s a wonderful life!’"], 2)),
    makeQuestion("What did the three wise men follow?", makeAnswer(["Your mum on Twitter.", "A really bright star."], 2)),
    makeQuestion("Christmas is all about the spirit of what…", makeAnswer(["Giving.", "Getting your credit rating up."], 1)),
    makeQuestion("Perry Como thought it was beginning to look a lot like…", makeAnswer(["The Death of Democracy.", "Christmas."], 2)),
    makeQuestion("‘Feliz Navidad’ translates as…", makeAnswer(["Merry Christmas.", "Husk of a woman."], 1)),
    makeQuestion("Mince Pies are made from...", makeAnswer(["Mince Meat.", "Mints Meat."], 1)),
    makeQuestion("What kind of sauce do you have at Christmas dinner?", makeAnswer(["Bread sauce.", "Curry sauce."], 1)),
    makeQuestion("Baby Jesus was born in...", makeAnswer(["A stable.", "A world-renowned ICU unit."], 1)),
    makeQuestion("Bono is famous for bellowing what line in a Christmas song?", makeAnswer(["‘AND TONIGHT THANK GOD IT’S THEM INSTEAD OF YOUUU’", "‘The John Lewis adverts do not translate, culturally, in the sub saharan continent’"], 1)),
    makeQuestion("Baby if you’ve got to go away...", makeAnswer(["I don’t think I can take the pain, won’t you stay another day? ", "Could you please take the bins out?"], 1)),
    makeQuestion("Last year George Michael gave you what?", makeAnswer(["His Heart.", "His famous Festive Reacharound."], 1)),
    makeQuestion("Mulled Wine is made of...", makeAnswer(["Red Wine, Spices and Fruit.", "Tatties, Lemon Essence and an old shoe."], 1)),
    makeQuestion("If Christmas was in fact ‘everyday’ as Wizzard proposed, would it be...", makeAnswer(["A wondrous thing, full of hope and happiness.", "A logistical, and financially crippling, nightmare that would bring an end to society as we know it."], 1)),
    makeQuestion("What usually pulls Santa’s sleigh...", makeAnswer(["A special Christmas horse.", "Magical flying Christmas Reindeer."], 2)),
    makeQuestion("The weather outside is frightful and the fire is...", makeAnswer(["So delightful.", "Uncontrollably raging through the village, it’s power knowing no bounds."], 1)),
    makeQuestion("All Mariah Carey wants for Christmas is...", makeAnswer(["A better world for the next generation.", "You. Whoever you are."], 2)),
    makeQuestion("The Sticky Bandits are...", makeAnswer(["The baddies in Home Alone 2.", "The band the Beatles could’ve been."], 1)),
    makeQuestion("Rudolph’s Red Nose...", makeAnswer(["Guides him home.", "Is a sign of chronic-alcoholism."], 1)),
    makeQuestion("What does The Queen do on Christmas Day?", makeAnswer(["Get up early, open some presents, get the dinner on, eat at a weird time, pass out in front of the TV early on, wake up again, eat some cheese then call it a day.", "A speech."], 2)),
    makeQuestion("Kris Kringle is another name used by who?", makeAnswer(["Santa.", "Gary Barlow on his tax returns."], 1)),
    makeQuestion("‘The Santa Clause’ is what?", makeAnswer(["A wonderful film starring Tim Allen.", "A little known clause in The UN Human Rights Article that states Santa is in fact allowed free entry into any Nando’s in Europe."], 1)),
    makeQuestion("My name is Buddy, I grew up in the North Pole and I think I am what?", makeAnswer(["An Elf.", "Owed a living by the rest of the world."], 1)),
    makeQuestion("I’m Alan from Dundee, I have a question for you... ‘Where’s Santa Fe?’", makeAnswer(["Lapland.", "New Mexico."], 1)),
    makeQuestion("In the early 90’s which band of plucky girl stars bagged three UK Christmas Number Ones?", makeAnswer(["Spice Girls.", "The Bob The Builder Experience."], 1)),
    makeQuestion("Rather than be a Footballer like his Father, Cruz Beckham, has opted to be a what this Christmas?", makeAnswer(["Singer, like Mariah Carey.", "Instagram botherer, like his brother."], 1)),
    makeQuestion("According to Tito, Jackie and the rest of the troops, where is Santa coming to?", makeAnswer(["Town.", "An iMax near you soon."], 1)),
    makeQuestion("‘Planes, Trains and Automobiles’ is the hilarious misadventures of two unlikely friends as they set out to...", makeAnswer(["Get home to their families for Christmas.", "Broker a peace deal in the middle east, against a backdrop of speaking only conversational Arabic."], 1)),
    makeQuestion("What did Rudolph think about the fact that he couldn’t play Reindeer Games?", makeAnswer(["Sadness.", "Honestly, couldn’t give two carrots, what even are ‘Reindeer Games’ anyway?"], 1)),
    makeQuestion("I’m on my way to Middlesbrough in a Mini, the road ahead is...", makeAnswer(["Clear as day.", "Top to Toe in Tailbacks."], 1)),
    makeQuestion("", makeAnswer(["", ""], 2))
]

function setupQuestions() {
    setCurrentQuestion();
    setupAnswers(currentQuestion);
    animateIntro();
}

function setupAnswers(question) {
    var answers = question.answer.answers;
    answers.forEach(function (answer) {
        var answerDiv = $('<div class="answer-' + answer.sortOrder + ' answer-option" data-sort-order="' + answer.sortOrder + '">' + answer.text + '</div>');
        $('.answer-container').append(answerDiv);
    });

    $('.answer-option').click(function () {
        var obj = $(this);
        var sortOrder = obj.attr("data-sort-order") * 1;
        if (currentQuestion.answer.correctAnswerIndex === sortOrder) {
            $('.santa-blocker-body').addClass('hide');
            $('.santa-blocker-hidden').removeClass('hide');
            $('body').css("overflow-y", "visible");
        }
        else {
            $(".answer-option").remove();
            setCurrentQuestion();
            setupAnswers(currentQuestion);
        }
    });
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
        $(".text-container").addClass("text-question-container");
    }, 8000)
}

function setCurrentQuestion() {
    var questionList = questions;
    if (currentQuestion) {
        questionList = questions.filter(function (item) {
            return item.question !== currentQuestion.question;
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
