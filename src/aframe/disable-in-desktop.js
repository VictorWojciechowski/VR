AFRAME.registerComponent('disable-in-desktop', {
  multiple: true,

  schema: {
    // The component name to disable in VR/AR
    component: {type: 'string', default: ''},
    // Set this to true if you want to disable the component in flat 3d (desktop fullscreen mode of A-Frame)
    disableInFlat3d: {type: 'boolean', default: false},
    disableInAR: {type: 'boolean', default: true},
  },

  init: function () {
    this.disable = this.disable.bind(this);
    this.enable = this.enable.bind(this);
    this.setLastState();
//console.log('disable-in-desktop init', this.el.sceneEl.is('vr-mode'), this.el.sceneEl.is('ar-mode'), this.data.disableInAR);

    if (this.el.sceneEl.is('vr-mode') || (this.data.disableInAR && this.el.sceneEl.is('ar-mode'))) {
      
      this.enable();
    } else {
      this.disable();
    }
    this.el.sceneEl.addEventListener('enter-vr', this.enable);
    this.el.sceneEl.addEventListener('exit-vr', this.disable);
  },

  setLastState: function () {
    this.lastState = this.el.getAttribute(this.data.component)?.enabled;
    if (this.lastState === undefined) {
      throw new Error('Component not found or have no enabled property');
    }
  },

  getLastState: function () {
    const testComponent = this.el.getAttribute(this.data.component)?.enabled;
    if (testComponent === undefined) {
      throw new Error('Component not found or have no enabled property');
    }
    return this.lastState;
  },

  disable: function () {
    const isTrueVrOrAr = AFRAME.utils.device.checkHeadsetConnected() || (this.data.disableInAR && this.el.sceneEl.is('ar-mode'));
    if (isTrueVrOrAr) return;
    this.setLastState();
    this.el.setAttribute(this.data.component, 'enabled', false);
    this.el.emit('componentdisabled', {name: this.data.component});
  },

  enable: function () {
    this.el.setAttribute(this.data.component, 'enabled', this.getLastState());
  },

  remove: function () {
    this.el.setAttribute(this.data.component, 'enabled', this.getLastState());
    this.el.sceneEl.removeEventListener('enter-vr', this.enable);
    this.el.sceneEl.removeEventListener('exit-vr', this.disable);
  },

});