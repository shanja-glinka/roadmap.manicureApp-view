class Sticker {
    constructor() {
        this.sticker = null;

        this.type = 'space';


        this.stickerBoxClass = 'sticker-box';

        this.stickerInspClass = 'sticker-insp';
        this.stickerPaddingClass = 'sticker-padding';

        this.stickerSpaceClass = 'sticker-space';

        this.stickerHandWriteClass = 'sticker-hand-write';


        this.stickerTextClass = 'sticker-text';
        this.stickerDescrClass = 'sticker-descr';
        this.stickerDateClass = 'sticker-date';


        this.sticker3dClass = 'sticker-3d';
        this.stickerColorClass = 'sticker-color';


        this.stickerImgSoloClass = 'sticker-img-solo';
        this.stickerImgGroupClass = 'sticker-img-group';
        this.stickerImgBoxClass = 'sticker-img-box';
        this.stickerImgClass = 'sticker-img';


        this.stickerFullClass = 'sticker-full';
        this.stickerFullImgClass = 'sticker-full-img';



        this.animateClass = 'animate';
        this.stickerAnimateClass = 'sticker-animate';
        this.StickerAnimateImgClass = 'sticker-animate-img';


        this.stickerEventedClass = 'evented';
    }

    setStickerData(stickerData) {
        this.sticker = stickerData;

        this.type = this.sticker !== null ? this.sticker.type : 'space';
    }

    createStickerBox() {
        return _doc.createElement('div', { class: this.stickerBoxClass });
    }

    feelStickerBoxInsp() {
        let stickerInsp = _doc.createElement('div', { class: this.stickerInspClass });
        let sitckerPadding = _doc.createElement('div', { class: this.stickerPaddingClass });

        stickerInsp.appendChild(sitckerPadding);

        return stickerInsp;
    }

    feelStickerBox() {
        let stickerBox = this.createStickerBox();

        stickerBox.appendChild(this.feelStickerBoxInsp());

        return stickerBox;
    }



    getStickerText(text) {
        return _doc.createElement('p', { class: this.stickerTextClass, innerText: text });
    }

    getStickerDescr(descr) {
        return _doc.createElement('p', { class: this.stickerDescrClass, innerText: descr });
    }

    getStickerDate(date) {
        return _doc.createElement('small', { class: this.stickerDateClass, innerText: date });
    }



    setStickerText(text, stickerInsp) {
        return stickerInsp.querySelector('.' + this.stickerPaddingClass).appendChild(this.getStickerText(text));
    }

    setStickerDescr(descr, stickerInsp) {
        return stickerInsp.querySelector('.' + this.stickerPaddingClass).appendChild(this.getStickerDescr(descr));
    }

    setStickerDate(time, stickerInsp) {
        time = this.timeToFormat(time);
        return stickerInsp.querySelector('.' + this.stickerPaddingClass).appendChild(this.getStickerDate(time));
    }



    stickerEventSet(event, stickerInsp) {
        if (event === null || typeof event == 'undefined')
            return;

        stickerInsp.classList.add(this.stickerEventedClass);

        if (typeof event === 'object')
            stickerEvents.add(event, stickerInsp);
    }



    setDefaultData(data, stickerInsp) {
        if (typeof data.text != 'undefined')
            this.setStickerText(data.text, stickerInsp);
        if (typeof data.descr != 'undefined')
            this.setStickerDescr(data.descr, stickerInsp);
        if (typeof data.time != 'undefined')
            this.setStickerDate(data.time, stickerInsp);
        if (typeof this.sticker.event != 'undefined')
            this.stickerEventSet(this.sticker.event, stickerInsp);
    }



    timeToFormat(time) {
        if (!time)
            return '';

        time = new Date(time)
        let month = (typeof Months === 'undefined' ? time.toLocaleString('en-us', { month: 'long' }) : Months[time.getMonth()]);
        
        return (time.getDate() > 9 ? time.getDate() : '0' + time.getDate()) + ' ' + month;
    }

}