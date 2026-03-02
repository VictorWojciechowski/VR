AFRAME.registerComponent("kill-on-shot", {
  init() {
    this.el.addEventListener("shot-hit", () => {
      this.el.parentNode?.removeChild(this.el);
    });
  }
});