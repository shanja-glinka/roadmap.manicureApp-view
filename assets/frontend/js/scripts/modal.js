const defaultModalPath = defaultScriptPath + '/modal';

const modalScripts = [
    {
        src: defaultModalPath + '/ModalStruct.js',
        module: 'ModalStruct'
    },
    {
        src: defaultModalPath + '/AnimationSctruct.js',
        module: 'AnimationSctruct'
    },
    {
        src: defaultModalPath + '/ModalAlbum.js',
        module: 'ModalAlbum'
    },
    {
        src: defaultModalPath + '/ModalAlbumAnimation.js',
        module: 'ModalAlbumAnimation'
    },
    {
        src: defaultModalPath + '/ModalConstruct.js',
        module: 'ModalConstruct'
    },
    {
        src: defaultModalPath + '/ModalField.js',
        module: 'ModalField'
    },
    {
        src: defaultModalPath + '/ModalFieldAnimation.js',
        module: 'ModalFieldAnimation'
    },
    {
        src: defaultModalPath + '/ModalStory.js',
        module: 'ModalStory'
    },
    {
        src: defaultModalPath + '/ModalStoryAnimation.js',
        module: 'ModalStoryAnimation'
    },
    {
        src: defaultModalPath + '/ModalStoryProcess.js',
        module: 'ModalStoryProcess'
    }];


modalScripts.forEach(_script => {
    DOCUMENT_SCRIPTS_LOADS.push(_script);
});