import * as THREE from "three";

import Experience from "./Experience.js";

export default class Interior {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "interior",
        expanded: true,
      });
    }

    this.setModel();
  }

  setModel() {
    this.model = {};

    this.model.material = new THREE.MeshBasicMaterial();
    this.ambientLight = new THREE.AmbientLight();
    this.light = new THREE.Light(0xffffff, 2);
    this.pointLight = new THREE.DirectionalLight(0xffffff, 1);

    this.model.group = this.resources.items.interior.scene;
    this.model.group.position.set(-1, 0, 0);

    this.model.group.traverse((_child) => {
      if (_child instanceof THREE.Mesh) {
        _child.material = _child.material;
      }
    });

    this.scene.add(this.ambientLight, this.light, this.pointLight);

    this.scene.add(this.model.group);
  }
}
