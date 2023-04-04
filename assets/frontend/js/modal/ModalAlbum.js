class ModalAlbum extends ModalStruct {

    getLocalStyles() {
        return {
            'modalAlbumLayer': 'modal-album-layer',
            'modalAlbumCard': 'modal-album-card',
            'modalPhoto': 'modal-photo',

            'modalAlbumInfo': 'modal-album-info',
            'modalInfoCard': 'modal-info-card',

            'modalTitle': 'modal-title',
            'modalText': 'modal-text',
            'modalDescr': 'modal-descr'

        }
    }

    getImages() {
        let imgs = [];

        this.data.img.forEach(el => {
            imgs.push(el.src);
        });

        return imgs;
    }

    makeModalAlbum() {

        let modalAlbumlayer = _doc.createElement('div', { class: this.styles.modalAlbumLayer });


        if (typeof this.data.params['overlay-click-to-close'] !== 'undefined')
            modalAlbumlayer.addEventListener('click', (e) => {
                if (e.target.classList.contains(this.styles.modalAlbumLayer))
                    this.albumDestruct();
            });




        this.data.img.forEach(el => {
            let modalAlbumCard = _doc.createElement('div', { class: this.styles.modalAlbumCard });
            let modalPhoto = _doc.createElement('div', { class: this.styles.modalPhoto });
            let photoel = _doc.createElement('img', el);

            modalPhoto.appendChild(photoel);
            modalAlbumCard.appendChild(modalPhoto);

            modalAlbumlayer.appendChild(modalAlbumCard);
        });



        if (this.data.img.length > 3)
            return this.modalElement.appendChild(modalAlbumlayer);



        let modalAlbumInfo = _doc.createElement('div', { class: this.styles.modalAlbumInfo });
        let modalInfoCard = _doc.createElement('div', { class: this.styles.modalInfoCard });

        let modalTitle = null;
        let modalText = null;
        let modalDescr = null;

        let xClose = null;
        let actionButtons = null;



        xClose = this.getModalXClose();

        if (typeof this.data.title === 'string')
            modalTitle = _doc.createElement('p', { class: this.styles.modalTitle, innerText: this.data.title });
        if (typeof this.data.text === 'string')
            modalText = _doc.createElement('p', { class: this.styles.modalText, innerText: this.data.text });
        if (typeof this.data.descr === 'string')
            modalDescr = _doc.createElement('p', { class: this.styles.modalDescr, innerText: this.data.descr });

        if (typeof this.data.buttons !== 'undefined') {
            // if (typeof this.data.buttons.close !== 'undefined')
            //     this.data.buttons.close.event.func = desctructFunc;

            actionButtons = this.getModalActions(this.data.buttons);
        }




        if (xClose)
            modalInfoCard.appendChild(xClose);

        if (modalTitle)
            modalInfoCard.appendChild(modalTitle);
        if (modalText)
            modalInfoCard.appendChild(modalText);
        if (modalDescr)
            modalInfoCard.appendChild(modalDescr);

        if (actionButtons)
            modalInfoCard.appendChild(actionButtons);


        modalAlbumInfo.appendChild(modalInfoCard);
        modalAlbumlayer.appendChild(modalAlbumInfo);


        return this.modalElement.appendChild(modalAlbumlayer);
    }


    albumDestruct() {
        this.animation.infoCardAnimateOut(this.elementCall);

        this.elementCall = null;
        this.onDesctruct = null;
        this.destroy();
    }


    render(callelement) {

        this.elementCall = callelement;
        this.animation = new ModalAlbumAnimation();
        this.animation.setStyles(this.styles);


        this.initRender(() => {
            this.modalPreload(this.getImages(), () => {

                this.removePreload();
                this.makeModalAlbum();


                this.animation.infoCardAnimateIn(this.elementCall)

                this.desctructTimeOut = 600;
                this.onDesctruct = () => {
                    this.animation.infoCardAnimateOut(this.elementCall);
                }

            });
        })

    }

}