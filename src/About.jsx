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

    // camera control
    let cursorX = 0;
    let cursorY = 3;
    window.addEventListener('mousemove', (event) => {
      cursorX = event.clientX / sizes.width - 0.5;
      cursorY = event.clientY / sizes.height + 2.5;
      console.log(cursorY);
    });

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // grid
    const gridHelper = new THREE.GridHelper(30, 30);
    scene.add(gridHelper);

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

    // particles
    const particlesGeometry = new THREE.BufferGeometry();

    const particlesCount = 1000;
    const positionArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    const textureLoader = new THREE.TextureLoader();
    const particlesTexture = textureLoader.load('http://localhost:5173/particles.png');

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: '#ffffff',
      transparent: true,
      alphaMap: particlesTexture,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // animation
    const clock = new THREE.Clock();

    const animate = () => {
      renderer.render(scene, camera);

      // text rotation
      const getDelta = clock.getDelta();
      if (text) {
        text.rotation.y += 0.5 * getDelta
      }

      // camera control
      camera.position.x = cursorX;
      camera.position.y = cursorY;

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
      <main>
        <div>
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
      </main>
    </>
  )
}

export default About;
