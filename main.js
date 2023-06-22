import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as UtilsJs from './js/Utils.js';
var tipDialog = document.getElementById('tip-view dialog');
const loadingScene = document.createElement('div');
window.addEventListener('DOMContentLoaded', (event) => {
    loadingScene.style.width = '100%';
    loadingScene.style.height = '100%';
    loadingScene.style.position = 'absolute';
    loadingScene.style.display = 'flex';
    loadingScene.style.flexDirection = 'column';
    loadingScene.style.justifyContent = 'center';
    loadingScene.style.alignItems = 'center';

    const loadingLogo = document.createElement('img');
    loadingLogo.src = './assets/Logo.png';
    loadingLogo.style.width = '15%';
    loadingLogo.style.margin = '24px';
    loadingScene.appendChild(loadingLogo);
    

    const loadingText = document.createElement('label');
    loadingText.innerText = 'Loading...';
    loadingText.style.fontSize = '64px';
    loadingText.style.margin = '36px';
    loadingText.style.color = 'antiquewhite';
    loadingText.style.fontFamily = '\'Bebas Neue\', sans-serif';
    loadingScene.appendChild(loadingText);
    const progressBar = document.createElement('div');
    progressBar.style.width = '300px';
    progressBar.style.height = '10px';
    progressBar.style.backgroundColor = '#f1f1f1';
    progressBar.style.borderRadius = '10px';
    progressBar.style.overflow = 'hidden';

    const progressElement = document.createElement('div');
    progressElement.style.height = '100%';
    progressElement.style.backgroundColor = 'antiquewhite';
    progressElement.style.width = '0';
    progressElement.style.transition = 'width 0.3s ease-in-out';

    progressBar.appendChild(progressElement);
    loadingScene.appendChild(progressBar);
    document.body.appendChild(loadingScene);

    function startProgress() {
        let progress = 0;
        const intervalId = setInterval(() => {
            progress += 5;
            progressElement.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(intervalId);
            }
        }, 50);
    }

    startProgress();
});

tipDialog.hidden = true;

const slider = document.getElementById("myRange");
const timeProgress = document.getElementById('progress');
const sliderMax = slider.max;
slider.value = sliderMax / 10;

slider.oninput = function () {
    if (actor != null) {
        actor.props.scaleTime = this.value / 10;
    }
    timeProgress.innerHTML = this.value / 10;
};



loadAllModel();
document.body.addEventListener('keydown', keyPress, false);
document.body.addEventListener('keyup', keyRelease, false);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
scene.background = new THREE.Color(0x85A9FF);


function loadAllModel() {
    let loader = new FBXLoader();
    UtilsJs.loadTextures();
    UtilsJs.fbxMapPaths.forEach(function (path) {
        loader.load(path, function (object) {
            UtilsJs.loadModel(object, UtilsJs.modelMapping);
            object.scale.set(0.1, 0.1, 0.1);
            scene.add(object);
            UtilsJs.fbxActorPaths.forEach(function (path) {
                loader.load(path, function (object) {
                    UtilsJs.loadModel(object, UtilsJs.actorMapping);
                    object.scale.set(0.1, 0.1, 0.1);
                    UtilsJs.listModelObject[UtilsJs.fbxActorPaths.indexOf(path)] = object;
                    if (UtilsJs.fbxActorPaths.indexOf(path) === UtilsJs.fbxActorPaths.length - 1) {
                        loadingScene.classList.add('fade-out');
                        let timeout = setTimeout(function () {
                            document.body.removeChild(loadingScene);
                            loadingScene.classList.add('hidden');
                            document.body.appendChild(renderer.domElement);
                            tipDialog.hidden = false;
                            clearTimeout(timeout);
                            setupData();
        
                        }, 100);
        
                    }
                })
            });
            
        })

    });
    

}
let actor;

function setupData() {
    //do something
    scene.add(UtilsJs.listModelObject[UtilsJs.listModelObject.length - 1]);
}


controls.update();
function animate() {
    requestAnimationFrame(animate.bind(this));
    controls.update();
    renderer.render(scene, camera);

}
animate();

function keyPress(e) {
    //do nothing

}

function keyRelease(e) {

    //do nothing
} 