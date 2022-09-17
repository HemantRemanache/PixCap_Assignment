import * as THREE from "three";
import { OrbitControls } from '../Utilities/OrbitControls.js';
import { GUI } from '../Utilities/lil-gui.module.min.js';
import * as SceneUtils from '../Utilities/SceneUtils.js'
import { FontLoader } from '../Utilities/FontLoader.js';
import { TextGeometry } from '../Utilities/TextGeometry.js';

/* The basic requirement of a three.js setup is a 
1. A scene where we can put objects in
2. A camera which can be used to visualise different objects inside "scene"
3  A renderer which can be used to render out different objects present inside the scene
 */
let camera, scene, renderer, controls;
scene = new THREE.Scene();
let canvas = document.getElementById("canvas");
let width = canvas.clientWidth;
let height = canvas.clientHeight;
camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
scene.add(camera);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000");
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
canvas.appendChild(renderer.domElement);

function CreateFloorUsingtexture() {
    const texture = new THREE.TextureLoader().load('../images/checkerboard.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    // immediately use the texture for material creation
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture });
    const geometry = new THREE.PlaneGeometry(10, 10);
    let floor = new THREE.Mesh(geometry, material);
    floor.position.set(0, -1, 0);
    floor.rotation.x += Math.PI / 2;
    scene.add(floor);
}

function SetControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
}

function AddLights(pos) {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    if (pos)
        directionalLight.position.copy(pos);
    scene.add(directionalLight);
}

function AddPointLight(pos) {
    const light = new THREE.PointLight(0xff0000, 1, 100);
    if (pos)
        light.position.copy(pos);
    else
        light.position.set(0, 5, 0);

    scene.add(light);
    return light;
}

export { AddPointLight, FontLoader, TextGeometry, SceneUtils, GUI, THREE, camera, scene, renderer, controls, CreateFloorUsingtexture, SetControls, AddLights }