class ContentConstruct {
    constructor() {
        this.contentClass = 'content';

        this.columnClass = 'roadmap-column';
        this.columntitleClass = 'column-title';
        this.columnBodyClass = 'column-body';


        this.columnList = [];

        this.scrollAnimation = new ContentAnimation;
    }

    sortData(data) {
        let formattedData = {};

        for (let k in data) {
            let date = new Date(data[k].date);
            let index = date.getFullYear() + (date.getMonth() > 9 ? date.getMonth().toString() : '0' + date.getMonth().toString());

            if (!formattedData[index])
                formattedData[index] = [];

            formattedData[index].push(data[k]);

        }

        return formattedData;

    }



    constructColumnTitle(data) {

        let date = new Date(data[0].date);

        let columnTitle = _doc.createElement('div', { class: this.columntitleClass });

        columnTitle.appendChild(_doc.createElement('span', { innerText: Months[date.getMonth()] }));
        columnTitle.appendChild(_doc.createElement('small', { innerText: date.getFullYear() }))


        return columnTitle;
    }

    constructColumnBody(data) {

        let columnBody = _doc.createElement('div', { class: this.columnBodyClass });
        let stickers = new StickerStruct(data).extract();

        stickers.forEach(stickerEl => {
            columnBody.appendChild(stickerEl);
        });

        return columnBody;
    }

    constructColumn(data) {
        let column = _doc.createElement('div', { class: this.columnClass, style: { opacity: 0 } });

        column.appendChild(this.constructColumnTitle(data));
        column.appendChild(this.constructColumnBody(data));

        return column;
    }

    setVisabillity(content) {
        for (let i = 0; i < content.children.length; i++) {
            let column = content.children[i];
            if (_doc.isVisibleElement(column, false)) {
                _doc.removeStyles(column, 'opacity');
                column.setAttribute('data-visibility', 1);
            } else {
                this.columnList.push(column);
            }
        }


    }

    render(dataObj) {

        let content = _doc.createElement('div', { class: this.contentClass });
        let sortData = this.sortData(dataObj);

        for (let k in sortData)
            content.appendChild(this.constructColumn(sortData[k]));

        document.querySelector('main').appendChild(content);


        this.setVisabillity(content);


        this.dragToScroll = new ContentDrugToScroll(document.querySelector('main'));
        this.dragToScroll.run();


        this.scrollAnimation.setColumnList(this.columnList);


        document.querySelector('main').addEventListener('scroll', () => {
            this.scrollAnimation.scrollEvent();
        })

    }
}