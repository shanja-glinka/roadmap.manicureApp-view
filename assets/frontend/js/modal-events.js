function _bithShowsMe(e) {
    let text = `
    <div class="confetti">
        <div class="squareOne"></div>
        <div class="squareTwo"></div>
        <div class="squareThree"></div>
        <div class="squareFour"></div>
        <div class="squareFive"></div>
        <div class="squareSix"></div>
        <div class="squareSeven"></div>
        <div class="squareEight"></div>
        <div class="squareNine"></div>
        <div class="squareTen"></div>
    </div>`;

    document.querySelector('.modal-wrap').appendChild(_doc.htmlToElement(text));


    setTimeout(() => {
        try {
            document.querySelector('.modal-wrap').removeChild(document.querySelector('.confetti'));
        } catch { }
    }, 3000);

}

function bithShowsMe(e) {

    setTimeout(() => {
        document.querySelector('.modal-wrap').appendChild(_doc.createElement('div', { class: 'confetti-startpoint' }));
        document.querySelector('.modal-wrap').appendChild(_doc.createElement('canvas', { class: 'confetti-canvas' }));

        startPointElement = document.querySelector('.confetti-startpoint');
        canvasBithElement = document.querySelector('.confetti-canvas');
        ctxBithElement = canvasBithElement.getContext('2d');
        canvasBithElement.width = window.innerWidth;
        canvasBithElement.height = window.innerHeight;
        cBithx = ctxBithElement.canvas.width / 2;
        cBithy = ctxBithElement.canvas.height / 2;


        window.initBurst();
        renderConfetti();
    }, 400);


}

function bithShowsMe2(e) {

    let text = `
    <div class="take-cake-wrap">
        <div class="take-cake">
            <div class="cake">
                <div class="cake-bottom"></div>
                <div class="cake-middle"></div>
                <div class="cake-top"></div>
                <div class="candle"></div>
                <div class="flame"></div>
                <div class="shadow"></div>
            </div>
        </div>
    </div> `;

    setTimeout(() => {
        document.querySelector('main').appendChild(_doc.htmlToElement(text));


        setTimeout(() => {
            document.querySelector('.take-cake-wrap .cake').classList.add('flame-done');

            setTimeout(() => {
                document.querySelector('.take-cake-wrap .cake').appendChild(_doc.htmlToElement(
                    `<div class="smoke">
                        <div class="smoke-left"></div>
                        <div class="smoke-middle"></div>
                        <div class="smoke-right"></div>
                    </div>`));
            }, 200);

            setTimeout(() => {

                document.querySelector('.take-cake-wrap').style.animation = 'cake-out .3s forwards';
                setTimeout(() => {
                    document.querySelector('main').removeChild(document.querySelector('.take-cake-wrap'));
                }, 300);

            }, 2000);

        }, 1500);
    }, 400);

}

function bithShowsMe3(e) {

    startPointElement = null;
    canvasBithElement = null;
    ctxBithElement = null;
    cBithx = 0.0;
    cBithy = 0.0;

    confetti = []

}




















const confettiCount = 200;

const gravityConfetti = 0.3
const dragConfetti = 0.015
const terminalVelocity = 3


let reqAnimFrameBith = null;


let startPointElement = null;
let canvasBithElement = null;
let ctxBithElement = null;
let cBithx = 0.0;
let cBithy = 0.0;

let confetti = [];

let settedTimeOutBiths = [];

const colors = [
    { front: '#7b5cff', back: '#6245e0' },
    { front: '#b3c7ff', back: '#8fa5e5' },
    { front: '#5c86ff', back: '#345dd1' },
    { front: '#EF476F', back: '#801e34' },
    { front: '#ffbe0b', back: '#578585' }
]

randomRange = (min, max) => Math.random() * (max - min) + min

initConfettoVelocity = (xRange, yRange) => {
    const x = randomRange(xRange[0], xRange[1])
    const range = yRange[1] - yRange[0] + 1
    let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
    if (y >= yRange[1] - 1) {
        y += (Math.random() < .25) ? randomRange(1, 3) : 0
    }
    return { x: x, y: -y }
}

class Confetto {
    constructor() {
        this.randomModifier = randomRange(0, 99);
        this.color = colors[Math.floor(randomRange(0, colors.length))];
        this.dimensions = {
            x: randomRange(10, 21),
            y: randomRange(12, 24),
        }
        this.position = {
            x: randomRange(canvasBithElement.width / 2 - startPointElement.offsetWidth / 4, canvasBithElement.width / 2 + startPointElement.offsetWidth / 4),
            y: randomRange(canvasBithElement.height / 2 + startPointElement.offsetHeight / 2 + 8, canvasBithElement.height / 2 + (1.5 * startPointElement.offsetHeight) - 8),
        }
        this.rotation = randomRange(0, 2 * Math.PI);
        this.scale = {
            x: 1,
            y: 1,
        }
        this.velocity = initConfettoVelocity([-15, 15], [4, 18]);
    }

    update = function () {
        this.velocity.x -= this.velocity.x * dragConfetti
        this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity)
        this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)
    }
}



initBurst = () => {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetto())
    }
}

renderConfetti = () => {
    try {
        ctxBithElement.clearRect(0, 0, canvasBithElement.width, canvasBithElement.height)

        confetti.forEach((confetto, index) => {
            let width = (confetto.dimensions.x * confetto.scale.x)
            let height = (confetto.dimensions.y * confetto.scale.y)

            ctxBithElement.translate(confetto.position.x, confetto.position.y)
            ctxBithElement.rotate(confetto.rotation)

            confetto.update()

            ctxBithElement.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back

            ctxBithElement.fillRect(-width / 2, -height / 2, width, height)

            ctxBithElement.setTransform(1, 0, 0, 1, 0, 0)

            if (confetto.velocity.y < 0) {
                ctxBithElement.clearRect(canvasBithElement.width / 2 - startPointElement.offsetWidth / 2, canvasBithElement.height / 2 + startPointElement.offsetHeight / 2, startPointElement.offsetWidth, startPointElement.offsetHeight)
            }
        })

        

        confetti.forEach((confetto, index) => {
            if (confetto.position.y >= canvasBithElement.height) confetti.splice(index, 1)
        })
        


        reqAnimFrameBith = window.requestAnimationFrame(renderConfetti);
    } catch (e) {
        window.cancelAnimationFrame(reqAnimFrameBith);
    }
}


resizeCanvas = () => {
    canvasBithElement.width = window.innerWidth
    canvasBithElement.height = window.innerHeight
    cBithx = ctxBithElement.canvas.width / 2
    cBithy = ctxBithElement.canvas.height / 2
}
