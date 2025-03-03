const { createApp } = Vue

createApp({
    mounted() {
        window.addEventListener("keydown", this.handleCheatKey);
      },
    data() {
        const randomWord = wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase();
        return {
            letters: Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65)),
            word: randomWord,
            wordShown: randomWord.toUpperCase().replace(/[A-Z]/g, '_'),
            img1: 'img/0.jpg',
            wrongGuesses: 0,
            message: 'Guess the word!',
            time: 0,
            clicks: 0,
            intervall: null,
            first: true,
            scoreboard: sessionStorage.getItem('scoreboard') !== null ? JSON.parse(sessionStorage.getItem('scoreboard')) : [],
            cheat: false
        }
    },
    methods: {
        checkLetter(letter) {
            this.clicks++;
            if (this.first) {
                this.intervall = setInterval(() => { this.time++ }, 1000)
                this.first = false;
            }
            console.log(this.word);
            this.letters = this.letters.filter(l => l != letter);
            if (this.word.includes(letter)) {
                for (let i = 0; i < this.word.length; i++) {
                    if (this.word[i] === letter) {
                        this.wordShown = this.wordShown.slice(0, i) + letter + this.wordShown.slice(i + 1);
                    }
                }

                if (this.word === this.wordShown) {
                    this.message = 'You win! Your score is: ' + this.time;
                    clearInterval(this.time);
                    score = {
                        score: this.time,
                        clicks: this.clicks
                    }
                    this.addScore(score);
                }

            } else {
                this.wrongGuesses++;
                this.img1 = 'img/' + this.wrongGuesses + '.jpg';
                if (this.wrongGuesses === 10) {
                    clearInterval(this.time);
                    this.message = 'You lose!';
                }
            }
        },
        addScore(score) {
            if (sessionStorage.getItem('scoreboard') !== null) {
                this.scoreboard = JSON.parse(sessionStorage.getItem('scoreboard'));
                this.scoreboard.push(score);
                sessionStorage.setItem('scoreboard', JSON.stringify(this.scoreboard));
            } else {
                this.scoreboard.push(score);
                sessionStorage.setItem('scoreboard', JSON.stringify(this.scoreboard));
            }
        },
        handleCheatKey(event) {
            if (event.key === '.') {
                this.cheat = !this.cheat;
            }
        }
    }
    }).mount('#app')