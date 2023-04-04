class AnimationSctruct {

    constructor() {
        this.styles = {};
    }

    setStyles(styles) {
        this.styles = Object.assign(styles, this.styles);
    }


    getBoundingClientRect(element) {
        let rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            x: rect.x,
            y: rect.y
        };
    }

    getCurrentRotation(element, less0 = false) {
        let st = window.getComputedStyle(element, null);
        let tm = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform") ||
            "none";
        if (tm != "none") {
            let values = tm.split('(')[1].split(')')[0].split(',');
            Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
            let angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
            return (less0 === false ? angle : (angle < 0 ? angle + 360 : angle));
        }
        return 0;
    }
    
    setModalPosition(elementCall, modalElement, scale) {
        let elementPos = this.getBoundingClientRect(elementCall);
        let modalPos = this.getBoundingClientRect(modalElement);
        let bodyWidth = _doc.body('body').clientWidth;
        let bodyHeight = _doc.body('body').clientHeight;

        let leftPos = elementPos.left > modalPos.width + 10;
        let rightPos = bodyWidth - elementPos.right > modalPos.width + 10;
        let topPos = elementPos.top + modalPos.height + 10 < bodyHeight;
        let bottomPos = elementPos.bottom - modalPos.height - 10 > 0;

        let cssTransform = 'scale(' + scale + ')';

        
        if ((leftPos || rightPos) && (topPos || bottomPos)) {
            let posx = leftPos ? elementPos.left - modalPos.width - 10 : elementPos.right + 10;
            let posy = topPos ? elementPos.top : elementPos.bottom - modalPos.height;

            if (bottomPos && elementPos.bottom > bodyHeight)
                posy = bodyHeight - modalPos.height - 10;


            cssTransform = 'translate(' + posx + 'px,' + posy + 'px) ' + cssTransform;
            _doc.addStyles(modalElement, {
                top: '0px',
                left: '0px',
                transform: cssTransform
            });
        } else {
            cssTransform += ' translate(-50%, -50%)';
            _doc.addStyles(modalElement, {
                transform: cssTransform
            });
        }

        return cssTransform.replace('scale(' + scale + ')', 'scale(1)');
    }
}