AFRAME.registerSystem('game-manager', {

  init: function () {
    this.score = 0;
    this.timer = 0;
    this.killedCount = 0;
    this.skeletonCount = 15;
    this.isGameOver = false;
    this.isVictory = false;
    this.timerInterval = null;
    this.highscores = this.loadHighscores();

    this.onScoreUpdate = this.onScoreUpdate.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
    this.onGameRestart = this.onGameRestart.bind(this);
    this.onSkeletonCount = this.onSkeletonCount.bind(this);

    this.el.addEventListener('score-update', this.onScoreUpdate);
    this.el.addEventListener('game-over', this.onGameOver);
    this.el.addEventListener('game-restart', this.onGameRestart);
    this.el.addEventListener('skeleton-count', this.onSkeletonCount);

    this.startTimer();
  },

  startTimer: function () {
    this.timerInterval = setInterval(() => {
      if (!this.isGameOver && !this.isVictory) {
        this.timer++;
        this.el.emit('hud-update', {
          score: this.score,
          timer: this.timer,
          highscores: this.highscores
        });
      }
    }, 1000);
  },

  stopTimer: function () {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  formatTime: function (seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  },

  loadHighscores: function () {
    const saved = localStorage.getItem('skeleton-highscores');
    return saved ? JSON.parse(saved) : [];
  },

  saveHighscore: function () {
    const entry = {
      score: this.score,
      time: this.formatTime(this.timer),
      date: new Date().toLocaleDateString()
    };
    this.highscores.push(entry);
    this.highscores.sort((a, b) => b.score - a.score);
    this.highscores = this.highscores.slice(0, 5);
    localStorage.setItem('skeleton-highscores', JSON.stringify(this.highscores));
  },

  onSkeletonCount: function (e) {
    this.skeletonCount = e.detail.count;
  },

  onScoreUpdate: function (e) {
    this.score += e.detail.points;
    this.killedCount++;

    this.el.emit('hud-update', {
      score: this.score,
      timer: this.timer,
      highscores: this.highscores
    });

    if (this.killedCount >= this.skeletonCount) {
      this.isVictory = true;
      this.stopTimer();
      this.saveHighscore();
      this.el.emit('game-ended', {
        victory: true,
        score: this.score,
        time: this.formatTime(this.timer),
        highscores: this.highscores
      });
    }
  },

  onGameOver: function () {
    if (this.isGameOver || this.isVictory) return;
    this.isGameOver = true;
    this.stopTimer();
    this.saveHighscore();
    this.el.emit('game-ended', {
      victory: false,
      score: this.score,
      time: this.formatTime(this.timer),
      highscores: this.highscores
    });
  },

  onGameRestart: function () {
    this.score = 0;
    this.timer = 0;
    this.killedCount = 0;
    this.isGameOver = false;
    this.isVictory = false;
    this.highscores = this.loadHighscores();
    this.stopTimer();
    this.startTimer();
  },

  remove: function () {
    this.stopTimer();
    this.el.removeEventListener('score-update', this.onScoreUpdate);
    this.el.removeEventListener('game-over', this.onGameOver);
    this.el.removeEventListener('game-restart', this.onGameRestart);
    this.el.removeEventListener('skeleton-count', this.onSkeletonCount);
  }
});