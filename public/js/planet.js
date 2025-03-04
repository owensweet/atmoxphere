import * as THREE from "/three/three.module.js";
import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/three/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;

let controls;


let objToRender = 'mercury'

const loader = new GLTFLoader();

loader.load(
    `/images/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); //alpha for transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

controls = new OrbitControls(camera, renderer.domElement)

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender == "mercury" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender == "mercury" ? 5 : 1);
scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);

    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    renderer.render(scene, camera)
}

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
});

//this starts the 3D rendering process
animate();