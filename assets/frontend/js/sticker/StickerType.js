class StickerType extends Sticker {
    constructor(stickerData = null) {
        super();

        this.setStickerData(stickerData);
    }

    space() {
        let space = this.createStickerBox();

        space.classList.add(this.stickerSpaceClass);

        return space;
    }


    typeSticker() {
        this.stickerBox = this.feelStickerBox();

        let data = this.sticker.data;

        if (typeof this.sticker.color != 'undefined')
            this.stickerBox.querySelector('.' + this.stickerInspClass).classList.add(this.stickerColorClass + '-' + this.sticker.color);


        this.setDefaultData(data, this.stickerBox.querySelector('.' + this.stickerInspClass));

        if (typeof data['insp-mod'] != 'undefined' && data['insp-mod'].length > 0)
            this.stickerBox.querySelector('.' + this.stickerInspClass).classList.add(data['insp-mod']);

        return this.stickerBox;
    }

    typeSticker3d() {
        this.typeSticker();

        this.stickerBox.querySelector('.' + this.stickerInspClass).classList.add(this.sticker3dClass);

        return this.stickerBox;
    }

    typeTwoStickers() {
        this.stickerBox = this.createStickerBox();

        let data0 = null;
        let data1 = null;

        if (Array.isArray(this.sticker.data)) {
            data0 = this.sticker.data[0];
            data1 = this.sticker.data[1];

            // this.stickerBox.appendChild(this.feelStickerBoxInsp());
        } else return this.typeSticker();


        let insp0 = this.feelStickerBoxInsp();
        let insp1 = this.feelStickerBoxInsp();

        if (typeof data0.color != 'undefined')
            insp0.classList.add(this.stickerColorClass + '-' + data0.color);
        if (typeof data1.color != 'undefined')
            insp1.classList.add(this.stickerColorClass + '-' + data1.color);

        this.setDefaultData(data0, insp0);
        this.setDefaultData(data1, insp1);

        if (typeof data0.event != 'undefined')
            this.stickerEventSet(data0.event, insp0);
        if (typeof data1.event != 'undefined')
            this.stickerEventSet(data1.event, insp1);


        if (typeof data0['insp-mod'] != 'undefined' && data0['insp-mod'].length > 0)
            insp0.classList.add(data0['insp-mod']);
        if (typeof data1['insp-mod'] != 'undefined' && data1['insp-mod'].length > 0)
            insp1.classList.add(data1['insp-mod']);


        this.stickerBox.appendChild(insp0);
        this.stickerBox.appendChild(insp1);

        return this.stickerBox;
    }

    typeHandWrite() {
        this.stickerBox = this.feelStickerBox();

        this.stickerBox.querySelector('.' + this.stickerInspClass).classList.add(this.stickerHandWriteClass);

        if (typeof this.sticker.data.text === 'string')
            this.setStickerText(this.sticker.data.text, this.stickerBox.querySelector('.' + this.stickerInspClass));

        if (typeof this.sticker.data.rotate !== 'undefined')
            this.stickerBox.querySelector('.' + this.stickerTextClass).style.transform = 'rotate(' + this.sticker.data.rotate + (typeof this.sticker.data.rotate === 'string' ? + '' : 'deg') + ')';

        return this.stickerBox;
    }

    typeAlbum() {
        this.typeSticker();

        let img = this.sticker.data.img;

        if (!Array.isArray(img))
            return this.stickerBox;

        let stickerPadding = this.stickerBox.querySelector('.' + this.stickerPaddingClass);


        let stickerImgGroup = null;

        if (img.length == 1)
            stickerImgGroup = _doc.createElement('div', { class: this.stickerImgSoloClass })
        else stickerImgGroup = _doc.createElement('div', { class: this.stickerImgGroupClass });

        for (let i = 0; i < 3; i++) {
            if (typeof img[i] === 'undefined')
                continue;

            let stickerImgBox = _doc.createElement('div', { class: this.stickerImgBoxClass });
            let stickerImg = _doc.createElement('div', { class: this.stickerImgClass });
            let elementImg = _doc.createElement('img', Object.assign(img[i], { draggable: 'false' }));

            stickerImg.appendChild(elementImg);
            stickerImgBox.appendChild(stickerImg);
            stickerImgGroup.appendChild(stickerImgBox);
        }
        stickerPadding.appendChild(stickerImgGroup);

        return this.stickerBox;
    }


    typePhoto() {
        this.typeSticker();


        let stickerInsp = this.stickerBox.querySelector('.' + this.stickerInspClass);

        stickerInsp.classList.add(this.stickerFullClass);

        let stickerFullImg = _doc.createElement('div', { class: this.stickerFullImgClass });
        let elementImg = _doc.createElement('img', Object.assign(this.sticker.data.img, { draggable: 'false' }));

        stickerFullImg.appendChild(elementImg);
        stickerInsp.insertBefore(stickerFullImg, stickerInsp.firstChild);

        return this.stickerBox;
    }

    typeAnimate() {

        this.typeSticker();
        let stickerInsp = this.stickerBox.querySelector('.' + this.stickerInspClass);


        if (typeof this.sticker.data.img == 'undefined')
            return this.stickerBox;

        this.stickerBox.classList.add(this.animateClass);

        let stickerAnimate = _doc.createElement('div', { class: this.stickerAnimateClass });
        let stickerAnimateImg = _doc.createElement('div', { class: this.StickerAnimateImgClass });
        let elementImg = _doc.createElement('img', Object.assign(this.sticker.data.img, { draggable: 'false' }));

        stickerAnimateImg.appendChild(elementImg);
        stickerAnimate.appendChild(stickerAnimateImg);

        stickerInsp.appendChild(stickerAnimate);

        return this.stickerBox;
    }






    getHtml() {
        switch (this.type) {
            case 'sticker': return this.typeSticker();
            case 'sticker-3d': return this.typeSticker3d();
            case 'two-stickers': return this.typeTwoStickers()
            case 'hand-write': return this.typeHandWrite();
            case 'album': return this.typeAlbum();
            case 'photo': return this.typePhoto();
            case 'animate': return this.typeAnimate();
            case 'space': return this.space();
            default: return this.space();
        }

    }
}