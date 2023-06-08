import './Works.css';
import { useEffect } from 'react';
import * as THREE from 'three';

function Works() {
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
    camera.position.set(0, 3, 0);

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // grid
    const gridHelper = new THREE.GridHelper(30, 30);
    scene.add(gridHelper);

    // objects
    // 前面
    const textureLoader = new THREE.TextureLoader();
    const texture0 = textureLoader.load('http://localhost:5173/works/talk-image.png');
    const frontMaterial0 = new THREE.MeshBasicMaterial({ map: texture0 });
    const texture1 = textureLoader.load('http://localhost:5173/works/uta-train.png');
    const frontMaterial1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const texture2 = textureLoader.load('http://localhost:5173/works/coming-soon.png');
    const frontMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });

    // 前面以外
    const commonMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });

    const mesh0 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.25), [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial0, commonMaterial]);
    const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.25), [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial1, commonMaterial]);
    const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.25), [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial2, commonMaterial]);
    const mesh3 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.25), [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial2, commonMaterial]);
    const mesh4 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.25), [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial2, commonMaterial]);
    const mesh5 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.25), [commonMaterial, commonMaterial, commonMaterial, commonMaterial, frontMaterial2, commonMaterial]);

    const meshes = [mesh0, mesh1, mesh2, mesh3, mesh4, mesh5];

    meshes.forEach((mesh) => {
      mesh.position.set(0, 3, 0);
      scene.add(mesh);
    });

    // オブジェクトの回転
    let rotationSpeed = 0;           // 回転速度 (radian/frame)
    let currentAngle = -4 * Math.PI; // 現在の回転角度
    let targetAngle = 0;             // 目標の回転角度
    let rotationSmoothness = 0.05;   // 回転の滑らかさ

    const pixelToRadian = 0.00005;   // 変換係数
    const angleStep = Math.PI / 3;   // 一回の回転角度
    const angleThreshold = 0.2;      // 回転角度の閾値

    // スクロールによる回転
    window.addEventListener('wheel', (event) => {
      // スクロール量に応じた回転速度を設定
      rotationSpeed += event.deltaY * pixelToRadian;

      // 現在の回転角度と目標の回転角度の差分を計算
      targetAngle = Math.round(currentAngle / angleStep) * angleStep;
      const deltaRotationAngle = Math.abs(currentAngle - targetAngle);

      // 差分が閾値を超えた場合は一回転する
      if (deltaRotationAngle >= angleThreshold) {
        rotationSmoothness = 0.03
        targetAngle += Math.sign(event.deltaY) * angleStep;
      }
    });

    // 方向キーによる回転
    window.addEventListener('keydown', (event) => {
      rotationSmoothness = 0.07
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        targetAngle += angleStep;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        targetAngle -= angleStep;
      }
    });

    function rot() {
      // 回転角度の増加
      currentAngle += rotationSpeed;

      // 回転速度の減少
      rotationSpeed *= 0.75;

      // 回転を滑らかにする線形補間
      currentAngle = THREE.MathUtils.lerp(currentAngle, targetAngle, rotationSmoothness);

      // オブジェクトの配置
      meshes.forEach((mesh, i) => {
        mesh.lookAt(new THREE.Vector3(0, 3, 0));
        const radius = 7.5;
        const angle = currentAngle - (i * (Math.PI / 3)) + (Math.PI / 2);
        mesh.position.x = radius * Math.cos(-angle);
        mesh.position.z = radius * Math.sin(-angle);
      });

      window.requestAnimationFrame(rot);
    }

    rot();

    // animation
    const animate = () => {
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
    </>
  )
}

export default Works;
