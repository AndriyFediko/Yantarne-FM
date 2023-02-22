let slideNumb = 1;
let stream;
let streamVolume = 0.5;
function titleFetch(){
    fetch('https://complex.in.ua/status-json.xsl?mount=/yantarne')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let perfomersName = String(data.icestats.source.title).slice(0, String(data.icestats.source.title).indexOf("-"));
        let songName = String(data.icestats.source.title).slice(String(data.icestats.source.title).indexOf("-")+2);
        $(".performerName").text(perfomersName);
        $(".musicName").text(songName);
        if(data.icestats.source.title == "YANTARNE.FM"){
            $(".performerName").text("YANTARNE.FM");
            $(".musicName").text("YANTARNE.FM");
        }
    });
}
titleFetch();
setInterval(titleFetch, 5000);
$("#volumeInp").on("input", function () {
    $("#volumeInpCursor").css("margin-left", `${$("#volumeInp").val()*100-10}%`);
    if ($("#volumeInp").val() <= 0) {
        $("#volumeInpCursor").css("margin-left", `0%`);
    }
    streamVolume = $("#volumeInp").val();
    stream.volume = streamVolume;
});
$("#controlBtn").click(function () {
    $("#controlBtn").toggleClass("playBtn");
    $("#controlBtn").toggleClass("pauseBtn");
    if ($("#controlBtn").hasClass("pauseBtn")) {
        fetch('https://complex.in.ua/status-json.xsl?mount=/yantarne')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                stream = new Audio(data.icestats.source.listenurl);
                stream.play();
                stream.volume = streamVolume;
            });
    } else if ($("#controlBtn").hasClass("playBtn")) {
        stream.pause();
    }
});
function changeBg(n) {
    if (n == 1) $(".homePage").css("background-image", `url(./img/bgImg1.jpg)`);
    else if (n == 2) $(".homePage").css("background-image", `url(./img/bgImg2.jpg)`);
    else if (n == 3) $(".homePage").css("background-image", `url(./img/bgImg3.jpg)`);
    else if (n == 4) $(".homePage").css("background-image", `url(./img/bgImg4.jpg)`);
    else $(".homePage").css("background-image", `url(./img/bgImg5.jpg)`);
}
$("#sliderBtnPrev").click(function () {
    if (slideNumb > 1) {
        slideNumb--;
        $(".radioBtn").removeClass("radioBtn__active");
        $(`.radioBtn:nth-child(${slideNumb})`).addClass("radioBtn__active");
    }
    changeBg(slideNumb);
});
$("#sliderbtnNext").click(function () {
    if (slideNumb < 5) {
        slideNumb++;
        $(".radioBtn").removeClass("radioBtn__active");
        $(`.radioBtn:nth-child(${slideNumb})`).addClass("radioBtn__active");
    }
    changeBg(slideNumb);
});
function GetTargetNunber(a) {
    let all = document.querySelectorAll(".radioBtn");
    let target = a.target;
    let countAll = 0;
    let targetCount = 0;
    for (one of all) {
        countAll++;
        if (one == target) {
            targetCount = countAll;
        }
    }
    return targetCount;
}
$(".radioBtn").click(function (e) {
    $(".radioBtn").removeClass("radioBtn__active");
    $(this).addClass("radioBtn__active");
    slideNumb = GetTargetNunber(e);
    changeBg(slideNumb);
});
setInterval(function () {
    slideNumb++;
    if (slideNumb > 5) {
        slideNumb = 1;
    }
    changeBg(slideNumb);
    $(".radioBtn").removeClass("radioBtn__active");
    $(`.radioBtn:nth-child(${slideNumb})`).addClass("radioBtn__active");
}, 10000);