import './About.css';
import { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

function About() {
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
      75,
      sizes.width / sizes.height,
      0.1,
      100,
    );
    camera.position.set(0, 3, 3);

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // text
    let text;
    const fontLoader = new FontLoader();

    fontLoader.load('http://localhost:5173/fonts/droid_serif_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('A', {
        font: font,
        size: 1.5,
        height: 0.30,
      });

      textGeometry.center();

      const textMaterial = new THREE.MeshNormalMaterial();
      text = new THREE.Mesh(textGeometry, textMaterial);
      text.position.set(2, 3, 0)
      scene.add(text);
    });

    // animation
    const clock = new THREE.Clock();

    const animate = () => {
      renderer.render(scene, camera);

      // text rotation
      const getDelta = clock.getDelta();
      if (text) {
        text.rotation.y += 0.5 * getDelta
      }

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
      <div className='about-container'>
        <p className='about'>About</p>
        <p className='name'>S.Yamamoto</p>
        <p className='bio'>
          学生エンジニアです。<br />
          上智大学 経済学部 経済学科 所属。<br />
          ISFJという論文の大会に出場しています。
        </p>

        <p className='bio'>
          最近はフロントエンドを勉強中。<br />
          プライベートではとにかく面白いものを,<br />
          ビジネスでは誰かの役に立つものを作りたいと思っています。
        </p>

        <p className='bio'>
          趣味は音楽鑑賞とレコーディングです。<br />
          歌声を録音してソフトで編集するといった活動をしています。
        </p>
      </div>
    </>
  )
}

export default About;
