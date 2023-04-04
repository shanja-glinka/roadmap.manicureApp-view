// TODO: make dragAndMove for touch events

class ModalStoryProcess {

    constructor(storyesPages, styles, params) {
        this.storyesPages = storyesPages;
        this.styles = styles;
        this.params = params;

        this.progressContainer = document.querySelector('.' + this.styles.modalStoryProgressContainer);
        this.progress = [];
        this.backClick = document.querySelector('.' + this.styles.modalStoryEventBack);
        this.nextClick = document.querySelector('.' + this.styles.modalStoryEventNext);
        this.pauseClick = document.querySelector('.' + this.styles.modalStoryEventPause);

        this.lockEvents = false;

        this.currentPosition = null;
        this.dragAndMoveRange = 110;

        this.storyAnimation = new ModalStoryAnimation;

    }


    installProgress() {
        this.storyesPages.forEach(el => {
            let styles = {
                'class': 'progress',
                'style': {
                    'animation-duration': "4s"
                }
            };

            if (typeof el.styles !== 'undefined' && typeof el.styles['animation-duration'] !== 'undefined')
                styles.style['animation-duration'] = el.styles['animation-duration'];

            let progress = _doc.createElement('div', styles);

            this.progress.push(progress);
            this.progressContainer.appendChild(progress);
        });
    }


    setProgress(index) {

        if (index < 1)
            return;


        let progress = Array.from(this.progressContainer.querySelectorAll('.progress'));
        for (let i = 0; i < index; i++)
            progress[i].classList.add('passed');

        this.progressContainer.childNodes[index - 1].classList.add('active');

    }


    getCurrentActive() {
        let current = 0;
        let mapBreak = false;
        this.progress.map((el) => {
            if (mapBreak)
                return;
            if (el.classList.contains('active')) {
                mapBreak = true;
                return;
            } else
                current++;
        });

        return current;
    }


    getStoryContainer(classNameOnly = false) {
        return classNameOnly === false ? document.querySelector('.' + this.styles.modalStoryContainer) : '.' + this.styles.modalStoryContainer;
    }

    getStoryContentWrap(classNameOnly = false) {
        return classNameOnly === false ? document.querySelector('.' + this.styles.modalStoryContentWrap) : this.styles.modalStoryContentWrap;
    }

    getStoryWrap(classNameOnly = false) {
        return classNameOnly === false ? document.querySelector('.' + this.styles.modalStoryWrap) : this.styles.modalStoryWrap;
    }


    isEventLocked()
    {
        return this.lockEvents;
    }


    changeContent(changeTo, next = true) {

        if (changeTo === -1) {
            this.drawContent(this.getStoryContainer(), this.storyesPages[0]);
            return;
        }

        this.lockEvents = true;

        let timeoutLength = this.storyAnimation.animateChangeContent({
            wrap: this.getStoryContentWrap(),
            element: this.getStoryContainer(),
            content: this.storyesPages[changeTo],
            next: next,
            currentPosition: this.currentPosition,
            onDrawCall: (el, cont) => {
                this.drawContent(el, cont);
            }
        });


        setTimeout(() => {
            this.dragAndMove.resetMoveContent(this.getStoryContainer());
            this.lockEvents = false;
        }, timeoutLength);


        this.currentPosition = null;

    }


