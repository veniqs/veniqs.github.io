var time = 0;
var finalTime;
var timeout;
var startButton = $(".start");
var images = $("img.hidden");
var timerIsOn = false;

startButton.bind("click", start);
images.bind("click", next);

function restart() {
    time = 0;
    $("span.imput").each(function () {
        $(this).text("");
    });
    $("span.time").text("");
};

function startTimer() {
    timeout = setTimeout(addTime, 100);
};

function stopTimer() {
    clearTimeout(timeout);
    timerIsOn = true;
};

function addTime() {

    time += 0.1;
    $(".time").text(time.toFixed(1));
    timeout = setTimeout(addTime, 100);

};

function start(event) {
    restart();
    startTimer();
    $("img.k1img").removeClass("hidden");
    $("div.k1img").removeClass("hodden");
    startButton.addClass("hidden");
};

function next(event) {
    var currImg = getCurrentImage();
    if (getIfCanPassNext(currImg, event)) {
        currImg.correspondingOutput.text(time.toFixed(1));
        currImg.correspondingTask.addClass("hodden");
        currImg.correspondingTask.next().removeClass("hodden");
        currImg.image.addClass("hidden");
        currImg.image.next().removeClass("hidden");

        if (currImg.image.next().length == 0) {
            stopTimer();
            startButton.removeClass("hidden");
        }
    }
};

function getIfCanPassNext(image, $event) {
    var $target = $($event.target);
    var posX = $target.offset().left;
    posY = $target.offset().top;

    var finalClickedX = ($event.pageX - posX);
    var finalClickedY = ($event.pageY - posY);
   // alert("x = " + finalClickedX + " y = " + finalClickedY);


    if (numberBetween(image.height, finalClickedY, image.fat) && numberBetween(image.width, finalClickedX, image.fat)) {
        return true;
    }
    return false;
};


function numberBetween(imgPlace, click, fat) {
    return numberBetweenLiterally(imgPlace - fat, click, imgPlace + fat)
}

function numberBetweenLiterally(x, y, z) {
    return (x <= y && y <= z);
}

function getCurrentImage() {
    return {
        image: $(".images img:not('.hidden')"),
        height: $(".images img:not('.hidden')").data("hai"),
        width: $(".images img:not('.hidden')").data("wid"),
        fat: $(".images img:not('.hidden')").data("fat"),
        correspondingOutput: getCorrespondingOutput($(".images img:not('.hidden')")),
        correspondingTask: getCorrespondingTask($(".images img:not('.hidden')"))
    };
};

function getCorrespondingTask(img) {
    return $("div." + img.attr('class'));
};

function getCorrespondingOutput(img) {
    return $("span." + img.attr('class'));
};