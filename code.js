//Globalevariablen
const canvas = document.getElementById("mainCanvas")
const context = canvas.getContext("2d")
//Leinwand parameter
let x = canvas.width / 2 // 150
let y = canvas.height - 30 // 120
let dx = 2
let dy = -2
//Ball parameter
const ballRadius = 2
//Balken parameter
const barHeight = 5
const barWidht = 35
let barX = (canvas.height - barWidht) / 2 // 57.5
//Parameter der Steuerung
let rightPress = false
let leftPress = false

document.write(Math.PI * 2)

//canvas.height = 150
//canvas.width = 300

//Funktion zum Zeichnen eines Balles
const ball = () => {
    context.beginPath()
    //150, 120, 2, 0, 6.283185307179586
    context.arc(x, y, ballRadius, 0, Math.PI * 2)
    context.fillStyle = "#79121A"
    context.fill()
    context.closePath()
}

//Funktion zum Zeichnen eines Balken
const bar = () => {
    context.beginPath()
    //57.5, 150 - 5, 35, 5
    context.rect(barX, canvas.height - barHeight, barWidht, barHeight)
    context.fillStyle = "#53382F"
    context.fill()
    context.closePath()
}

//Steuerung des Balken mit Pfeiltasten
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

//Übertragung der Komponenten auf die Leinwand
const draw = () => {
    //0, 0, 150, 300
    context.clearRect(0, 0, canvas.width, canvas.height)
    ball()
    bar()

    //Kollision mit Wänden
    // 150 + 2 > 150 - 2 || 150 + 2 < 2
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
//GameOver
    //120 + -2 < 2
    if (y + dy < ballRadius) {
        //-2 = -(-2)
        dy = -dy

        //120 + -2 > 150 => true
    } else if (y + dy > canvas.height - ballRadius) {
        //150 > 57.5 && 57.5 + 35
        if (x > barX && x < barX + barWidht) {
            //-2 = -(-2)
            dy = -dy
        } else {
            alert("GAME OVER")
            document.location.reload()
            clearInterval(interval)
        }
    }

    //Bewegung Balken
    if (rightPress) {
        //Geschwindigkeit nach rechts
        // 57.5 + 6
        barX += 6
        //57.5 + 35 > 300
        if (barX + barWidht > canvas.width) {
            //57.5 = 300 - 35
            barX = canvas.width - barWidht
        }
    } else if (leftPress) {
        //Geschwindigkeit nach links
        // 57.5 - 6
        barX -= 6
        //57.5 < 0
        if (barX < 0) {
            //57.5 = 0
            barX = 0
        }
    }
    //150 + 2
    x += dx
    //120 - -2
    y += dy
}

const interval = setInterval(draw, 20)
