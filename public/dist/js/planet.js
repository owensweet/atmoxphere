import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertexShade from '../shaders/vertex.glsl'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;

let controls;

let mouseX = 0;
let mouseY = 0;

let objToRender = 'mercury_enhanced_color'

const loader = new GLTFLoader();
const objectGroup = new THREE.Group();
scene.add(objectGroup);

//Object loader
loader.load(
    `/images/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;

        //Get the exact center of the object using a bounding box
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());

        object.position.sub(center);
        
        scene.add(object);
        objectGroup.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer(
    {
        alpha: true, //alpha for transparent background 
        antiAlias: true
    }); 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//Set camera position
camera.position.z = objToRender == 35
camera.position.set(0, 0, 5)

//Setup controls with renderer and camera
controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false;
controls.enablePan = false;
controls.enableRotate = false;

document.getElementById("container3D").appendChild(renderer.domElement);


//Setting up the lights
const topLight = new THREE.DirectionalLight(0xffffff, 7);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 20);
scene.add(ambientLight);


//Physics functions
function animate() {
    requestAnimationFrame(animate);

    if (objectGroup) {
        objectGroup.rotation.y += 0.005;
    }

    controls.update()
    renderer.render(scene, camera)
}

//Handling window resize
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
});

//This starts the 3D rendering process
animate();