import { camera, scene, renderer, CreateFloorUsingtexture, SetControls, AddLights } from '../Utilities/InitialSetup.js';
import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let SelectedObject;
init();
animate();
function init() {
  CreateFloorUsingtexture();
  CreateACubegeometry();
  CreateACylinderGeometry();
  CreateIcoSphereGeometry();
  SetControls();
  AddLights();
  camera.position.set(0, 0, 10);
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera);
}

function CreateACubegeometry() {
  const piece = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffad34 });
  const cube = new THREE.Mesh(piece, material);
  scene.add(cube);
}

function CreateACylinderGeometry() {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.name = "Cylinder";
  cylinder.position.set(4, 0, 0)
  scene.add(cylinder);
}

function CreateIcoSphereGeometry() {
  const geometry = new THREE.IcosahedronGeometry(1, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.name = "Cylinder";
  cylinder.position.set(-4, 0, 0)
  scene.add(cylinder);
}

function UpdateBoxGeometry() {
  let boxparams = getBoxGeometryParametersFromUI();
  CreateNewBoxGeometryWithNewParameters(boxparams);
}

function getBoxGeometryParametersFromUI() {
  let length, width, height;
  length = parseFloat(document.getElementById("length").value);
  width = parseFloat(document.getElementById("width").value);
  height = parseFloat(document.getElementById("height").value);
  return { length, width, height };
}

function CreateNewBoxGeometryWithNewParameters(params) {
  let geometry;
  if (!SelectedObject) {
    console.log("Nothing selected");
  }
  else {
    if ("BoxGeometry" == SelectedObject.geometry.type) {
      geometry = new THREE.BoxGeometry(params.length, params.height, params.width);
    }
    else if ("CylinderGeometry" == SelectedObject.geometry.type) {

    }
    else if ("IcosahedronGeometry" == SelectedObject.geometry.type) {

    }
  }
  SelectedObject.geometry.dispose()
  SelectedObject.geometry = geometry.clone();
}

document.getElementById("canvas").onclick = function (e) {

  let rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;


  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {

    intersects[i].object.material.color.set(0xff0000);

    document.getElementById("BoxGeometryForm").style.display = "none";
    document.getElementById("CylinderGeometryForm").style.display = "none";
    document.getElementById("IsoHedronGeometryForm").style.display = "none";
    if ("BoxGeometry" == intersects[i].object.geometry.type) {
      SelectedObject = intersects[i].object;
      document.getElementById("BoxGeometryForm").style.display = "block";
    }
    else if ("CylinderGeometry" == intersects[i].object.geometry.type) {
      SelectedObject = intersects[i].object;
      document.getElementById("CylinderGeometryForm").style.display = "block";
    }
    else if ("IcosahedronGeometry" == intersects[i].object.geometry.type) {
      SelectedObject = intersects[i].object;
      document.getElementById("IsoHedronGeometryForm").style.display = "block";
    }
    else {
      SelectedObject = undefined;
    }
  }
}

document.getElementById("SubmitNewDataForBoxGeometry").onclick = function (e) {
  UpdateBoxGeometry();
}

document.getElementById("length").onclick = function () {
  document.getElementById("lengthValue").innerHTML = document.getElementById("length").value;
}

document.getElementById("width").onclick = function () {
  document.getElementById("widthValue").innerHTML = document.getElementById("width").value;
}

document.getElementById("height").onclick = function () {
  document.getElementById("heightValue").innerHTML = document.getElementById("height").value;
}