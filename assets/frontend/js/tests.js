
let testFormater = () => {
    let htmlelem = `
<div class="modal-wrap apclick" style="text: tete" data-tits-booba="size: 5" >
    <div class="modal-story-wrap">
        <div class="modal-story-events">
            <div class="modal-story--event-close"></div>
            <div class="modal-story--loader">
                <div class="progress-container"></div>
            </div>
            <div class="modal-story--event-back"></div>
            <div class="modal-story--event-pause"></div>
            <div class="modal-story--event-next"></div>
        </div>

        <div class="modal-story-content-wrap">
            <div class="modal-story--container">
                <div class="modal-story--content">
                    <div class="modal-story--content-header"></div>
                </div>
            </div>
        </div>
        aaa
    </div>
</div>
`;
    let element = _doc.htmlToElement(htmlelem);
    let elemformat = _doc.elementToFormat(element);

    console.log(element);
    console.log(htmlelem);
    console.log(elemformat);
    console.log('------------------');

    let formatelem = _doc.formatToElement(elemformat);
    let elemhtml = _doc.elementToHtml(formatelem);

    console.log(formatelem);
    console.log(elemhtml);
}
