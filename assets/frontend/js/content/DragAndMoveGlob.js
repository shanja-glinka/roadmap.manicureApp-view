class DragAndMoveGlob {
    /**
     * 
     * @param {Object} config 
     * @param {NodeElement} config.contentHandler
     * @param {NodeElement} config.contentMove
     * @param {function} config.whileMove
     * @param {function} config.afterMoveCall
     * @param {Boolean} config.xMove
     * @param {Boolean} config.yMove
     * @param {number} config.zIndexUp
     * 
     */
    constructor(config) {
        this.contentHandler = config.handler;
        this.contentMove = config.move;

        this.whileMove = typeof config.whileMove === 'function' ? config.whileMove : null;
        this.afterMoveCall = typeof config.afterMove === 'function' ? config.afterMove : null;
        this.xMove = typeof config.xMove === 'boolean' ? config.xMove : true;
        this.yMove = typeof config.yMove === 'boolean' ? config.yMove : true;
        this.zIndexUp = typeof config.zIndexUp !== 'undefined' ? (typeof config.zIndexUp === 'number' ? config.zIndexUp : 101) : null;

        this.pos = { top: 0, left: 0, x: 0, y: 0 };

        this.mousemoveHandler = null;
        this.mouseupHandler = null;

        this.contentMove.addEventListener('pointerdown', (e) => {
            this.mouseDownHandler(e)
        });

        this.afterMove = false;
        this.movePosX = 0;
        this.movePosY = 0;

        this.contentHandler.addEventListener('mouseleave', (e) => {
            this.mouseUpHandler(e);
        });
    }

    resetMoveContent(moveElement) {
        this.contentMove = moveElement;
    }

    mouseDownHandler(e) {
        if (this.mousemoveHandler) {
            this.contentHandler.removeEventListener('pointermove', this.mousemoveHandler);
            this.contentMove.removeEventListener('pointerup', this.mouseupHandler);

            this.afterMove = false;
            _doc.removeDragging();

            this.removeAddProp();
        }

        if (e.button > 0)
            return;

        this.contentMove.style.cursor = 'grabbing';
        this.contentMove.style.userSelect = 'none';

        let rect = this.getTranformStyles(this.contentMove);

        this.pos = {
            left: rect.x,
            top: rect.y,
            x: e.clientX,
            y: e.clientY,
            zIndex: window.getComputedStyle(this.contentMove).getPropertyValue('z-index') - 0
        };

        this.mousemoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseupHandler = this.mouseUpHandler.bind(this);

        this.contentHandler.addEventListener('pointermove', this.mousemoveHandler);
        this.contentMove.addEventListener('pointerup', this.mouseupHandler);


        if (this.contentMove.children.length === 1)
            if (this.contentMove.children[0].style.transform.indexOf('scale(0.95)') === -1)
                this.contentMove.children[0].style.transform += 'scale(0.95)';

    }

    mouseMoveHandler(e) {
        let dx = (e.clientX - this.pos.x) * -1;
        let dy = (e.clientY - this.pos.y) * -1;

        this.movePosX = this.pos.left - dx;
        this.movePosY = this.pos.top - dy;


        let transform = '';

        if (!this.xMove || !this.yMove) {
            if (this.xMove) {
                transform = 'translateX(' + (this.movePosX) + 'px)';
            }
            if (this.yMove) {
                transform = 'translateY(' + (this.movePosY) + 'px)';
            }
        } else
            transform = 'translate(' + (this.movePosX) + 'px, ' + this.movePosY + 'px)';

        this.contentMove.style.transform = transform;

        if (this.zIndexUp) {
            this.contentMove.style.zIndex = this.zIndexUp;
        }

        if (typeof this.whileMove === 'function')
            this.whileMove(e);

        this.afterMove = true;
        _doc.setDragging();

    }

    mouseUpHandler(e) {
        this.contentHandler.removeEventListener('pointermove', this.mousemoveHandler);
        this.contentMove.removeEventListener('pointerup', this.mouseupHandler);

        _doc.removeDragging();

        this.mousemoveHandler = null;
        this.mouseupHandler = null;
        this.touchmoveHandler = null;
        this.touchendHandler = null;


        this.removeAddProp();


        if (this.afterMove) {
            if (typeof this.afterMoveCall === 'function')
                this.afterMoveCall(this.contentMove, this.movePosX, this.movePosY);

            this.afterMove = false;
        }
    }

    removeAddProp() {
        if (this.zIndexUp)
            this.contentMove.style.zIndex = this.pos.zIndex + 1;

        if (this.contentMove.children.length === 1)
            this.contentMove.children[0].style.transform = this.contentMove.children[0].style.transform.replace('scale(0.95)', '');


        this.contentMove.style.cursor = null;
        this.contentMove.style.removeProperty('user-select');
    }

    getTranformStyles(element) {

        let getTranslatePos = (pos) => {
            let temp = transform.substring(transform.indexOf(pos) + (pos).length).replace('px', '');
            temp = temp.split(')');
            return temp[0].trim();
        }

        let pos = {
            x: 0,
            y: 0
        }


        if (!element.style.transform || element.style.transform.indexOf('translate') === -1)
            return pos;

        let x = 0;
        let y = 0;

        let transform = element.style.transform;
        if (transform.indexOf('translateX(') !== -1) {
            x = parseFloat(getTranslatePos('translateX('));
        }
        if (transform.indexOf('translateY(') !== -1) {
            y = parseFloat(getTranslatePos('translateY('));
        }

        if (transform.indexOf('translate(') !== -1) {
            let temp = transform.replace('translate(', '').replace('px', '').split(')')[0].split(',');
            try {
                x = parseFloat(temp[0].trim());
            } catch {
                x = 0;
            }
            try {
                y = parseFloat(temp[1].trim());
            } catch {
                y = 0;
            }
        }


        pos.x = x;
        pos.y = y;

        return pos;
    }

}