import './Top.css';
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Top() {
  useEffect(() => {
    const chars = document.querySelectorAll('.char');

    let delay = 1500;

    chars.forEach((char) => {
      setTimeout(() => {
        char.classList.add('fade-in');
      }, delay);
      delay += 150;
    });
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('canvas');

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    }

    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(
      70,
      sizes.width / sizes.height,
      0.5,
      1.5,
    );
    camera.position.set(0, 0, 0);

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        alpha: true,
        premultipliedAlpha: false,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // object
    const displayLoader = new GLTFLoader();
    const displayWrap = new THREE.Object3D();
    scene.add(displayWrap);

    displayLoader.load("/display/scene.gltf",(gltf)=>{
      const display = gltf.scene;

      display.scale.set(3, 3, 3);
      display.position.set(0,-0.55,-1);

      displayWrap.add(display);

    }, undefined, function ( error ) {
      console.error( error );
    });

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0.425, 0.425, 1);
    scene.add(directionalLight);

    // animation
    let frame;

    const animate = () => {
      // FPSを30に下げる
      frame++;
      if (frame % 2 == 0) {
        return;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // resize
    window.addEventListener('resize', () => {
      // size update
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // camera update
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // renderer update
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }, []);

  return (
    <>
      <canvas id='canvas'></canvas>
      <div className='top-container'>
        <p className='top'>S.Yamamoto</p>
      </div>
      <div className='text-container'>
        <div className="text-animation">
          <span className="char">H</span>
          <span className="char">e</span>
          <span className="char">l</span>
          <span className="char">l</span>
          <span className="char">o</span>
          <span className="char">,</span>
          <span className="char"> </span>
          <span className="char">W</span>
          <span className="char">o</span>
          <span className="char">r</span>
          <span className="char">l</span>
          <span className="char">d</span>
          <span className="char">.</span>
          <br />
          <span className="char">I</span>
          <span className="char">'</span>
          <span className="char">m</span>
          <span className="char"> </span>
          <span className="char">a</span>
          <span className="char"> </span>
          <span className="char">w</span>
          <span className="char">e</span>
          <span className="char">b</span>
          <span className="char"> </span>
          <span className="char">e</span>
          <span className="char">n</span>
          <span className="char">g</span>
          <span className="char">i</span>
          <span className="char">n</span>
          <span className="char">e</span>
          <span className="char">e</span>
          <span className="char">r</span>
          <span className="char">.</span>
        </div>
      </div>
    </>
  )
}

export default Top;
