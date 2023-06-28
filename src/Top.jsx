import './Top.css';
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Top() {
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
      30,
      70,
    );
    camera.position.set(0, 0, 50);

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // object
    const cubeLoader = new GLTFLoader();
    const cubeWrap = new THREE.Object3D();
    scene.add(cubeWrap);

    cubeLoader.load("/cube/scene.gltf",(gltf)=>{
      const cube = gltf.scene;

      cube.scale.set(0.1, 0.1, 0.1);
      cube.position.set(0,-17,0);

      cubeWrap.add(cube);

    }, undefined, function ( error ) {
      console.error( error );
    });

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // animation
    let frame;

    const animate = () => {
      // FPSを30に下げる
      frame++;
      if (frame % 2 == 0) {
        return;
      }

      cubeWrap.rotation.y -= 0.01;

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
    </>
  )
}

export default Top;
