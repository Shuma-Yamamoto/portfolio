import './Works.css';
import Detail from './Detail';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Works() {
  const workIndex = useRef(0);
  const [workZero, setWorkZero] = useState(false);
  const [workOne, setWorkOne] = useState(false);
  const [workTwo, setWorkTwo] = useState(false);

  // スライドの読み込み
  const talkImageSlides = [
    '/talk_image_slides/1.png',
    '/talk_image_slides/2.png',
    '/talk_image_slides/3.png',
  ];

  const utaTrainSlides = [
    '/uta_train_slides/1.png',
    '/uta_train_slides/2.png',
    '/uta_train_slides/3.png',
  ];

  const portfolioSiteSlides = [
    '/portfolio_site_slides/1.png',
    '/portfolio_site_slides/2.png',
    '/portfolio_site_slides/3.png',
    '/portfolio_site_slides/4.png',
    '/portfolio_site_slides/5.png',
  ];

  // クリックによるインデックスの更新
  const clickArrowRight = () => {
    if (workIndex.current === 5) {
      workIndex.current = 0;
    } else {
      workIndex.current += 1;
    }
  };

  const clickArrowLeft = () => {
    if (workIndex.current === 0) {
      workIndex.current = 5;
    } else {
      workIndex.current -= 1;
    }
  };

  // スライドを表示する
  const openModal = () => {
  switch (workIndex.current) {
    case 0:
      setWorkZero(true);
      break;
    case 1:
      setWorkOne(true);
      break;
    case 2:
      setWorkTwo(true);
      break;
    default:
      break;
    }
  };


  // スライドを非表示にする
  const closeModal = () => {
    setWorkZero(false);
    setWorkOne(false);
    setWorkTwo(false);
  };

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
      3,
      30,
    );
    camera.rotation.z = -Math.PI / 18;
    camera.position.set(0, 0, 15);

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        alpha: true,
        premultipliedAlpha: false,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // objects
    const textureLoader = new THREE.TextureLoader();
    const texture0 = textureLoader.load('/works/talk-image.png');
    const frontMaterial0 = new THREE.MeshBasicMaterial({ map: texture0 });
    const texture1 = textureLoader.load('/works/uta-train.png');
    const frontMaterial1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const texture2 = textureLoader.load('/works/portfolio-site.png');
    const frontMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });
    const texture3 = textureLoader.load('/works/coming-soon.png');
    const frontMaterial3 = new THREE.MeshBasicMaterial({ map: texture3 });

    const boxGeometry = new THREE.BoxGeometry(3, 3, 0.25);
    const sideMaterial0 = new THREE.MeshBasicMaterial({ color: 0x06c755 });
    const sideMaterial1 = new THREE.MeshBasicMaterial({ color: 0x187fc4 });
    const sideMaterial2 = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const commonMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });

    const mesh0 = new THREE.Mesh(boxGeometry, [sideMaterial0, sideMaterial0, sideMaterial0, sideMaterial0, frontMaterial0, sideMaterial0]);
    const mesh1 = new THREE.Mesh(boxGeometry, [sideMaterial1, sideMaterial1, sideMaterial1, sideMaterial1, frontMaterial1, sideMaterial1]);
    const mesh2 = new THREE.Mesh(boxGeometry, [sideMaterial2, sideMaterial2, sideMaterial2, sideMaterial2, frontMaterial2, sideMaterial2]);
    const mesh3 = new THREE.Mesh(boxGeometry, [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial3, commonMaterial]);
    const mesh4 = new THREE.Mesh(boxGeometry, [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial3, commonMaterial]);
    const mesh5 = new THREE.Mesh(boxGeometry, [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial3, commonMaterial]);

    const meshes = [mesh0, mesh1, mesh2, mesh3, mesh4, mesh5];

    meshes.forEach((mesh) => {
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, -Math.PI / 18);
      scene.add(mesh);
    });

    // オブジェクトの回転
    let rotationSpeed = 0;           // 回転速度 (radian/frame)
    let currentAngle = -4 * Math.PI; // 現在の回転角度
    let targetAngle = 0;             // 目標の回転角度
    let rotationSmoothness = 0.045;  // 回転の滑らかさ
    const angleStep = Math.PI / 3;   // 一回の回転角度

    // クリックによる回転
    const rotationRight = () => {
      rotationSmoothness = 0.07;
      targetAngle += angleStep;
    };
    const arrowRightElement = document.querySelector('.arrow-right');
    arrowRightElement.addEventListener('click', rotationRight);

    const rotationLeft = () => {
      rotationSmoothness = 0.07;
      targetAngle -= angleStep;
    };
    const arrowLeftElement = document.querySelector('.arrow-left');
    arrowLeftElement.addEventListener('click', rotationLeft);

    function rot() {
      // 回転角度の増加
      currentAngle += rotationSpeed;

      // 回転速度の減少
      rotationSpeed *= 0.75;

      // 回転を滑らかにする線形補間
      currentAngle = THREE.MathUtils.lerp(currentAngle, targetAngle, rotationSmoothness);

      // オブジェクトの配置
      meshes.forEach((mesh, i) => {
        const radius = 10;
        const angle = currentAngle - (i * (Math.PI / 3)) + (Math.PI / 2);
        mesh.position.x = radius * Math.cos(angle);
        mesh.position.z = radius * Math.sin(angle);
      });

      window.requestAnimationFrame(rot);
    }

    rot();

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
      <div className='works-container'>
        <p className='works'>Works</p>
      </div>
      <div className='detail-container'>
        <img src='/works/arrow.png' className='arrow-left' onClick={clickArrowLeft} />
        <p className='detail' onClick={openModal}>detail</p>
        <img src='/works/arrow.png' className='arrow-right' onClick={clickArrowRight} />
      </div>
      <div>
        <div className={`fade-in ${workZero ? 'visible' : ''}`}>
          <Detail workState={workZero} workIndex={workIndex.current} slides={talkImageSlides} closeModal={closeModal} />
        </div>
        <div className={`fade-in ${workOne ? 'visible' : ''}`}>
          <Detail workState={workOne} workIndex={workIndex.current} slides={utaTrainSlides} closeModal={closeModal} />
        </div>
        <div className={`fade-in ${workTwo ? 'visible' : ''}`}>
          <Detail workState={workTwo} workIndex={workIndex.current} slides={portfolioSiteSlides} closeModal={closeModal} />
        </div>
      </div>
    </>
  )
}

export default Works;
