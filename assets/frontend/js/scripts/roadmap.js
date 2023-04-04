const defaultStickerPath = defaultScriptPath + '/sticker';
const defaultContentPath = defaultScriptPath + '/content';

const roadmapScripts = [
    {
        src: defaultStickerPath + '/Sticker.js',
        module: 'Sticker'
    },
    {
        src: defaultStickerPath + '/StickerEvents.js',
        module: 'StickerEvents'
    },
    {
        src: defaultStickerPath + '/StickerStruct.js',
        module: 'StickerStruct'
    },
    {
        src: defaultStickerPath + '/StickerType.js',
        module: 'StickerType'
    },
    {
        src: defaultContentPath + '/NavConstruct.js',
        module: 'NavConstruct'
    },
    {
        src: defaultContentPath + '/ContentConstruct.js',
        module: 'ContentConstruct'
    },
    {
        src: defaultContentPath + '/ContentDrugToScroll.js',
        module: 'ContentDrugToScroll'
    },
    {
        src: defaultContentPath + '/DragAndMoveLoc.js',
        module: 'DragAndMoveLoc'
    },
    {
        src: defaultContentPath + '/DragAndMoveGlob.js',
        module: 'DragAndMoveGlob'
    },
    {
        src: defaultContentPath + '/ContentAnimation.js',
        module: 'ContentAnimation'
    }
];


roadmapScripts.forEach(_script => {
    DOCUMENT_SCRIPTS_LOADS.push(_script);
});

