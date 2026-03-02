AFRAME.registerComponent('shooting-target', {

  init: function () {
    this.isAlive = true;

    this.el.setAttribute('animation-mixer', {
      clip: 'Take 001',
      loop: 'once',
      clampWhenFinished: true,
      timeScale: 0
    });

    this.onHit = this.onHit.bind(this);
    const model = this.el.querySelector('[gltf-model]');
    const target = model || this.el;
    target.addEventListener('click', this.onHit);
    this._target = target;
  },

  onHit: function () {
    if (!this.isAlive) return;
    this.isAlive = false;

    this.el.setAttribute('animation-mixer', {
      clip: 'Take 001',
      loop: 'once',
      clampWhenFinished: true,
      timeScale: 1
    });

    setTimeout(() => {
      this.el.remove();
    }, 1500);

    this.el.sceneEl.emit('score-update', { points: 10 });
  },

  remove: function () {
    if (this._target) this._target.removeEventListener('click', this.onHit);
  }
});