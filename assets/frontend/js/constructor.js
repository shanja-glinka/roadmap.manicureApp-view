const liveConstruct = () => {
    liveConstructTemoholder = null;

    let stickerData = {};

    let color = document.querySelector('input[name="color"]:checked');
    let version = document.querySelector('select[name="version"]');
    let type = document.querySelector('select[name="type"]');
    let date = document.querySelector('input[name="date"]').value;
    let time = document.querySelector('input[name="time"]');



    let _event = document.querySelector('input[name="event"]').checked;


    color = color == null ? 1 : color.value;
    type = type.selectedIndex ? type.options[type.selectedIndex].value : 'sticker';
    version = version.selectedIndex ? version.options[version.selectedIndex].value : '1.00';
    date = new Date(date);
    time = time.checked ? 0 : date.getTime();

    stickerData = {
        'id': 1,
        'date': date.getTime(),
        'type': type,
        'version': '1.00',
        'event': null,
        'color': color,
        'data': {}
    };

    let data = {
        'time': time,
        'text': document.querySelector('input[name="title"]').value.trim(),
        'descr': document.querySelector('textarea[name="description"]').value.trim()
    };

    if (type === 'hand-write') {
        document.querySelector('.sticker-construct input[name="option-rotate"]').closest('.form-group').style.display = null;
        data['rotate'] = parseInt(document.querySelector('.sticker-construct input[name="option-rotate-range"]').value);
    } else {
        document.querySelector('.sticker-construct input[name="option-rotate"]').closest('.form-group').style.display = 'none';
    }


    if (type === 'two-stickers') {
        document.querySelector('.double-field').style.display = null;
        document.querySelector('input[name="insp-mode"]').closest('.form-group').style.display = null;

        data['insp-mode'] = (document.querySelector('input[name="insp-mode"]').value.trim() + ' ' + 'sticker-hand-write').trim()
        data['color'] = color;

        data = [
            data,
            {}
        ];

        let color2 = document.querySelector('input[name="color-2"]:checked');
        let type2 = document.querySelector('select[name="type-2"]');
        let time2 = document.querySelector('input[name="time-2"]');

        color2 = color2 == null ? 1 : color2.value;
        type2 = type2.selectedIndex ? type2.options[type2.selectedIndex].value : 'sticker';
        time2 = time2.checked ? 0 : date.getTime();

        if (type2 === 'hand-write')
            data[1] = {
                'text': document.querySelector('input[name="title-2"]').value.trim(),
                'insp-mod': (document.querySelector('input[name="insp-mode-2"]').value.trim() + ' ' + 'sticker-hand-write').trim()
            }
        else
            data[1] = {
                'time': time2,
                'color': color2,
                'text': document.querySelector('input[name="title-2"]').value.trim(),
                'descr': document.querySelector('textarea[name="description-2"]').value.trim(),
                'insp-mod': document.querySelector('input[name="insp-mode-2"]').value.trim()
            }

    } else {
        document.querySelector('.double-field').style.display = 'none';
        document.querySelector('input[name="insp-mode"]').closest('.form-group').style.display = 'none';
    }

    if (_event == true) {
        
        document.querySelector('label[for="tab-btn-4"]').style.display = null;
        data.event = {

        }
    } else {
        // document.querySelector('label[for="tab-btn-4"]').style.display = 'none';
        document.querySelector('input[id="tab-btn-4"]').checked = false;
        document.querySelector('input[id="tab-btn-1"]').checked = true;
    }

    stickerData.data = data;


    document.querySelector('.sticker-example .sticker-view').innerHTML = '';
    document.querySelector('.sticker-example .sticker-view').appendChild(new StickerType(stickerData).getHtml());

    saveStickerData(stickerData);
}



const saveStickerData = (stickerData) => {
    localStorage.setItem('stickerData', JSON.stringify(stickerData));
}

const getStickerData = () => {
    return localStorage.getItem('stickerData');
}

const restoreStickerData = () => {
    if (!getStickerData())
        return null;

    let stickerData = JSON.parse(getStickerData());



    let version = document.querySelector('select[name="version"]');
    selecInSelector(version, stickerData.version);


    let type = document.querySelector('select[name="type"]');
    selecInSelector(type, stickerData.type);


    let date = document.querySelector('input[name="date"]').valueAsDate = new Date(stickerData.date);

    if (stickerData.type === 'two-stickers') {
        document.querySelector('.double-field').style.display = null;

        let color = document.querySelector('input[id="radio-color-' + stickerData.data[0].color + '"]').checked = true;
        let color2 = document.querySelector('input[id="radio-color-' + stickerData.data[1].color + '-2"]').checked = true;


        let type2 = document.querySelector('select[name="type-2"]');
        selecInSelector(type, stickerData.data[1].type);

        let time = document.querySelector('input[name="time"]').checked = (stickerData.data[0].time == 0);
        let time2 = document.querySelector('input[name="time-2"]').checked = (stickerData.data[1].time == 0);



    } else {

        let color = document.querySelector('input[id="radio-color-' + stickerData.color + '"]').checked = true;
        let time = document.querySelector('input[name="time"]').checked = (stickerData.data.time == 0);

    }

    if (stickerData.type === 'hand-write') {
        let rotate = document.querySelector('.sticker-construct input[name="option-rotate"]');
        rotate.value = document.querySelector('.sticker-construct input[name="option-rotate-range"]').value = stickerData.data.rotate
        rotate.closest('.form-group').style.display = null;
    }
    

    if (stickerData.event != null) {
        // document.querySelector('label[for="tab-btn-4"]').style.display = null;
    }
}

const tryRestoreStickerData = () => {
    try {
        restoreStickerData();
    }
    catch { }
}




let liveConstructTemoholder = null;


const selecInSelector = (selectElement, value) => {
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value == value)
            return selectElement.selectedIndex = i;
    }
}






document.addEventListener('DOMContentLoaded', () => {
    tryRestoreStickerData();


    if (!document.querySelector('input[name="color"]:checked'))
        document.querySelector('input[name="color"]').checked = true;

    if (!document.querySelector('input[name="date"]').value)
        document.querySelector('input[name="date"]').valueAsDate = new Date();



    if (!document.querySelector('input[name="color-2"]:checked'))
        document.querySelector('input[name="color-2"]').checked = true;



    document.querySelector('.sticker-construct input[name="option-rotate"]').addEventListener('input', () => {
        document.querySelector('.sticker-construct input[name="option-rotate-range"]').value = document.querySelector('.sticker-construct input[name="option-rotate"]').value;
    });
    document.querySelector('.sticker-construct input[name="option-rotate-range"]').addEventListener('change', () => {
        document.querySelector('.sticker-construct input[name="option-rotate"]').value = document.querySelector('.sticker-construct input[name="option-rotate-range"]').value
    }, false);



    let eventFunc = (el) => {
        el.addEventListener('change', () => {
            if (liveConstructTemoholder !== null)
                clearTimeout(liveConstructTemoholder);
            liveConstructTemoholder = setTimeout(liveConstruct, 200);
        }, false)
    };


    document.querySelectorAll('.sticker-construct input').forEach(eventFunc);
    document.querySelectorAll('.sticker-construct textarea').forEach(eventFunc);
    document.querySelectorAll('.sticker-construct select').forEach(eventFunc);
    document.querySelectorAll('.sticker-construct input[name="option-rotate"]').forEach(eventFunc);
    document.querySelectorAll('.sticker-construct input[name="option-rotate-2"]').forEach(eventFunc);


    liveConstruct();
});
