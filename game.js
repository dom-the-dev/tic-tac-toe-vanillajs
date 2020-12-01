const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const gameMenu = document.querySelector('.game-menu');
const gameField = document.querySelector('.game-field');
const inputPlayer1 = document.querySelector('.game-player1');
const inputPlayer2 = document.querySelector('.game-player2');
const fields = document.querySelectorAll('.field');
const playersTurn = document.querySelector('.players-turn');
const winnerTag = document.querySelector('.game-winner');
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
        ];
        this.maxTurns = 9;
    };

    startGame() {
        let _this = this;
        _this.turnPlayer = _this.player1;
        playersTurn.innerText = `It's your turn ${_this.turnPlayer.name}`;

        fields.forEach(field => {
            if (field.getAttribute('listener') !== "true") {
                field.setAttribute('listener', "true");
                field.addEventListener('click', function select() {
                    _this.selectField(field);
                    this.removeEventListener('click', select)
                })
            }
        })

        document.querySelector(".player-1-name").innerText = _this.player1.name;
        document.querySelector(".player-2-name").innerText = _this.player2.name;
        document.querySelector(".player-names").classList.add('player-names--active');
    }

    restartGame() {
        this.maxTurns = 9;
        this.player1.clearFields();
        this.player2.clearFields();

        document.querySelector('.game-winner').style.display = 'none';
        document.querySelector('.button--restart').style.display = 'none';

        fields.forEach(field => {
            field.innerText = '';
            field.classList.remove('game-square--disabled')
        });

        this.startGame();
    }

    draw() {
        winnerTag.innerText = `Draw`;
        winnerTag.style.display = 'block';
        playersTurn.innerText = ``;
        document.querySelector('.button--restart').style.display = 'block';
    }

    finishGame() {
        document.querySelector('.button--restart').style.display = 'block';

        winnerTag.innerText = `${this.turnPlayer.name} has won 🎉`;
        winnerTag.style.display = 'block';

        this.turnPlayer.wins = 1;

        document.querySelector(".wins-player-1").innerText = this.player1._wins;
        document.querySelector(".wins-player-2").innerText = this.player2._wins;
    }

    checkIfWon(userVals) {
        let winning = false;

        for (let i = 0; i < this.winnigValues.length; i++) {
            function isTrue(arrToTest, arr) {
                return arr.every(i => arrToTest.includes(i))
            }
            if (isTrue(userVals, this.winnigValues[i])) {
                winning = true;
            }
        }

        return winning;
    }

    selectField(field) {
        field.setAttribute('listener', "false");
        this.maxTurns -= 1;

        if (this.turnPlayer === this.player1) {
            field.innerText = 'X';
        } else {
            field.innerText = 'O';
        }

        field.classList.add('game-square--disabled');

        let gameWon = this.checkIfWon(this.turnPlayer.addField(field));

        if (gameWon) {
            this.finishGame(this.turnPlayer);
            playersTurn.innerText = ``;
        } else {
            if (this.maxTurns <= 0) {
                this.draw();
            } else {
                this.nextPlayer();
                playersTurn.innerText = `It's your turn ${this.turnPlayer.name}`;
            }
        };

    }

    nextPlayer() {
        this.turnPlayer === this.player1 ? this.turnPlayer = this.player2 : this.turnPlayer = this.player1;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.selectedFields = [];
        this._wins = 0;
    };

    get wins() {
        return this._wins;
    }

    set wins(number) {
        this._wins = this._wins + number;
    }

    clearFields() {
        this.selectedFields = [];
    }

    addField(field) {
        this.selectedFields.push(parseInt(field.dataset.val));
        return this.selectedFields;
    };
}

// START GAME
startButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (inputPlayer1.value && inputPlayer1.value) {
        gameMenu.style.display = 'none';
        game = new Game(inputPlayer1.value, inputPlayer2.value);
        gameField.style.display = 'block';
        game.startGame();
    } else {
        document.querySelector('.game-menu__error').classList.add('game-menu__error--active');
    }
})

restartButton.addEventListener('click', function (e) {
    e.preventDefault();
    game.restartGame()
})