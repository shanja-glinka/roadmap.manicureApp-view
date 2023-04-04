class ContentAnimation {

    constructor() {
        this.columnList = [];
        this.lastTimeout = 100;
    }

    setColumnList(columnList) {
        this.columnList = columnList;
    }

    scrollEvent() {
        let removeList = [];


        if (!this.columnList.length)
            return;

        this.columnList.forEach((element, index) => {
            if (element.getAttribute('data-visibility') == 1)
                return removeList.push(index);

            if (_doc.isVisibleElement(element, false)) {
                this.animateVisible(element);
                removeList.push(index);
            }
        });

        removeList.forEach(it => {
            this.columnList.splice(it, 1);
        });
    }


    animateVisible(element) {
        let timeoutConst = 300;
        let timeout = timeoutConst;

        for (let i = 0; i < element.children.length; i++) {
            let el = element.children[i];
            setTimeout(() => {
                el.classList.add('column-show-in');
                timeout += timeoutConst;
            }, timeout);
        }

        setTimeout(() => {
            _doc.removeStyles(element, 'opacity');
            element.setAttribute('data-visibility', 1);
        }, timeoutConst);

    }
}