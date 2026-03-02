AFRAME.registerComponent('show-in-vr', {
  init: function () {
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    if (this.el.sceneEl.is('vr-mode')) {
      this.show();
    } else {
      this.hide();
    }
    this.el.sceneEl.addEventListener('enter-vr', this.show);
    this.el.sceneEl.addEventListener('exit-vr', this.hide);
  },

  hide: function () {
    this.el.object3D.visible = false;
  },

  show: function () {
    this.el.object3D.visible = true;
  },

  remove: function () {
    this.el.object3D.visible = true;
    this.el.sceneEl.removeEventListener('enter-vr', this.show);
    this.el.sceneEl.removeEventListener('exit-vr', this.hide);
  },
});