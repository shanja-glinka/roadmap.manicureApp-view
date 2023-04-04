class ModalConstruct {
    constructor(eventObj) {

        this.modal = {
            "type": (typeof eventObj.type == 'undefined' ? null : eventObj.type),
            "data": (typeof eventObj.data == 'undefined' ? null : eventObj.data),
            "view": 'default',
            "date": 0,
            "params": {}
        }

        this.loadModalData();
    }

    loadModalData() {
        if (typeof this.modal.data.src === 'undefined')
            return;

        fetch(this.modal.data.src).then((response) => {
            if (response.ok) {
                response.json().then((resp) => {
                    this.setModalData(resp);
                });
            } else {
                console.log('Network request for stickers.json failed with response ' + response.status + ': ' + response.statusText);
            }
        });
    }

    setModalData(responce) {
        this.modal = Object.assign(this.modal, responce);
    }

    call(eventCallName = null) {
        if (typeof this.modal.view === 'undefined')
            return false;

        let modalView = null;
        let elementCall = document.querySelector("[data-event-click=\"" + eventCallName + "\"]"); //.parentNode;

        switch (this.modal.view.toLowerCase()) {
            case 'album': modalView = new ModalAlbum(this.modal); break;
            case 'field': modalView = new ModalField(this.modal); break;
            case 'story': modalView = new ModalStory(this.modal); break;
            default: return;
        }

        modalView.render(elementCall);

    }
}
