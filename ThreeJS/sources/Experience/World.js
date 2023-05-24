import * as THREE from "three";
import Experience from "./Experience.js";
import Fox from "./Fox.js";
import Interior from "./Interior.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setInterior();
      }
    });
  }

  setInterior() {
    this.Interior = new Interior();
  }

  setFox() {
    this.Fox = new Fox();
  }

  resize() {}

  update() {}

  destroy() {}
}
