document.addEventListener('DOMContentLoaded', () => {
    const defaultSettings = {
        line: { width: 2, color: 'red' },
    }

    const cursor = {
        drawing: false,
        position: { x: 0, y: 0 },
        lastPosition: null
    }

    const configBoard = () => {
        board.width = window.innerWidth
        board.height = window.innerHeight
    }

    const configContext = () => {
        context.lineWidth = defaultSettings.line.width
        context.strokeStyle = defaultSettings.line.color
    }

    const configEvents = () => {
        board.onmousedown = () => { cursor.drawing = true }
        board.onmouseup = () => { cursor.drawing = false }
        board.onmousemove = (event) => {
            cursor.position.x = event.clientX
            cursor.position.y = event.clientY
            move()
        }
    }

    const draw = (command) => {
        context.beginPath()
        context.moveTo(command.lastPosition.x, command.lastPosition.y)
        context.lineTo(command.position.x, command.position.y)
        context.stroke()
    }

    const move = () => {
        if (cursor.lastPosition && cursor.drawing) {
            draw({ position: cursor.position, lastPosition: cursor.lastPosition })
        }

        cursor.lastPosition = { ...cursor.position }
    }

    const board = document.querySelector('#board')
    const context = board.getContext('2d')

    configBoard()
    configContext()
    configEvents()
})