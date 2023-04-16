import * as THREE from 'three';
import "./style.css";
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// First thing we do is to create a scene
// Scene is a basically 

const scene = new THREE.Scene();

// Creating the sphere
// This is the just the structure(shape)
// Creating geometry of the sphere
const geometry = new THREE.SphereGeometry(2.6, 64, 64);

// Creating material(Basically how it appears)
const material = new THREE.MeshStandardMaterial({
  color: 'aqua',
  roughness: .5
});

// Mesh is the combination of the geometry and material which will be combined together and shows the model
const mesh = new THREE.Mesh(geometry, material);

// Then adding mesh to the scene to actually see it
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//light
// Setting up the light for the camera
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 7, 10);
light.intensity = 1.24
scene.add(light);

// Camera 
// Its how we should be able to see the model or the object
// This is bascially like a view of the camera(as the name suggest camera)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 15;
scene.add(camera);


// Renderer
// Rendering all these in the index.html
const canvas = document.querySelector(".webgl");
// Creating a renderer const
const renderer = new THREE.WebGL1Renderer({ canvas });

// Setting the size of the renderer
// This defines how big the object or model should look like
renderer.setSize(sizes.width, sizes.height);

// Now actually rendering the object by .render method
renderer.render(scene, camera);

renderer.setPixelRatio(2);



// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;



// Resize
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();


// Timeline
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {1:0, x:0, y:0}, {z:1, x:1, y:1});
tl.fromTo('nav', {y: '-100%'}, {y: '0%'});
tl.fromTo('title', {opacity: 0}, {opacity: 1});


// Mouse animation color
let mouseDown = false;
let rgb = [12, 23, 55];
window.addEventListener('mousedown', ()=> (mouseDown = true));
window.addEventListener('mouseup', ()=> (mouseDown = false));

window.addEventListener('mousemove', (e) =>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]
    // Animating
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b});
  }
});
