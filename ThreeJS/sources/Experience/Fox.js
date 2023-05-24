import * as THREE from "three";

import Experience from "./Experience.js";

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "fox",
        expanded: true,
      });
    }

    this.setModel();
  }

  setModel() {
    this.model = {};

    this.model.group = this.resources.items.fox.scene.children[0];

    this.ambientLight = new THREE.AmbientLight();
    this.model.material = new THREE.MeshBasicMaterial();
    console.log(this.model.group);

    this.model.group.traverse((_child) => {
      if (_child instanceof THREE.Mesh) {
        _child.material = _child.material;
      }
      if (_child instanceof THREE.SkinnedMesh) {
        _child.material = _child.material;
      }
      if (_child instanceof THREE.Bone) {
        _child.material = _child.material;
      }
    });

    this.model.group.scale.set(100, 100, 100);

    this.model.group.position.set(-1, 0, 2);

    this.scene.add(this.model.group, this.ambientLight);
  }
}
