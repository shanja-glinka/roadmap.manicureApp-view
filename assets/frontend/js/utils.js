const _doc = {

    body() {
        return document.querySelector('body')
    },

    createElement(element, param = {}) {
        let el = document.createElement(element);

        for (let it in param) {
            // console.log(it, param, param[it]);
            if (it == 'innerText')
                el.innerText = param[it];
            else if (it == 'innerHTML')
                el.innerHTML = param[it];
            else if (it == 'attributes') {
                for (let i = 0; i < param[it].length; i++)
                    el.setAttribute('data-' + param[it][i][0], param[it][i][1]);
            } else if (it == 'style' && typeof param[it] === 'object') {
                for (let itstyle in param[it])
                    el.style[itstyle] = param[it][itstyle];
            } else if (it == 'cssText')
                el.style += param[it];
            else
                el.setAttribute(it, param[it]);
        }

        return el;

    },

    addStyles(element, param) {
        if (typeof element.length !== 'undefined') {
            element.forEach(el => {
                _doc.addStyles(el, param);
            });
        } else {
            if (typeof param === 'string')
                element.style.cssText += param;
            else
                for (let style in param) {
                    let styleParam = param[style];

                    element.style[style] = styleParam;
                }
        }
    },

    removeStyles(element, param) {
        if (typeof element.length !== 'undefined') {
            element.forEach(el => {
                _doc.removeStyles(el, param);
            });
        }
        else {
            if (typeof param === 'string') {
                element.style[param] = null;
            }
            else if (Array.isArray(param)) {
                param.forEach(el => {
                    element.style[el] = null;
                });
            } else {
                for (let style in param) {
                    element[style] = null;
                }
            }
        }
    },

    htmlToElement(htmltext) {
        htmltext = htmltext.replace('    ', '').replace("\n", '');

        let element = _doc.createElement('div', { innerHTML: htmltext });

        if (element.children.length > 1)
            return element.childNodes;

        return element.firstChild;
    },

    elementToHtml(element) {
        let elem = _doc.createElement('div');

        if (Array.isArray(element) && typeof element.length !== 'undefined') {
            element.forEach(el => {
                elem.appendChild(el);
            });
        } else
            elem.appendChild(element);

        return elem.innerHTML;
    },

    getAttributes(element) {
        return element.getAttributeNames().reduce((acc, name) => {
            return { ...acc, [name]: element.getAttribute(name) };
        }, {});
    },

    renderHtmlFormat(htmlObj) {

    },

    elementToFormat(element) {
        let format = {};

        if (Array.isArray(element) && typeof element.length !== 'undefined') {
            element.forEach((el, index) => {
                format[index] = _doc.elementToFormat(el);
            });

            return format;
        }

        if (typeof element.tagName === 'undefined') {
            if (element.nodeName === '#text') {
                let innerText = element.textContent.trim().replace('    ', '').replace("\n", '');

                if (innerText.length > 0)
                    return innerText;
            }
            return null;
        }

        format['tagName'] = element.tagName.toLowerCase();
        format = Object.assign(format, _doc.getAttributes(element));

        if (element.children.length > 0) {
            element.childNodes.forEach((el, index) => {
                let elemformat = _doc.elementToFormat(el);
                if (elemformat === null)
                    return;


                if (typeof format['children'] === 'undefined')
                    format['children'] = {};

                if (typeof elemformat === 'string') {
                    format['children'][index] = {
                        'tagName': 'textNode',
                        'innerText': elemformat
                    };

                    return;
                }

                format['children'][(typeof elemformat['id'] === 'undefined' ? index : elemformat['id'])] = elemformat;
            });
        }

        return format;

    },


    formatToElement(format) {
        let formated = format;
        let elements = [];

        for (let key in formated) {

            let elemdata = null;

            if (typeof formated === 'object' && typeof formated.tagName !== 'undefined')
                elemdata = formated;
            else
                elemdata = formated[key];


            let tagName = elemdata['tagName'];
            let children = null;

            if (!tagName)
                continue;

            if (typeof elemdata['children'] !== 'undefined') {
                children = elemdata['children'];
                delete elemdata['children'];
                children = _doc.formatToElement(children);
            }

            delete elemdata['tagName'];


            if (tagName === 'textNode') {
                // console.log(elements[elements.length - 1]);
                // if (elements.length > 0) {
                //     elements[elements.length - 1].innerText += elemdata.innerText;
                // }
                continue;
            }

            let element = _doc.createElement(tagName, elemdata);


            if (children !== null) {
                if (Array.isArray(children))
                    children.forEach(el => {
                        element.appendChild(el);
                    });
                else if (typeof children.tagName !== 'undefined')
                    element.appendChild(children);
            }

            elements.push(element);
        }


        if (elements.length < 2)
            return elements[0];
        return elements;
    },


    setDragging() {
        if (!_doc.isDragging())
            document.body.classList.add("dragging");
    },

    removeDragging() {
        setTimeout(() => {
            document.body.classList.remove("dragging");
        }, 300);
    },

    isDragging() {
        return document.body.classList.contains("dragging");
    },


    isVisibleElement(el, byHeight = true) {

        let rect = el.getBoundingClientRect();

        let elemRect0 = (byHeight === true ? rect.top : rect.left);
        let elemRect1 = (byHeight === true ? rect.bottom : rect.right);
        let windowInner = (byHeight === true ? window.innerHeight : window.innerWidth);

        if ((byHeight === true ? rect.width : rect.height) > 0)
            elemRect1 -= ((byHeight === true ? rect.width : rect.height) / 2);

            // return (elemRect0 < 0 || ((elemRect0 >= 0) && (byHeight === true ? (elemRect1 <= windowInner) : (elemRect0 <= windowInner))));
        return (elemRect0 < 0 || (elemRect0 >= 0 && elemRect1 <= windowInner));
    }

}

const makeFetchJson = (request, callback) => {
    fetch(request).then((response) => {
        if (response.ok) {
            response.json().then((resp) => {
                callback(resp);
            });
        } else {
            console.log('Network request to "' + request + '" failed with response ' + response.status + ': ' + response.statusText);
        }
    });
}