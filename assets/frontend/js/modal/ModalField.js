class ModalField extends ModalStruct {

    getLocalStyles() {
        return {
            modalFieldWrap: 'modal-field-wrap',
            modalFieldTitle: 'modal-field-title',
            modalFieldEventClose: 'modal-field--event-close',
            modalFieldLayer: 'modal-field-layer',
            modalFieldContent: 'modal-field-content',

            modalFieldItem: 'modal-field-item',

        }
    }

    getImages() {
        let imgs = [];

        this.data.content.forEach(el => {
            if (typeof el.img !== 'undefined')
                imgs.push(el.img.src);
        });

        return imgs;
    }

    getFieldWrap() {
        return document.querySelector('.' + this.styles.modalFieldWrap);
    }

    makeModalStory() {

        let storyElement = {
            "tagName": "div",
            "class": this.styles.modalFieldWrap,
            "children": {
                "1": {
                    "tagName": "div",
                    "class": this.styles.modalFieldTitle,
                    "children": [
                        {
                            "tagName": "h2",
                            "innerText": (typeof this.data.title !== 'undefined' ? this.data.title : ' ')
                        },
                        {
                            "tagName": "div",
                            "class": this.styles.modalFieldEventClose
                        }
                    ]
                },
                "2": {
                    "tagName": "div",
                    "class": this.styles.modalFieldLayer,
                    "children": {
                        "1": {
                            "tagName": "div",
                            "class": this.styles.modalFieldContent
                        }
                    }
                }
            }
        };

        this.modalElement.appendChild(_doc.formatToElement(storyElement));

        let itemContent = this.modalElement.querySelector('.' + this.styles.modalFieldContent);

        this.data.content.forEach(el => {
            let elem = _doc.createElement('div', {
                'class': this.styles.modalFieldItem,
                'style': {
                    'zIndex': 45
                }
            });

            let it = null;

            if (typeof el.text !== 'undefined')
                it = _doc.createElement('p', { innerText: el.text });
            if (typeof el.img !== 'undefined')
                it = _doc.createElement('img', { 'src': el.img.src, 'draggable': 'false' });
            if (typeof el.button !== 'undefined')
                it = this.getModalActions( { 'button': el.button } );


            if (it === null)
                return;

            if (typeof el.rotate !== 'undefined')
                _doc.addStyles(it, { 'transform': 'rotate(' + el.rotate + ')' });


            if (typeof el.x === 'undefined')
                el.x = '0px';
            if (typeof el.y === 'undefined')
                el.y = '0px';


            elem.appendChild(it);
            _doc.addStyles(elem, { 'transform': 'translate(' + el.x + ',' + el.y + ')' });


            this.setDragAndDrop(elem);

            itemContent.appendChild(elem);
        });


        this.modalElement.querySelector('.' + this.styles.modalFieldEventClose).addEventListener('click', () => {
            this.storyDesctruct();
        });


        this.animation.animateIn(this.elementCall, this.getFieldWrap());

    }

    setDragAndDrop(elem) {
        new DragAndMoveGlob({
            handler: this.modalElement.querySelector('.' + this.styles.modalFieldContent),
            move: elem,
            xMove: true,
            yMove: true,
            zIndexUp: true,
            afterMove: (e, newPosX, newPosY) => {
                this.animation.afterMoveProcess(e, newPosX, newPosY);
            }
        });
    }


    storyDesctruct() {
        let timeoutLength = this.animation.animateOut(this.elementCall, this.getFieldWrap());


        this.elementCall = null;
        this.onDesctruct = null;
        this.destroy();
    }

    render(callelement) {

        this.elementCall = callelement;
        this.animation = new ModalFieldAnimation();
        this.animation.setStyles(this.styles);


        this.initRender(() => {
            this.modalPreload(this.getImages(), () => {

                this.removePreload();
                this.makeModalStory();


                this.desctructTimeOut = 100;
                this.onDesctruct = () => {
                    let timeoutLength = this.animation.animateOut(this.elementCall, this.getFieldWrap());

                }

            });
        });

    }

}