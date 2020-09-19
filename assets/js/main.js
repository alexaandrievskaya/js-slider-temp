(function () {
    let container = document.querySelector('#carousel');
    let slides = container.querySelectorAll('.slide');
    let indicatorContainer = container.querySelector('#indicators-container');
    let indicators = indicatorContainer.querySelectorAll('.indicator');
    let controls = container.querySelector('#controls-container');
    let pauseBtn = controls.querySelector('#pause-btn');
    let prevBtn = controls.querySelector('#prev-btn');
    let nextBtn = controls.querySelector('#next-btn');

    const SPACE = ' ';
    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';
    const FA_PAUSE = '<i class="fas fa-pause"></i>';
    const FA_PLAY = '<i class="fas fa-play"></i>';

    let currentSlide = 0;
    let timerID = null;
    let slidesCount = slides.length;
    let interval = 2000;
    let isPlaying = true;
    let swipeStartX = null;
    let swipeEndX = null;


    function gotoNth(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (slidesCount + n) % slidesCount;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    }

    /*function nextSlide() {
        slides[currentSlide].classList.toggle('active');

        currentSlide = (currentSlide +1) % slidesCount;
        if (currentSlide === 4) currentSlide = 0;
        else currentSlide++;
        slides[currentSlide].classList.toggle('active');
    }*/

    function gotoPrev() {
        gotoNth(currentSlide - 1);
    }

    function gotoNext() {
        gotoNth(currentSlide + 1);
    }

    function play() {
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaying = !isPlaying;
        timerID = setInterval(gotoNext, interval);
    }

    function pause() {
        if (isPlaying) {
            pauseBtn.innerHTML = FA_PLAY;
            isPlaying = !isPlaying;
            clearInterval(timerID);
        }
    }

    function pausePlay() {
        if (isPlaying) pause();
        else play();
    }

    function prev() {
        pause();
        gotoPrev();
    }

    function next() {
        pause();
        gotoNext();
    }

    function indicate(e) {
        let target = e.target;

        if (target.classList.contains('indicator')) {
            pause();
            gotoNth(+target.getAttribute('data-slide-to'));
            //gotoNth(+target.dataset.sileTo);
        }
    }

    function pressKey(e) {
        if (e.key === SPACE) pausePlay();
        if (e.key === RIGHT_ARROW) next();
        if (e.key === LEFT_ARROW) prev();
    }

    function swipeStart(e) {
        swipeStartX = e.changedTouches[0].pageX;
    }

    function swipeEnd(e) {
        swipeEndX = e.changedTouches[0].pageX;
        if (swipeStartX- swipeEndX > 100) next();
        if (swipeStartX- swipeEndX < -100) prev();
        /*swipeStartX- swipeEndX > 100 && next();
        swipeStartX- swipeEndX < -100 && prev();*/
    }

    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);

    timerID = setInterval(gotoNext, interval);
}());
