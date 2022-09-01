const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// User Settings
const allInputs = document.querySelectorAll('#settings div > input');

let shapeColorTypeChoices = document.querySelectorAll('#shape-type-choose > div > input');
let shapeColorTypeChoice = document.getElementById('shape-type-color');
let shapeColor = document.getElementById('shape-color');

let shapeSize = document.getElementById('shape-size');
let shapeInset = document.getElementById('shape-inset');
let shapeSides = document.getElementById('shape-sides');

let outlineColor = document.getElementById('outline-color');
let outlineWidth = document.getElementById('outline-width');
let shadowColor = document.getElementById('shadow-color');

let shadowOffsetX = document.getElementById('shadow-offset-x');
let shadowOffsetY = document.getElementById('shadow-offset-y');
let shadowBlur = document.getElementById('shadow-blur');

let spinSpeed = document.getElementById('spin-speed');
let spinSpeedValue = parseFloat(spinSpeed.value);

let backgroundColor = document.getElementById('background-color');

// Default Settings
let radius = shapeSize.value;
let inset = shapeInset.value;
let n = shapeSides.value;
ctx.strokeStyle = outlineColor.value;
ctx.lineWidth = outlineWidth.value;
ctx.shadowColor = shadowColor.value;
ctx.shadowOffsetX = shadowOffsetX.value;
ctx.shadowOffsetY = shadowOffsetY.value;
ctx.shadowBlur = shadowBlur.value;

// When the user chooses which color type
shapeColorTypeChoices.forEach( e => {
    e.addEventListener('change', () => {
        if (shapeColorTypeChoice.checked) {
            shapeColor.setAttribute('data-show', '')
        }
        else {
            shapeColor.removeAttribute('data-show')
        }
    })
})

// When user change the value in the settings
allInputs.forEach ( e => {
    e.addEventListener('change', () => {
        radius = shapeSize.value;
        inset = shapeInset.value;
        n = shapeSides.value;
        ctx.strokeStyle = outlineColor.value;
        ctx.lineWidth = outlineWidth.value;
        ctx.shadowColor = shadowColor.value;
        ctx.shadowOffsetX = shadowOffsetX.value;
        ctx.shadowOffsetY = shadowOffsetY.value;
        ctx.shadowBlur = shadowBlur.value;
        spinSpeedValue = parseFloat(spinSpeed.value);
    })
})

backgroundColor.addEventListener('input', () => {
    canvas.style.backgroundColor = backgroundColor.value;
})

// When window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    radius = shapeSize.value;
    inset = shapeInset.value;
    n = shapeSides.value;
    ctx.strokeStyle = outlineColor.value;
    ctx.lineWidth = outlineWidth.value;
    ctx.shadowColor = shadowColor.value;
    ctx.shadowOffsetX = shadowOffsetX.value;
    ctx.shadowOffsetY = shadowOffsetY.value;
    ctx.shadowBlur = shadowBlur.value;
    spinSpeedValue = parseFloat(spinSpeed.value);
})

let hue = 0;
let drawing = false;

function drawShape(x, y, radius, inset, n) {
    if (shapeColor.hasAttribute('data-show')) {
        ctx.fillStyle = shapeColor.value;
    }
    else {
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    }

    ctx.beginPath();

    ctx.save();
    ctx.translate(x, y)
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (radius * inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius);
    }
    ctx.restore();
    
    ctx.closePath();
    ctx.stroke();  
    ctx.fill();  
}

let angle = 0;
window.addEventListener('click', (e) => {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(angle);
    hue+=3;
    angle += spinSpeedValue;
    drawShape(0, 0, radius, inset, n);
    ctx.restore();
})

window.addEventListener('mousemove', (e) => {
    if (drawing) {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(angle);
        hue+=3;
        angle += spinSpeedValue;
        drawShape(0, 0, radius, inset, n);
        ctx.restore();
    }
})
window.addEventListener('mousedown', () => {
    drawing = true;
})
window.addEventListener('mouseup', () => {
    drawing = false;
})