//Globalevariablen
const canvas = document.getElementById("mainCanvas")
const context = canvas.getContext("2d")
//Leinwand parameter
let x = canvas.width  // 150
let y = canvas.height  // 120
let dx = 2
let dy = -2
//Ball parameter
const ballRadius = 2
//Spielerbalken parameter
const barHeight = 5
const barWidht = 35
let barX = (canvas.height - barWidht) / 2 // 57.5
//Parameter der Steuerung
let rightPress = false
let leftPress = false
//Zielbalken
const brickRow = 15
const brickColumn = 17
const brickWidth = 15
const brickHeight = 3
const brickPadding = 2
const brickSpaceTop = 14
const brickSpaceLeft = 6
let score = 0


//
let brickList = []
for (let i = 0; i < brickColumn; i++) {
    brickList[i] = []
    for (let j = 0; j < brickRow; j++) {
        brickList[i][j] = {x: 0, y: 0, status: 1}
    }
}

//Kollisionsabfrage der Zielbalken
const collision = () => {
    for (let i = 0; i < brickColumn; i++) {
        for (let j = 0; j < brickRow; j++) {
            const brickStatus = brickList[i][j]
            if (brickStatus.status === 1) {
                if (
                    x > brickStatus.x &&
                    x < brickStatus.x + brickWidth &&
                    y > brickStatus.y &&
                    y < brickStatus.y + brickHeight
                ) {
                    dy = -dy
                    brickStatus.status = 0
                    score++
                    document.getElementById("highscore").innerHTML = score.toString()
                    if (score > 50) {
                        document.getElementById("highscore").style.color = "green"
                    } else if (score > 100) {
                        document.getElementById("highscore").style.color = "red"
                    }
                    if (score === brickRow * brickColumn) {
                        alert("Winner")
                        document.location.reload()
                        clearInterval(interval)
                    }
                }
            }
        }
    }
}


const bricks = () => {
    //Nested loop zum Generieren von balken
    for (let i = 0; i < brickColumn; i++) {
        for (let j = 0; j < brickRow; j++) {
            if (brickList[i][j].status === 1) {
                //(i*(15 + 2)) + 6 => 17 Durchläufe
                let X = (i * (brickWidth + brickPadding)) + brickSpaceLeft
                //(j*(3 + 2)) + 6 => 17 Durchläufe
                let Y = (j * (brickHeight + brickPadding)) + brickSpaceTop
                brickList[i][j].x = X
                brickList[i][j].y = Y
                context.beginPath()
                //X, Y, 15, 3
                context.rect(X, Y, brickWidth, brickHeight)
                context.fillStyle = "#15607f"
                context.fill()
                context.closePath()
            }
        }
    }
}


//canvas.height = 150
//canvas.width = 300

//Funktion zum Zeichnen eines Balles
const ball = () => {
    context.beginPath()
    //150, 120, 2, 0, 6.283185307179586
    context.arc(x, y, ballRadius, 0, Math.PI * 2)
    context.fillStyle = "#000000"
    context.fill()
    context.closePath()
}

//Funktion zum Zeichnen eines Balken
const bar = () => {
    context.beginPath()
    //57.5, 150 - 5, 35, 5
    context.rect(barX, canvas.height - barHeight, barWidht, barHeight)
    context.fillStyle = "#000000"
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


const start = () => {

    //Übertragung der Komponenten auf die Leinwand
    const draw = () => {
        //0, 0, 150, 300
        context.clearRect(0, 0, canvas.width, canvas.height)

        bricks()
        ball()
        bar()
        collision()

        //Kollision mit Wänden
        // 150 + 2 > 150 - 2 || 150 + 2 < 2
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            //2 = -2
            dx = -dx
        }

//GameOver
        //120 + -2 < 2
        if (y + dy < ballRadius) {
            //-2 = -(-2)
            dy = -dy
        }
        //120 + -2 > 150 => true
        else if (y + dy > canvas.height - ballRadius) {
            //150 > 57.5 && 57.5 + 35
            if (x > barX && x < barX + barWidht) {
                //-2 = -(-2)
                dy = -dy

            } else {
                // alert("GAME OVER")
                // document.location.reload()
                // clearInterval(interval)
            }
        }

//Bewegung Balken
        if (rightPress && barX < canvas.width - barWidht) {
            //Geschwindigkeit nach rechts
            // 57.5 + 7
            barX += 7
            //57.5 + 35 > 300
        } else if (leftPress && barX > 0) {
            //Geschwindigkeit nach links
            // 57.5 - 7
            barX -= 7
            //57.5 < 0
        }
        //150 + 2
        x += dx
        //120 - -2
        y += dy
    }

    const interval = setInterval(draw, 30)
}
