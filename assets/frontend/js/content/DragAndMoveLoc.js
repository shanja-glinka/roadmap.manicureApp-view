class DragAndMoveLoc {
    /**
     * 
     * @param {Object} config 
     * @param {NodeElement} config.contentHandler
     * @param {NodeElement} config.contentMove
     * @param {function} config.whileMove
     * @param {function} config.afterMoveCall
     * @param {Boolean} config.xMove
     * 
     */
    constructor(config) {
        this.contentHandler = config.handler;
        this.contentMove = config.move;

        this.whileMove = typeof config.whileMove === 'function' ? config.whileMove : null;
        this.afterMoveCall = typeof config.afterMove === 'function' ? config.afterMove : null;
        this.xMove = typeof config.xMove === 'boolean' ? config.xMove : true;

        this.pos = { top: 0, left: 0, x: 0, y: 0 };

        this.mousemoveHandler = null;
        this.mouseupHandler = null;

        this.contentHandler.addEventListener('pointerdown', (e) => {
            this.mouseDownHandler(e)
        });

        this.afterMove = false;
        this.movePosX = 0;

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
            this.contentHandler.removeEventListener('pointerup', this.mouseupHandler);

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
            x: e.clientX,
            zIndex: window.getComputedStyle(this.contentMove).getPropertyValue('z-index')
        };

        this.mousemoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseupHandler = this.mouseUpHandler.bind(this);

        this.contentHandler.addEventListener('pointermove', this.mousemoveHandler);
        this.contentHandler.addEventListener('pointerup', this.mouseupHandler);


        if (this.contentMove.children.length === 1)
            if (this.contentMove.children[0].style.transform.indexOf('scale(0.95)') === -1)
                this.contentMove.children[0].style.transform += 'scale(0.95)';

    }

    mouseMoveHandler(e) {
        let dx = (e.clientX - this.pos.x) * -1;

        this.movePosX = this.pos.left - dx;

        this.contentMove.style.transform = 'translateX(' + (this.movePosX) + 'px)';


        if (typeof this.whileMove === 'function')
            this.whileMove(e);

        this.afterMove = true;
        _doc.setDragging();

    }

    mouseUpHandler(e) {
        this.contentHandler.removeEventListener('pointermove', this.mousemoveHandler);
        this.contentHandler.removeEventListener('pointerup', this.mouseupHandler);

        _doc.removeDragging();

        this.mousemoveHandler = null;
        this.mouseupHandler = null;
        this.touchmoveHandler = null;
        this.touchendHandler = null;


        this.removeAddProp();


        if (this.afterMove) {
            if (typeof this.afterMoveCall === 'function')
                this.afterMoveCall(this.contentMove, this.movePosX);

            this.afterMove = false;
        }
    }

    removeAddProp() {
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
            x: 0
        }


        if (!element.style.transform || element.style.transform.indexOf('translate') === -1)
            return pos;

        let x = 0;

        let transform = element.style.transform;
        if (transform.indexOf('translateX(') !== -1) {
            x = parseFloat(getTranslatePos('translateX('));
        }

        if (transform.indexOf('translate(') !== -1) {
            let temp = transform.replace('translate(', '').replace('px', '').split(')')[0].split(',');
            try {
                x = parseFloat(temp[0].trim());
            } catch {
                x = 0;
            }
        }


        pos.x = x;

        return pos;
    }

}