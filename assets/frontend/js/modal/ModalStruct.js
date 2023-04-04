class ModalStruct {
    constructor(modalData) {
        this.data = modalData;
        this.modalElement = null;

        this.hotkeyCloseHandler = null;


        this.desctructTimeOut = 300;
        this.onDesctruct = null;

        this.modalEvents = typeof this.data.events !== 'undefined' ? this.data.events : {};


        this.styles = {
            'modalWrap': 'modal-wrap',

            'actionXClose': 'modal-action-x-close',
            'actionXCloseSrc': '/assets/frontend/img/icons/x-close.svg',


            'modalActions': 'modal-actions',
            'modalButton': 'modal-button',
            'modalActionClose': 'modal-action-close',



            'modalBlur': 'apblur',
            'modalCursorPointer': 'apclick'

        };
    }



    addStyles(localStyles) {
        this.styles = Object.assign(this.styles, localStyles);
    }

    modalDataIsset() {
        return !(typeof this.data === 'undefined');
    }

    callModalEvents(eventName) {
        try {
            if (typeof this.modalEvents[eventName] !== 'undefined' && typeof window[this.modalEvents[eventName]] === 'function')
                window[this.modalEvents[eventName]]();
        } catch (ex) { console.log(ex) }
    }





    setModalWrap() {
        this.modalElement = _doc.createElement('div', { class: this.styles.modalWrap });
        this.modalApplyParams();

        this.callModalEvents('onstart');

        return this.modalElement;
    }









    modalApplyParams() {

        if (typeof this.data.params['overlay-blur'] !== 'undefined' && this.data.params['overlay-blur'] === true)
            this.modalElement.classList.add(this.styles.modalBlur)

        if (typeof this.data.params['overlay-click-to-close'] !== 'undefined' && this.data.params['overlay-click-to-close'] === true) {
            this.modalElement.classList.add(this.styles.modalCursorPointer);
            this.modalElement.addEventListener('click', (e) => {

                if (_doc.isDragging() || !e.target.classList.contains(this.styles.modalCursorPointer))
                    return;

                e.preventDefault();

                this.destroy();
            })
        }

        if (typeof this.data.params['overlay-hotkey-to-close'] !== 'undefined' && this.data.params['overlay-hotkey-to-close'] === true) {
            this.hotkeyCloseHandler = this.hotkeyCloseEvent.bind(this);
            document.addEventListener('keyup', this.hotkeyCloseHandler);
        }

    }


    getModalXClose(desctructorCall = null) {
        if (typeof this.data.buttons['x-close'] === 'undefined')
            return null;

        let icon = _doc.createElement('img', { src: this.styles.actionXCloseSrc });

        let actionXClose = _doc.createElement('div', { class: this.styles.actionXClose });

        actionXClose.appendChild(icon);

        actionXClose.addEventListener('click', (e) => {
            this.destroy();
        });

        return actionXClose;
    }





    /**
     * Modal actions and events
     * 
     * @param {Object} actionsObj 
     * @param {Object} actionsObj.close - default image and event
     * @param {Object} actionsObj.butonName
     * @param {string} actionsObj.butonName.icon - src or svg
     * @param {string} actionsObj.butonName.text - button text
     * @param {Object} actionsObj.butonName.event - custom or null
     * @param {string} actionsObj.butonName.style - css styles
     * @param {string} actionsObj.butonName.class - css class name
     * @param {number} actionsObj.butonName.textIndex
     */
    getModalActions(actionsObj) {
        let modalAction = _doc.createElement('div', { class: this.styles.modalActions });

        for (let buttonName in actionsObj) {

            if (buttonName === 'x-close')
                continue;


            let icon = (typeof actionsObj[buttonName].icon !== 'undefined' ? actionsObj[buttonName].icon : null);
            let text = (typeof actionsObj[buttonName].text !== 'undefined' ? actionsObj[buttonName].text : null);
            let event = (typeof actionsObj[buttonName].event !== 'undefined' ? actionsObj[buttonName].event : {});
            let style = (typeof actionsObj[buttonName].style !== 'undefined' ? actionsObj[buttonName].style : null);
            let cssclass = (typeof actionsObj[buttonName].class !== 'undefined' ? actionsObj[buttonName].class : null);
            let textIndex = (typeof actionsObj[buttonName].textIndex === 'number' ? actionsObj[buttonName].textIndex : 0);


            let button = null;



            if (typeof event.type === 'undefined')
                event.type = null;
            if (typeof event.func === 'undefined')
                event.func = null;

            if (buttonName == 'close') {
                button = _doc.createElement('div', { class: this.styles.modalButton + ' ' + this.styles.modalActionClose });

                text = (text === null ? 'Закрыть' : text);
                icon = (icon === 'default' ? this.styles.actionXCloseSrc : icon);

                event = {
                    "type": "click",
                    "func": event.func
                };

                button.addEventListener('click', (e) => {
                    this.destroy();
                });

            } else
                button = _doc.createElement('div', { class: this.styles.modalButton + ' ' + buttonName });


            text = _doc.createElement('span', { innerText: (text === null ? '' : text) });




            if (typeof icon === 'string') {

                if (icon.indexOf('<svg') !== -1)
                    icon = _doc.createElement('div', { innerHTML: icon }).childNodes[0];
                else
                    icon = _doc.createElement('img', { src: icon });
            }




            if (typeof event.func !== 'function' && typeof window[event.func] === 'function')
                event.func = window[event.func];

            if (style !== null)
                button.style.cssText += style;

            if (cssclass !== null)
                button.className += (button.className.length > 0 ? ' ' : '') + cssclass;

            if (typeof event.func === 'function')
                button.addEventListener(event.type, (e) => {
                    if (_doc.isDragging())
                        return;
                    event.func(e, this);
                });





            if (textIndex === 0) {
                if (text)
                    button.appendChild(text);
                if (icon)
                    button.appendChild(icon);
            } else {
                if (icon)
                    button.appendChild(icon);
                if (text)
                    button.appendChild(text);
            }

            button.setAttribute('data-button', buttonName);


            modalAction.appendChild(button);

        }

        return modalAction;
    }





    innerPreload() {
        // console.log('preload innered');
    }
    removePreload() {
        // console.log('preload removed');
    }

    modalPreload(sources, callback = null) {

        // for (let i = 0; i < sources.length; i++) {
        //     sources[i] += '?' + Math.random();
        // }

        let fileTypes = {
            'img': ["jpg", "jpeg", "svg", "png"],
            'audio': ["mp3"],
            'video': ["mp4"]
        }

        function preloadFiles(sources, callback) {
            let counter = 0;

            function onLoad() {
                counter++;
                if (counter == sources.length) callback();
            }

            function getfileType(file) {
                if (file.indexOf('?') !== -1)
                    file = file.substr(0, file.indexOf('?'));

                let fileType = (/[.]/.exec(file)) ? /[^.]+$/.exec(file)[0] : null;

                if (!fileType)
                    return null;

                for (let key in fileTypes)
                    if (fileTypes[key].includes(fileType))
                        return key;

                return null;
            }

            for (let source of sources) {
                try {
                    let f = document.createElement(getfileType(source));
                    f.onload = f.onerror = onLoad;
                    f.src = source;
                }
                catch (e) { console.log(e) }
            }


        }

        preloadFiles(sources, callback);
    }






    innerModal(element) {
        element.appendChild(this.modalElement);

        this.callModalEvents('onload');
    }




    hotkeyCloseEvent(evt) {
        evt = evt || window.event;

        if (("key" in evt && (evt.key === "Escape" || evt.key === "Esc") || evt.keyCode === 27)) {
            this.destroy();
        }

    }



    initRender(localRender) {
        if (!this.modalDataIsset())
            return;

        this.addStyles(this.getLocalStyles());
        this.setModalWrap();

        this.innerPreload();


        localRender();


        this.innerModal(_doc.body());
    }


    destroy() {

        if (this.hotkeyCloseHandler)
            document.removeEventListener('keyup', this.hotkeyCloseHandler);

        if (!this.modalElement && !document.querySelector('.modal-wrap'))
            return;
        // this.modalElement = document.querySelector('.modal-wrap');

        if (this.onDesctruct)
            this.onDesctruct();


        // this.modal.style.opacity = '0';

        setTimeout(() => {
            if (!this.modalElement)
                return;

            this.modalElement.style.opacity = '0';

            setTimeout(() => {
                if (!this.modalElement)
                    return;
                    
                if (this.modalElement.parentNode)
                    this.modalElement.parentNode.removeChild(this.modalElement);

                this.modalElement = null;
            }, 300);

        }, this.desctructTimeOut);


        this.callModalEvents('onclose');

    }
}
