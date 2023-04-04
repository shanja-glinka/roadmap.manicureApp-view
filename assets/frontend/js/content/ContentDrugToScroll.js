class ContentDrugToScroll {
    constructor(content) {
        this.content = content;
        this.pos = { top: 0, left: 0, x: 0, y: 0 };

        this.mousemoveHandler = null;
        this.mouseupHandler = null;

        this.afterMove = false;
    }

    mouseDownHandler(e) {
        if (this.mousemoveHandler) {
            this.content.removeEventListener('mousemove', this.mousemoveHandler);
            this.content.removeEventListener('mouseup', this.mouseupHandler);
        }

        this.content.style.cursor = 'grabbing';
        this.content.style.userSelect = 'none';

        this.pos = {
            left: this.content.scrollLeft,
            x: e.clientX,
        };

        this.mousemoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseupHandler = this.mouseUpHandler.bind(this);

        this.content.addEventListener('mousemove', this.mousemoveHandler);
        this.content.addEventListener('mouseup', this.mouseupHandler);

        this.afterMove = false;
        _doc.removeDragging();
    };

    mouseMoveHandler(e) {

        let dx = e.clientX - this.pos.x;

        this.content.scrollLeft = this.pos.left - dx;


        this.afterMove = true;
        _doc.setDragging();
    };

    mouseUpHandler() {
        this.content.removeEventListener('mousemove', this.mousemoveHandler);
        this.content.removeEventListener('mouseup', this.mouseupHandler);

        this.mousemoveHandler = null;
        this.mouseupHandler = null;

        this.content.style.cursor = null;
        this.content.style.removeProperty('user-select');



        if (this.afterMove) {
            if (typeof this.afterMoveCall === 'function')
                this.afterMoveCall(e, this.movePosX, this.movePosY);

            this.afterMove = false;
        }
    };

    run() {
        this.content.addEventListener('mousedown', (e) => {
            this.mouseDownHandler(e)
        });
    }
}