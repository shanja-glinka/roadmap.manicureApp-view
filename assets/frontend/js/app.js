const Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// const stickerRequest = '/stickers';
const stickerRequest = 'assets/var/stickers.json';
const stickerEvents = new StickerEvents;
const defaultScriptPath = 'assets/frontend/js';
const DOCUMENT_SCRIPTS_LOADS = [];






const documentLoadEvent = (responce) => {

    let nav = new NavConstruct;
    let cont = new ContentConstruct;

    if (typeof responce.nav !== 'undefined')
        nav.render(responce.nav);

    cont.render(responce.data);

}


const scriptsLoader = () => {

    let jsloadelem = _doc.createElement('div', { id: 'text/javascript-load' });

    _doc.body().appendChild(jsloadelem);

    let scriptIndex = 0;

    let loadScriptFunc = (_script) => {

        if (typeof DOCUMENT_SCRIPTS_LOADS[scriptIndex] === 'undefined')
            return;

        scriptIndex++;

        let scriptElem = _doc.createElement('script', { type: 'text/javascript', 'src': _script.src });

        scriptElem.onload = (e) => {
            console.log('LOADED', _script.src);
            loadScriptFunc(DOCUMENT_SCRIPTS_LOADS[scriptIndex]);
        }

        jsloadelem.appendChild(scriptElem);
    }


    loadScriptFunc(DOCUMENT_SCRIPTS_LOADS[scriptIndex]);
}


document.addEventListener("DOMContentLoaded", () => {

    // scriptsLoader();

    makeFetchJson(stickerRequest, documentLoadEvent);

});
