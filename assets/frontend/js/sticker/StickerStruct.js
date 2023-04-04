class StickerStruct {
    constructor(stickersObj) {
        this.stickersData = stickersObj;
        this.stickers = [];
    }


    sortByDate() {
        let newData = [];

        for (let index in this.stickersData) {
            newData.push([index, this.stickersData[index]]);
        }

        newData.sort(function (a, b) {
            if (typeof a[1].date === 'undefined' || !a[1].date)
                a[1].date = 0;

            if (typeof b[1].date === 'undefined' || !b[1].date)
                b[1].date = 0;

            if (typeof a[1].date === 'string')
                a[1].date = new Date(a[1].date).getTime();

            if (typeof b[1].date === 'string')
                b[1].date = new Date(b[1].date).getTime();
                
            return a[1].date - b[1].date;
        });

        this.stickersData = [];

        for (let index in newData) {
            this.stickersData.push(newData[index][1]);
        }

    }


    extract() {
        this.sortByDate(this.stickersData);

        let days = [];
        for (let i in this.stickersData) {

            if (typeof this.stickersData[i].date === 'undefined' || !this.stickersData[i].date)
                days[i] = 0;
            else
                days[i] = new Date(this.stickersData[i].date).getDate();

            if ((i == 0 && days[i] > 5) || days[i] - days[i - 1] >= 5)
                this.stickers.push(new StickerType().getHtml());

            this.stickers.push(new StickerType(this.stickersData[i]).getHtml());
        }

        return this.stickers;
    }
}