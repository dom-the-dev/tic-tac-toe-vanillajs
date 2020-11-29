const startButton = document.querySelector('#start-button');
const gameMenu = document.querySelector('.game-menu');
const gameField = document.querySelector('.game-field');
const inputPlayer1 = document.querySelector('.game-player1');
const inputPlayer2 = document.querySelector('.game-player2');
const fields = document.querySelectorAll('.field');
let game;

class Game {
    constructor(player1, player2) {
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
        this.turnPlayer = this.player1;
        this.winnigValues = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ]
    };

    startGame() {
        let _this = this
        fields.forEach(field => {
            field.addEventListener('click', function select() {
                _this.selectField(field);
                this.removeEventListener('click', select)
            })
        })
    }

    finishGame() {
        console.log('winner is :', this.turnPlayer.name)
    }

    checkIfWon(userVals) {
        let winning = true;
        this.winnigValues.forEach(winingString => {
            if (userVals.length >= winingString.length) {
                // IF ALL VALUES FROM WININGSTRIN ARE IN USER VALS
                winning = true;
            } else {
                winning = false;
            }
        });

        return winning;
    }

    selectField(field) {
        console.log('click')
        if (this.turnPlayer === this.player1) {
            field.innerText = 'X';
        } else {
            field.innerText = 'O';
        }
        field.classList.add('game-square--disabled');

        let gameWon = this.checkIfWon(this.turnPlayer.addField(field));
        if (gameWon) {
            this.finishGame(this.turnPlayer);
        } else {
            this.nextPlayer();
        };
    }

    nextPlayer() {
        if (this.turnPlayer === this.player1) {
            this.turnPlayer = this.player2
        } else {
            this.turnPlayer = this.player1
        }
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.selectedFields = [];
    };

    addField(field) {
        this.selectedFields.push(parseInt(field.dataset.val));
        return this.selectedFields;
    };
}

// START GAME
startButton.addEventListener('click', function (e) {
    e.preventDefault();
    gameMenu.style.display = 'none';
    game = new Game(inputPlayer1.value, inputPlayer2.value)
    gameField.style.display = 'block';
    game.startGame();
})
