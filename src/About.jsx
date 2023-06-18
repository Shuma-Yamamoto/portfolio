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
      -sizes.width / 40,
      sizes.width / 40,
      sizes.height / 40,
      -sizes.height / 40,
      0.1,
      100
    );
    camera.position.set(0, 0, 0);

    // renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // objects
    // Python
    const pythonTexture = new THREE.TextureLoader().load('http://localhost:5173/skill/python.png');
    const pythonGeometry = new THREE.SphereGeometry( 4, 64, 32 );
    const pythonMaterial = new THREE.MeshPhysicalMaterial({ map: pythonTexture });
    const python = new THREE.Mesh( pythonGeometry, pythonMaterial );
    python.position.set(2.5, 7, -25);
    scene.add(python);

    // Flask
    const flaskTexture = new THREE.TextureLoader().load('http://localhost:5173/skill/flask.png');
    const flaskGeometry = new THREE.SphereGeometry( 4, 64, 32 );
    const flaskMaterial = new THREE.MeshPhysicalMaterial({ map: flaskTexture });
    const flask = new THREE.Mesh( flaskGeometry, flaskMaterial );
    flask.position.set(15, 7, -25);
    scene.add(flask);

    // Rails
    const railsTexture = new THREE.TextureLoader().load('http://localhost:5173/skill/rails.png');
    const railsGeometry = new THREE.SphereGeometry( 4, 64, 32 );
    const railsMaterial = new THREE.MeshPhysicalMaterial({ map: railsTexture });
    const rails = new THREE.Mesh( railsGeometry, railsMaterial );
    rails.position.set(2.5, -5.5, -25);
    scene.add(rails);

    // React
    const reactTexture = new THREE.TextureLoader().load('http://localhost:5173/skill/react.png');
    const reactGeometry = new THREE.SphereGeometry( 4, 64, 32 );
    const reactMaterial = new THREE.MeshPhysicalMaterial({ map: reactTexture });
    const react = new THREE.Mesh( reactGeometry, reactMaterial );
    react.position.set(15, -5.5, -25);
    scene.add(react);

    // AWS
    const awsTexture = new THREE.TextureLoader().load('http://localhost:5173/skill/aws.png');
    const awsGeometry = new THREE.SphereGeometry( 4, 64, 32 );
    const awsMaterial = new THREE.MeshPhysicalMaterial({ map: awsTexture });
    const aws = new THREE.Mesh( awsGeometry, awsMaterial );
    aws.position.set(27.5, -5.5, -25);
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

    // animation
    const animate = () => {
      renderer.render(scene, camera);

      // カーソル制御
      const target = new THREE.Vector3(-mouse.x, -mouse.y, 0);
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
      camera.left = -sizes.width / 40;
      camera.right = sizes.width / 40;
      camera.top = sizes.height / 40;
      camera.bottom = -sizes.height / 40;
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

        <div className='icon-container'>
          <div className='twitter-container'>
            <a href='https://twitter.com/shumai_eng' target="_blank" rel="noopener noreferrer">
              <img src='http://localhost:5173/contact/twitter.png' className='twitter' />
            </a>
          </div>

          <div className='github-container'>
            <a href='https://github.com/Shuma-Yamamoto' target="_blank" rel="noopener noreferrer">
              <img src='http://localhost:5173/contact/github.png' className='github' />
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
