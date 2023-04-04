class StickerEvents {
    constructor() {
        this.stickerEvents = {};
    }

    add(eventObj, element) {
        let type = (typeof eventObj.type == 'undefined' ? null : eventObj.type);
        let call = (typeof eventObj.call == 'undefined' ? null : eventObj.call);
        let event = (typeof eventObj.event == 'undefined' ? null : eventObj.event);
        let func = (typeof eventObj.func == 'undefined' ? null : eventObj.func);
        let eventdata = (typeof eventObj.data == 'undefined' ? null : eventObj.data);

        let eventFunc = null;

        let genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

        let eventName = genRanHex(8);




        switch (type) {
            case 'modal': eventFunc = new ModalConstruct(eventObj); break;
            default: break;
        }



        let stickerEvent = (e, k) => {
            if (_doc.isDragging())
                return;

            e.preventDefault();

            if (typeof func === 'string')
                func = window[func];

            if (typeof func === 'object' && func !== null) {
                func.call(eventName);
            } else if (typeof func === 'function')
                func(eventName);



            if (typeof eventFunc === 'object') {
                eventFunc.call(eventName);
            } else if (typeof eventFunc === 'function')
                eventFunc(eventName);
        }



        element.addEventListener(event, stickerEvent);
        element.setAttribute('data-event-' + event, eventName);

        this.stickerEvents[eventName] = {
            "data": eventObj.data,
            "type": type,
            "call": call,
            "event": event,
            "func": stickerEvent,
        }
    }

    remove(eventName, element) {
        let eventData = this.get(eventName);

        if (!eventData)
            return false;

        element.removeEventListener(eventData.event, eventData.func);

        element.classList.remove('evented');

        if (typeof element.getAttribute('data-event-' + eventData.event) !== 'undefined')
            delete element.removeAttribute('data-event-' + eventData.event);

        delete this.stickerEvents[eventName];

        return true;
    }

    get(eventName) {
        if (typeof this.stickerEvents[eventName] !== 'undefined')
            return this.stickerEvents[eventName];
        return null;
    }
}