class ModalStory extends ModalStruct {
    getLocalStyles() {
        return {
            modalStoryWrap: 'modal-story-wrap',
            modalStoryEvents: 'modal-story-events',
            modalStoryProgressContainer: 'progress-container',

            modalStoryEventClose: 'modal-story--event-close',
            modalStoryLoader: 'modal-story--loader',
            modalStoryEventBack: 'modal-story--event-back',
            modalStoryEventPause: 'modal-story--event-pause',
            modalStoryEventNext: 'modal-story--event-next',

            modalStoryContentWrap: 'modal-story-content-wrap',
            modalStoryContainer: 'modal-story--container',
            modalStoryContent: 'modal-story--content',
            modalStoryContentHeader: 'modal-story--content-header',


            modalStoryImage: 'modal-story--image'

        }
    }

    getImages() {
        let imgs = [];

        this.data.content.forEach(el => {
            imgs.push(el.src);
        });

        return imgs;
    }

    makeModalStory() {

        let storyElement = {
            "tagName": "div",
            "class": this.styles.modalStoryWrap,
            "children": {
                "1": {
                    "tagName": "div",
                    "class": this.styles.modalStoryEvents,
                    "children": {
                        "1": {
                            "tagName": "div",
                            "class": this.styles.modalStoryEventClose
                        },
                        "3": {
                            "tagName": "div",
                            "class": this.styles.modalStoryLoader,
                            "children": {
                                "1": {
                                    "tagName": "div",
                                    "class": this.styles.modalStoryProgressContainer
                                }
                            }
                        },
                        "5": {
                            "tagName": "div",
                            "class": this.styles.modalStoryEventBack
                        },
                        "7": {
                            "tagName": "div",
                            "class": this.styles.modalStoryEventPause
                        },
                        "9": {
                            "tagName": "div",
                            "class": this.styles.modalStoryEventNext
                        }
                    }
                },
                "3": {
                    "tagName": "div",
                    "class": this.styles.modalStoryContentWrap,
                    "children": {
                        "1": {
                            "tagName": "div",
                            "class": this.styles.modalStoryContainer,
                            "children": {
                                "1": {
                                    "tagName": "div",
                                    "class": this.styles.modalStoryContent,
                                    "children": {
                                        "1": {
                                            "tagName": "div",
                                            "class": this.styles.modalStoryContentHeader
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };


        this.modalElement.appendChild(_doc.formatToElement(storyElement));


        this.progressModal = new ModalStoryProcess(this.data.content, this.styles, this.data.params);
        this.progressModal.run(0);

        document.querySelector('.' + this.styles.modalStoryEventClose).addEventListener('click', () => {
            this.storyDesctruct();
        });

        this.animation.animateIn(this.elementCall, this.progressModal.getStoryWrap());

    }

    storyDesctruct() {
        let timeoutLength = this.animation.animateOut(this.elementCall, this.progressModal.getStoryWrap());

        setTimeout(() => {
            this.progressModal.destroy();
        }, timeoutLength);

        this.elementCall = null;
        this.onDesctruct = null;
        this.destroy();
    }

    render(callelement) {

        this.elementCall = callelement;
        this.animation = new ModalStoryAnimation();
        this.animation.setStyles(this.styles);


        this.initRender(() => {
            this.modalPreload(this.getImages(), () => {

                this.removePreload();
                this.makeModalStory();


                this.desctructTimeOut = 100;
                this.onDesctruct = () => {
                    let timeoutLength = this.animation.animateOut(this.elementCall, this.progressModal.getStoryWrap());

                    setTimeout(() => {
                        this.progressModal.destroy();
                    }, timeoutLength);
                }

            });
        });

    }

}