    drawContent(element, content) {

        let modalContent = element.querySelector('.' + this.styles.modalStoryContent);

        let styles = {};

        if (typeof content.styles !== 'undefined')
            styles = content.styles;


        if (typeof content.src !== 'undefined')
            styles.background = 'url(' + content.src + ')';

        if (typeof styles['background-size'] === 'undefined') {
            styles['background-size'] = 'cover';
            // styles['background-size'] = 'contain';
            styles['background-repeat'] = 'no-repeat';
            styles['background-position'] = 'center';

        }


        let img = element.querySelector('.' + this.styles.modalStoryImage);

        if (!img) {
            img = _doc.createElement('div', { class: this.styles.modalStoryImage });
            
            if (typeof this.params['modal-backlight'] !== 'undefined' && this.params['modal-backlight'] === true)
                img.classList.add('backlight');

            element.appendChild(img);
        }

        for (let style in styles)
            img.style.cssText += style + ':' + styles[style] + ';';


        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.lastChild);
        }

        if (typeof content.title === 'string') {
            modalContent.appendChild(
                _doc.createElement('div', {
                    class: this.styles.modalStoryContentHeader,
                    innerText: content.title
                })
            )
        }

        if (typeof content.text === 'string') {
            modalContent.appendChild(
                _doc.createElement('p', {
                    innerText: content.text
                })
            )
        }

    }



    playNext(e) {
        if (this.isEventLocked())
            return;

        let current = this.getCurrentActive();


        if (current + 1 > this.progress.length - 1) {
            current = 0;
            this.progress.map((el) => {
                el.classList.remove('active');
                el.classList.remove('passed');
                this.progress[current].classList.remove('pause');
            });
        } else {
            this.progress[current].classList.remove('active');
            this.progress[current].classList.add('passed');
            current++;
        }

        this.progress[current].classList.add('active');

        if (typeof e === 'number')
            current = -1;


        this.changeContent(current, true);
    };

    playPreview() {
        if (this.isEventLocked())
            return;

        let current = this.getCurrentActive();

        this.progress[current].classList.remove('active');
        this.progress[current].classList.remove('passed');
        this.progress[current].classList.remove('pause');

        if (current - 1 < 0) {
            current = this.progress.length - 1;
            this.progress.map((el) => {
                el.classList.remove('active');
                el.classList.add('passed');
            });
        } else
            current--;

        this.progress[current].classList.remove('passed');
        this.progress[current].classList.add('active');


        this.changeContent(current, false);
    };

    clickHandler() {
        if (this.isEventLocked())
            return;

        if (!e.target)
            return;

        let current = 0;
        let mapBreak = false;

        this.progress.map((el) => {
            if (!mapBreak)
                current++;
            if (el == e.target) {
                mapBreak = true;
            }
            el.classList.remove('active');
            el.classList.remove('passed');
        });

        current--;
        if (current < 1) {
            current = 0;
            this.progress[current].classList.add('active');
        } else {
            for (let i = 0; i < current; i++)
                this.progress[i].classList.add('passed');

            this.progress[current].classList.add('active');
        }


        this.changeContent(current, true);
    }

    pauseIt(e) {
        if (this.isEventLocked())
            return;

        this.progress[this.getCurrentActive()].classList.toggle('pause');
    }



    whileMoveProcess() {
        let current = this.getCurrentActive();
        if (!this.progress[current].classList.contains('pause'))
            this.progress[current].classList.toggle('pause');
    }

    afterMoveProcess(e, newPosX) {
        let current = this.getCurrentActive();

        if (this.progress[current].classList.contains('pause'))
            this.progress[current].classList.toggle('pause');


        this.currentPosition = newPosX;

        if (newPosX > this.dragAndMoveRange)
            return this.playPreview();

        if (newPosX < -this.dragAndMoveRange)
            return this.playNext();

        this.currentPosition = null;

        this.storyAnimation.animateResetMove(this.getStoryContainer())

    }



    dragAndMoveInit() {
        this.dragAndMove = new DragAndMoveLoc({
            // handler: document.querySelector('.' + this.styles.modalStoryWrap),
            handler: this.getStoryWrap(),
            move: this.getStoryContainer(),
            xMove: true,
            yMove: false,
            whileMove: () => {
                this.whileMoveProcess();
            },
            afterMove: (e, newPosX, newPosY) => {
                this.afterMoveProcess(e, newPosX);
            }
        });
    }


    run(startIndex = 0) {

        this.installProgress();
        this.setProgress(startIndex);


        this.backClick.addEventListener('click', (e) => { this.playPreview(e) }, false);
        this.nextClick.addEventListener('click', (e) => { this.playNext(e) }, false);
        this.pauseClick.addEventListener('click', (e) => { this.pauseIt(e) }, false);

        this.progress.map(el => el.addEventListener('animationend', (e) => { this.playNext(e) }, false));
        this.progress.map(el => el.addEventListener('click', (e) => { this.clickHandler(e) }, false));


        this.playNext(-1);

        this.dragAndMoveInit();

    }


    destroy() {
        while (this.progressContainer.firstChild) {
            this.progressContainer.removeChild(this.progressContainer.lastChild);
        }
    }

}