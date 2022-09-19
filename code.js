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
const barHeight = 5
const barWidht = 35
let barX = (canvas.height - barWidht) / 2
let rightPress = false
let leftPress = false


const keyDownHandler = (element) => {
    if (element.key === "Right" || element.key === "ArrowRight") {
        rightPress = true
    } else if (element.key === "Left" || element.key === "ArrowLeft") {
        leftPress = true
    }
}

const keyUpHandler = (element) => {
    if (element.key === "Right" || element.key === "ArrowRight") {
        rightPress = false
    } else if (element.key === "Left" || element.key === "ArrowLeft") {
        leftPress = false
    }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

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
    context.rect(barX, canvas.height - barHeight, barWidht, barHeight)
    context.fillStyle = "#53382F"
    context.fill()
    context.closePath()
}

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    ball()
    bar()

    //Kollision mit Wänden
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius)
        dx = -dx

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius)
        dy = -dy
   //Bewegung Balken
    if (rightPress) {
        barX += 7
        if (barX + barWidht > canvas.width) {
            barX = canvas.width - barWidht
        }
    } else if (leftPress) {
        barX -= 7
        if (barX < 0) {
            barX = 0
        }
    }
    x += dx
    y += dy
}

const interval = setInterval(draw, 20)