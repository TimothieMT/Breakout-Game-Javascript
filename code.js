
//Globalevariablen
const canvas = document.getElementById("mainCanvas")
const context = canvas.getContext("2d")
//Leinwand parameter
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2
//Ball parameter
const ballRadius = 2
//Balken parameter
const barheight = 10
const barwidht = 75
let barX = (canvas.height - canvas.width) / 2


//Funktion zum Zeichnen eines Balles
const ball = () => {
    context.beginPath()
    context.arc(x, y, ballRadius, 0, Math.PI * 2)
    context.fillStyle = "#79121A"
    context.fill()
    context.closePath()
}

const bar = () => {
    context.beginPath()
    context.rect(barX, canvas.height - barheight, barwidht, barheight)
    context.fillStyle = "#53382F"
    context.fill()
    context.closePath()
}

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    ball()

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius)
        dx = -dx

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius)
        dy = -dy


    x += dx
    y += dy
}

const start = () => {
    ball()
    bar()
    setInterval(draw, 30)
}