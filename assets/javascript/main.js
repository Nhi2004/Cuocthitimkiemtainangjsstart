(() => {

    const cols = 10;
    const rows = 20;
    const blockSize = 30;

    const colorMapping = [
        'red',
        'orange',
        'green',
        'purple',
        'blue',
        'cyan',
        'yellow',
        'white'
    ];

    const brickLayout = [
        [
            [
                [1, 7, 7],
                [1, 1, 1],
                [7, 7, 7],
            ],
            [
                [7, 1, 1],
                [7, 1, 7],
                [7, 1, 7],
            ],
            [
                [7, 7, 7],
                [1, 1, 1],
                [7, 7, 1],
            ],
            [
                [7, 1, 7],
                [7, 1, 7],
                [1, 1, 7],
            ],
        ],
        [
            [
                [7, 1, 7],
                [7, 1, 7],
                [7, 1, 1],
            ],
            [
                [7, 7, 7],
                [1, 1, 1],
                [1, 7, 7],
            ],
            [
                [1, 1, 7],
                [7, 1, 7],
                [7, 1, 7],
            ],
            [
                [7, 7, 1],
                [1, 1, 1],
                [7, 7, 7],
            ],
        ],
        [
            [
                [1, 7, 7],
                [1, 1, 7],
                [7, 1, 7],
            ],
            [
                [7, 1, 1],
                [1, 1, 7],
                [7, 7, 7],
            ],
            [
                [7, 1, 7],
                [7, 1, 1],
                [7, 7, 1],
            ],
            [
                [7, 7, 7],
                [7, 1, 1],
                [1, 1, 7],
            ],
        ],
        [
            [
                [7, 1, 7],
                [1, 1, 7],
                [1, 7, 7],
            ],
            [
                [1, 1, 7],
                [7, 1, 1],
                [7, 7, 7],
            ],
            [
                [7, 7, 1],
                [7, 1, 1],
                [7, 1, 7],
            ],
            [
                [7, 7, 7],
                [1, 1, 7],
                [7, 1, 1],
            ],
        ],
        [
            [
                [7, 7, 7, 7],
                [1, 1, 1, 1],
                [7, 7, 7, 7],
                [7, 7, 7, 7],
            ],
            [
                [7, 7, 1, 7],
                [7, 7, 1, 7],
                [7, 7, 1, 7],
                [7, 7, 1, 7],
            ],
            [
                [7, 7, 7, 7],
                [7, 7, 7, 7],
                [1, 1, 1, 1],
                [7, 7, 7, 7],
            ],
            [
                [7, 1, 7, 7],
                [7, 1, 7, 7],
                [7, 1, 7, 7],
                [7, 1, 7, 7],
            ],
        ],
        [
            [
                [7, 7, 7, 7],
                [7, 1, 1, 7],
                [7, 1, 1, 7],
                [7, 7, 7, 7],
            ],
            [
                [7, 7, 7, 7],
                [7, 1, 1, 7],
                [7, 1, 1, 7],
                [7, 7, 7, 7],
            ],
            [
                [7, 7, 7, 7],
                [7, 1, 1, 7],
                [7, 1, 1, 7],
                [7, 7, 7, 7],
            ],
            [
                [7, 7, 7, 7],
                [7, 1, 1, 7],
                [7, 1, 1, 7],
                [7, 7, 7, 7],
            ],
        ],
        [
            [
                [7, 1, 7],
                [1, 1, 1],
                [7, 7, 7],
            ],
            [
                [7, 1, 7],
                [7, 1, 1],
                [7, 1, 7],
            ],
            [
                [7, 7, 7],
                [1, 1, 1],
                [7, 1, 7],
            ],
            [
                [7, 1, 7],
                [1, 1, 7],
                [7, 1, 7],
            ],
        ],
    ];

    const keyCode = {
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight',
        UP: 'ArrowUp',
        Down: 'ArrowDown',
    }

    const whiteColorId = 7;
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = cols * blockSize;
    ctx.canvas.height = rows * blockSize;

    class Board {
        constructor(ctx) {
            this.ctx = ctx;
            this.gird = this.generateWhiteBoard();
            this.score = 0;
            this.gameOver = false;
            this.isPlaying = false;

            this.clearAudio = new Audio('assets/audio/sounds_clear.wav');
            this.gameAudio = new Audio('assets/audio/y2mate.com - Original Tetris theme Tetris Soundtrack.mp3')
        }

        reset() {
            this.gird = this.generateWhiteBoard();
            this.score = 0;
            this.gameOver = false;
            document.getElementById('score').textContent = this.score.toString();
            this.drawBoard();
        }

        generateWhiteBoard() {
            return Array.from({
                length: rows
            }, () => Array(cols).fill(whiteColorId))
        }

        drawCell(xAxis, yAxis, colorId) {
            this.ctx.fillStyle = colorMapping[colorId] || colorMapping[whiteColorId];
            this.ctx.fillRect((xAxis * blockSize), (yAxis * blockSize), blockSize, blockSize);
            this.ctx.fillStyle = 'black';
            this.ctx.strokeRect((xAxis * blockSize), (yAxis * blockSize), blockSize, blockSize)
        }

        drawBoard() {
            for (let row = 0; row < this.gird.length; row++) {
                for (let col = 0; col < this.gird[0].length; col++) {
                    this.drawCell(col, row, this.gird[row][col]);
                }
            }
        }

        handleCompleteRows() {
            const latestGird = board.gird.filter((row) => {
                return row.some(col => col === whiteColorId)
            })
            const newScore = rows - latestGird.length;
            const newRows = Array.from({
                length: newScore
            }, () => Array(cols).fill(whiteColorId));

            if (newScore) {
                board.gird = [...newRows, ...latestGird];
                this.handelScore(newScore * 10);
                this.clearAudio.play();
            }
        }

        handelScore(newScore) {
            this.score += newScore;
            localStorage.setItem('max-score', this.score);
            document.getElementById('score').textContent = this.score;
        }

        handleGameOver = () => {
            this.gameOver = true;
            this.isPlaying = false;
            this.gameAudio.pause();
            document.getElementById('placeToHidden').innerHTML += `
                <div class="notice">
                    <form method="post">
                        You are game over with ${this.score} score !
                        <button type="submit">Play again</button>
                    </form>
                </div>
            `
            document.querySelector('.notice form').addEventListener('submit', (e) => {
                e.preventDefault();
                e.target.parentNode.remove();
                this.reset();
                play();
            })
        }
    }

    class Brick {
        constructor(id) {
            this.id = id;
            this.layout = brickLayout[id];
            this.activeIndex = 0;
            this.colPos = 3;
            this.rowPos = -2;
        }

        draw() {
            for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                    if (this.layout[this.activeIndex][row][col] !== whiteColorId) {
                        board.drawCell((col + this.colPos), (row + this.rowPos), this.id);
                    }
                }
            }
        }

        clear() {
            for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                    if (this.layout[this.activeIndex][row][col] !== whiteColorId) {
                        board.drawCell((col + this.colPos), (row + this.rowPos), whiteColorId);
                    }
                }
            }
        }

        moveLeft() {
            if (!this.checkCollision(this.rowPos, (this.colPos - 1), this.layout[this.activeIndex])) {
                this.clear();
                this.colPos--;
                this.draw();
            }
        }

        moveRight() {
            if (!this.checkCollision(this.rowPos, (this.colPos + 1), this.layout[this.activeIndex])) {
                this.clear();
                this.colPos++;
                this.draw();
            }
        }

        moveDown() {
            if (!this.checkCollision((this.rowPos + 1), this.colPos, this.layout[this.activeIndex])) {
                this.clear();
                this.rowPos++;
                this.draw();
                return;
            }
            this.handleLanded();
            generateNewBrick();
        }

        rotate() {
            if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
                this.clear();
                this.activeIndex = (this.activeIndex + 1) % 4;
                this.draw();
            }
        }

        checkCollision(nextRow, nextCol, nextLayout) {
            for (let row = 0; row < nextLayout.length; row++) {
                for (let col = 0; col < nextLayout[0].length; col++) {
                    if (nextLayout[row][col] !== whiteColorId && nextRow >= 0) {
                        if (
                            col + nextCol < 0 ||
                            col + nextCol >= cols ||
                            row + nextRow >= rows ||
                            board.gird[row + nextRow][col + nextCol] !== whiteColorId
                        ) return true;
                    }
                }
            }
            return false;
        }

        handleLanded() {
            if (this.rowPos <= 0) {
                board.handleGameOver();
                return;
            }
            for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                    if (this.layout[this.activeIndex][row][col] !== whiteColorId) {
                        board.gird[row + this.rowPos][col + this.colPos] = this.id;
                    }
                }
            }
            board.handleCompleteRows();
            board.drawBoard();
        }
    }

    const generateNewBrick = () => {
        brick = new Brick(Math.floor(Math.random() * 10) % brickLayout.length);
    }

    const board = new Board(ctx);
    board.drawBoard()

    let time = 0;
    if (JSON.parse(localStorage.getItem('time'))) {
        time = JSON.parse(localStorage.getItem('time'));
    } else {
        time = 1000;
    }

    const checkAndRenderPreviousScore = () => {
        if (JSON.parse(localStorage.getItem('max-score'))) {
            document.getElementById('previousScore').innerHTML = `
                previous score: ${JSON.parse(localStorage.getItem('max-score'))}
            `;
        } else {
            document.getElementById('previousScore').innerHTML = '';
        }
    }
    checkAndRenderPreviousScore();

    const play = () => {
        board.reset();
        board.isPlaying = true;
        board.gameAudio.play();
        checkAndRenderPreviousScore();
        generateNewBrick();
        const refresh = setInterval(() => {
            if (!board.gameOver) {
                brick.moveDown();
            } else {
                clearInterval(refresh);
            }
        }, time);
    }

    document.getElementById('play').addEventListener('click', () => {
        localStorage.setItem('time', JSON.stringify(1000));
        play()
    })
    document.getElementById('nextLevel').addEventListener('click', () => {
        localStorage.setItem('time', JSON.stringify(400));
        play();
    })

    document.addEventListener('keydown', (e) => {
        if (board.gameOver && !board.isPlaying) return;
        switch (e.code) {
            case keyCode.LEFT:
                brick.moveLeft();
                break;
            case keyCode.RIGHT:
                brick.moveRight();
                break;
            case keyCode.Down:
                brick.moveDown();
                break;
            case keyCode.UP:
                brick.rotate();
                break;
            default:
                break;
        }
    })

})()