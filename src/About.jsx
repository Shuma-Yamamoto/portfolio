import './About.css';
import { useEffect } from 'react';
import * as THREE from 'three';

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
    const camera = new THREE.OrthographicCamera(
      -sizes.width / 160,
      sizes.width / 160,
      sizes.height / 160,
      -sizes.height / 160,
      0,
      1,
    );

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
    async function loadTextures() {
      const textureLoader = new THREE.TextureLoader();

      const pythonTexture = await textureLoader.loadAsync('/skill/python.png');
      const flaskTexture = await textureLoader.loadAsync('/skill/flask.png');
      const railsTexture = await textureLoader.loadAsync('/skill/rails.png');
      const reactTexture = await textureLoader.loadAsync('/skill/react.png');
      const awsTexture = await textureLoader.loadAsync('/skill/aws.png');

      return {
        pythonTexture,
        flaskTexture,
        railsTexture,
        reactTexture,
        awsTexture,
      };
    }

    loadTextures().then((textures) => {
      const { pythonTexture, flaskTexture, railsTexture, reactTexture, awsTexture } = textures;

      const sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
      const scene = new THREE.Scene();

      // Python
      const pythonMaterial = new THREE.MeshLambertMaterial({ map: pythonTexture });
      const python = new THREE.Mesh(sphereGeometry, pythonMaterial);
      python.position.set(0.625, 1.75, -1);
      python.material.transparent = true;
      python.material.opacity = 0;
      scene.add(python);

      // Flask
      const flaskMaterial = new THREE.MeshLambertMaterial({ map: flaskTexture });
      const flask = new THREE.Mesh(sphereGeometry, flaskMaterial);
      flask.position.set(3.75, 1.75, -1);
      flask.material.transparent = true;
      flask.material.opacity = 0;
      scene.add(flask);

      // Rails
      const railsMaterial = new THREE.MeshLambertMaterial({ map: railsTexture });
      const rails = new THREE.Mesh(sphereGeometry, railsMaterial);
      rails.position.set(0.625, -1.375, -1);
      rails.material.transparent = true;
      rails.material.opacity = 0;
      scene.add(rails);

      // React
      const reactMaterial = new THREE.MeshLambertMaterial({ map: reactTexture });
      const react = new THREE.Mesh(sphereGeometry, reactMaterial);
      react.position.set(3.75, -1.375, -1);
      react.material.transparent = true;
      react.material.opacity = 0;
      scene.add(react);

      // AWS
      const awsMaterial = new THREE.MeshLambertMaterial({ map: awsTexture });
      const aws = new THREE.Mesh(sphereGeometry, awsMaterial);
      aws.position.set(6.875, -1.375, -1);
      aws.material.transparent = true;
      aws.material.opacity = 0;
      scene.add(aws);

      // カーソル制御
      const mouse = new THREE.Vector2();

      function updateMouse(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      window.addEventListener('mousemove', updateMouse);

      // 平行光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0.25, 0.5, 1);
      scene.add(directionalLight);

      // フェードイン
      const fadeIn = (object) => {
        let opacity = 0;
        const fadeInFrame = () => {
          opacity += 0.01;
          object.material.opacity = Math.min(opacity, 1);
          renderer.render(scene, camera);

          if (opacity < 1) {
            requestAnimationFrame(fadeInFrame);
          }
        };

        fadeInFrame();
      };

      fadeIn(python);
      fadeIn(flask);
      fadeIn(rails);
      fadeIn(react);
      fadeIn(aws);

      // animation
      let frame;
      const animate = () => {
        // FPSを30に下げる
        frame++;
        if (frame % 2 == 0) {
          return;
        }

        renderer.render(scene, camera);

        // カーソル制御
        const target = new THREE.Vector3(-mouse.x / 60, -mouse.y / 60, 0);
        target.unproject(camera);
        const direction = target.sub(camera.position).normalize();

        python.lookAt(python.position.clone().add(direction));
        flask.lookAt(flask.position.clone().add(direction));
        rails.lookAt(rails.position.clone().add(direction));
        react.lookAt(react.position.clone().add(direction));
        aws.lookAt(aws.position.clone().add(direction));

        requestAnimationFrame(animate);
      };

      animate();

      // resize
      window.addEventListener('resize', () => {
        // size update
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // camera update
        camera.left = -sizes.width / 160;
        camera.right = sizes.width / 160;
        camera.top = sizes.height / 160;
        camera.bottom = -sizes.height / 160;
        camera.updateProjectionMatrix();

        // renderer update
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(window.devicePixelRatio);
      });
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

        <div className='icon-container'>
          <div className='twitter-container'>
            <a href='https://twitter.com/shumai_eng' target="_blank" rel="noopener noreferrer">
              <img src='/contact/twitter.png' className='twitter' />
            </a>
          </div>

          <div className='github-container'>
            <a href='https://github.com/Shuma-Yamamoto' target="_blank" rel="noopener noreferrer">
              <img src='/contact/github.png' className='github' />
            </a>
          </div>
        </div>
      </div>
      <div className='skill-container'>
        <p className='skill'>Skill</p>
      </div>
    </>
  )
}

export default About;
