class ModalStoryAnimation extends AnimationSctruct {

    constructor() {
        super();

        this.setStyles({
            stickerImgBox: 'sticker-img-box',
            stikerPadding: 'sticker-padding',

            cloneAlbumContainer: 'clone-album-container',

        });
    }


    animateIn(elementCall, modalElement) {

        let cssTransform = this.setModalPosition(elementCall, modalElement, .8);
        let timeoutLength = 200;

        setTimeout(() => {
            _doc.addStyles(modalElement, {
                opacity: 1,
                'transform': cssTransform
            })
        }, timeoutLength);

        return timeoutLength;

    }

    animateOut(elementCall, modalElement) {

        _doc.addStyles(modalElement, { opacity: 0 });
        modalElement.style.cssText = modalElement.style.cssText.replace('scale(1)', 'scale(.8)')

        let timeoutLength = 200;

        return timeoutLength;
    }


    /**
     * 
     * @param {Object} params 
     * @param {HTMLElement} params.wrap
     * @param {HTMLElement} params.element
     * @param {Boolean} params.next
     * @param {function} params.onDrawCall
     * @param {Object} params.content
     * @param {number} params.currentPosition
     */
    animateChangeContent(params) {
        let wrap = params.wrap;
        let element = params.element;
        let content = params.content;
        let next = params.next;
        let onDrawCall = params.onDrawCall;

        let currentPosition = params.currentPosition;

        let elementNext = element.cloneNode(true);

        let moveLength = element.offsetWidth + 40;

        let timeoutLength = 600;


        if (!currentPosition)
            _doc.addStyles(element, 'transform: translateX(0px)');

        _doc.addStyles(elementNext, {
            'transform': 'translateX(' + (moveLength * (next ? 1 : -1) + 'px)')
        });


        (next ?
            wrap.appendChild(elementNext) :
            wrap.insertBefore(elementNext, wrap.firstChild)
        );

        onDrawCall(elementNext, content);




        let posx = (moveLength * (next ? -1 : 1));
        setTimeout(() => {
            _doc.addStyles(element, {
                'transition': 'all 0.' + (currentPosition === null ? 6 : 4) + 's cubic-bezier(.46,0,0,1.01) 0s',
                'transform': 'translateX(' + posx + 'px)'
            });

            setTimeout(() => {
                _doc.addStyles(elementNext, {
                    'transition': 'all 0.6s cubic-bezier(.46,0,0,1.01) 0s',
                    'transform': 'translateX(0px)'
                })
            }, 50);
        }, 50);



        setTimeout(() => {

            try {
                wrap.removeChild(element);
            } catch { }

            _doc.removeStyles(elementNext, ['transform', 'transition']);
        }, timeoutLength);


        return timeoutLength;
    }

    animateResetMove(storyContainer) {
        setTimeout(() => {
            _doc.addStyles(storyContainer, {
                'transition': 'all 0.3s cubic-bezier(.46,0,0,1.01) 0s',
                'transform': 'translateX(0px)'
            })

            setTimeout(() => {
                _doc.removeStyles(storyContainer, ['transform', 'transition']);
            }, 300);
        }, 50);

        return 350;
    }

}