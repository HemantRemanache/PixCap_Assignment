import {camera,scene,renderer,CreateFloorUsingtexture,SetControls,AddLights } from '../Utilities/InitialSetup.js';
import * as THREE from "three";
init();
animate();
function init() {   
    CreateFloorUsingtexture();
    CreateASpheregeometry();
    CreateACubegeometry();
    SetControls();
    AddLights();
    camera.position.set(0, 0, 10);
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
}
function CreateASpheregeometry() {
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshLambertMaterial({ color: 0x8888ff });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

function CreateACubegeometry(){
    const piece = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true
    });
    const positionAttribute = piece.getAttribute('position');
    const colors = [];
  
    const color = new THREE.Color();
  
    for (let i = 0; i < positionAttribute.count; i += 6) {
  
      color.setHex(0xffffff * Math.random());
  
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
  
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
    } // for
  
    // define the new attribute
    piece.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const cube = new THREE.Mesh(piece, material);
    scene.add(cube);
}
