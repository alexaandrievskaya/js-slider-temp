function Carousel() {
    this.container = document.querySelector('#carousel');
    this.slides = this.container.querySelectorAll('.slide');
    this.indicatorContainer = this.container.querySelector('#indicators-container');
    this.indicators = this.indicatorContainer.querySelectorAll('.indicator');
    this.controls = this.container.querySelector('#controls-container');
    this.pauseBtn = this.controls.querySelector('#pause-btn');
    this.prevBtn = this.controls.querySelector('#prev-btn');
    this.nextBtn = this.controls.querySelector('#next-btn');

    this.currentSlide = 0;
    this.timerID = null;
    this.slidesCount = this.slides.length;
    this.interval = 2000;
    this.isPlaying = true;
    this.swipeStartX = null;
    this.swipeEndX = null;

    this.SPACE = ' ';
    this.LEFT_ARROW = 'ArrowLeft';
    this.RIGHT_ARROW = 'ArrowRight';
    this.FA_PAUSE = '<i class="fas fa-pause"></i>';
    this.FA_PLAY = '<i class="fas fa-play"></i>';

    this.initListeners();
}

Carousel.prototype = {
    initListeners () {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
        this.container.addEventListener('touchstart', this.swipeStart.bind(this));
        this.container.addEventListener('touchend', this.swipeEnd.bind(this));
    },
    gotoNth (n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (this.slidesCount + n) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },
    gotoPrev () {
        this.gotoNth(this.currentSlide - 1);
    },
    gotoNext () {
        this.gotoNth(this.currentSlide + 1);
    },
    play () {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = !this.isPlaying;
    this.timerID = setInterval(this.gotoNext.bind(this), this.interval);
    },

    pause () {
    if (this.isPlaying) {
        this.pauseBtn.innerHTML = this.FA_PLAY;
        this.isPlaying = !this.isPlaying;
        clearInterval(this.timerID);
        }
    },

    pausePlay () {
    if (this.isPlaying) this.pause();
    else this.play();
    },

    prev () {
    this.pause();
    this.gotoPrev();
    },

    next () {
    this.pause();
    this.gotoNext();
    },

    indicate (e) {
        let target = e.target;

        if (target.classList.contains('indicator')) {
            this.pause();
            this.gotoNth(+target.getAttribute('data-slide-to'));
        }
    },

    pressKey (e) {
        if (e.key === this.SPACE) this.pausePlay();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.LEFT_ARROW) this.prev();
    },

    swipeStart (e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    },

    swipeEnd (e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX- this.swipeEndX > 100) this.next();
        if (this.swipeStartX- this.swipeEndX < -100) this.prev();
    },
    init () {
        this.timerID = setInterval(() => this.gotoNext(), this.interval);
    },
};

