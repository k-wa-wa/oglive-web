import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const drawText = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const mouse = {
    x: -Infinity,
    y: -Infinity,
    radius: 30
  };

  const pixel = 30;
  ctx.fillStyle = "white";
  ctx.font = `${pixel}px Sawarabi Mincho`;
  ctx.fillText("OG Live", 0, pixel, 500);
  const textCoordinates = ctx.getImageData(0, 0, 500, pixel * 2);

  class Particle {
    x: number;
    y: number;
    mode: "text" | "star";
    #initX: number;
    #initY: number;
    #textDestX: number;
    #textDestY: number;
    #starDestX: number;
    #starDestY: number;
    #size = 3;
    #opacity = 1;
    constructor(textDestX: number, textDestY: number) {
      this.#initX = Math.random() * canvas.width;
      this.#initY = Math.random() * canvas.height;
      this.x = this.#initX;
      this.y = this.#initY;
      this.mode = "text";
      const left = canvas.width <= 480 ? 0 : (canvas.width / 10);
      this.#textDestX = textDestX + left;
      this.#textDestY = textDestY;
      this.#starDestX = this.#initX;
      this.#starDestY = this.#initY;
    }
    textToStar() {
      this.mode = "star";
      this.#size = Math.random() * 5;
      this.#opacity = Math.random();
    }
    starToText() {
      this.mode = "text";
      this.#size = 3;
      this.#opacity = 1;
    }
    switchMode() {
      if (this.mode === "star") {
        return this.starToText();
      }
      if (this.mode === "text") {
        return this.textToStar();
      }
    }
    update() {
      if (this.mode === "text") {
        this.#gather();
        this.#mouseEvent();
      }
      if (this.mode === "star") {
        this.#scatter();
        this.#fall();
      }
      this.#draw();
    }
    #draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.#opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.#size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    #mouseEvent() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const maxDistance = mouse.radius;
      if (distance < maxDistance) {
        this.x += dx / distance * 10;
        this.y += dy / distance * 10;
      }
    }
    #gather() {
      const duration = 20;
      const dx = this.#textDestX - this.x;
      const dy = this.#textDestY - this.y;
      if (dx !== 0) {
        this.x += dx / duration;
      }
      if (dy !== 0) {
        this.y += dy / duration;
      }
    }
    #scatter() {
      const duration = 20;
      const dx = this.#starDestX - this.x;
      const dy = this.#starDestY - this.y;
      if (dx !== 0) {
        this.x += dx / duration;
      }
      if (dy !== 0) {
        this.y += dy / duration;
      }
    }
    #fall() {
      this.#starDestY += Math.random();
      if (this.#starDestY > canvas.height) {
        this.y = -1;
        this.#starDestY = 1;
      }
    }
    speedFall() {
      if (Math.random() < 0.5) {
        this.y = -10;
      } else {
        const addY = Math.random() * 1000 + 200;
        this.#starDestY += addY;
        if (this.#starDestY > canvas.height) {
          this.y = -1;
          this.#starDestY = this.#starDestY - canvas.height;
        }
      }
    }
  }

  const particleArray: Particle[] = [];
  const init = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x1 = 0, x2 = textCoordinates.width; x1 < x2; x1++) {
      for (let y1 = 0, y2 = textCoordinates.height; y1 < y2; y1++) {
        const opacity = textCoordinates.data[(y1 * 4 * textCoordinates.width) + (x1 * 4) + 3];
        if (opacity >= 128) {
          particleArray.push(new Particle(x1 * 2, y1 * 2));
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
    }
    window.requestAnimationFrame(() => animate());
  };

  init();
  animate();

  const handleMouse = (event: MouseEvent) => {
    // マウスの動きを検知する
    mouse.x = event.x;
    mouse.y = event.y;
  };
  window.addEventListener("mousemove", handleMouse);

  const handleClick = () => {
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].speedFall();
    }
    /* const rand = Math.random();
    if (rand < 0.5) {
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].speedFall();
      }
    } else if (rand < 0.8) {
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].switchMode();
      }
    } */
  };

  const scrollTrigger = (event: Event) => {
    // スクロールを検知して、Text > Starにする
    if (window.pageYOffset >= 250) {
      event.currentTarget?.removeEventListener(event.type, scrollTrigger);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].textToStar();
      }
      window.addEventListener("click", handleClick);
    }
  };
  window.addEventListener("scroll", scrollTrigger);

  return () => {
    window.removeEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", scrollTrigger);
    window.removeEventListener("click", handleClick);
    canvas.height = 0;
  };
};

export const setPhotoGallery = (
  canvas: HTMLCanvasElement, width: number, height: number, imageList: string[]) => {
  const init = () => {// レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas, alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);//描画サイズ

    // シーンを作成
    const scene = new THREE.Scene();

    //画像を配置
    const setImages = () => {
      // 初期配置
      const initialXYZ = [
        { x: 100, y: 0, z: 100 }, { x: 100, y: 0, z: -100 },
        { x: -100, y: 0, z: 100 }, { x: -100, y: 0, z: -100 }
      ];
      for (let xyz of initialXYZ) {
        const material = new THREE.SpriteMaterial({
          map: new THREE.TextureLoader().load(imageList[Math.floor(Math.random() * imageList.length)]),
        });
        const sprite = new THREE.Sprite(material);
        sprite.position.x = xyz.x;
        sprite.position.y = xyz.y;
        sprite.position.z = xyz.z;
        // スケールを調整
        sprite.scale.set(90, 60, 0);
        scene.add(sprite);
      }
      for (let i = 0; i < 10; i++) {
        //マテリアル作成
        const material = new THREE.SpriteMaterial({
          map: new THREE.TextureLoader().load(imageList[Math.floor(Math.random() * imageList.length)]),
        });
        const sprite = new THREE.Sprite(material);
        // ランダムな座標に配置,中心を原点に持ってくるために「-0.5」(rondomは0〜１なので)
        sprite.position.x = 200 * (Math.random() - 0.5);
        sprite.position.y = 300 * (Math.random() - 0.5);
        sprite.position.z = 200 * (Math.random() - 0.5);
        // スケールを調整
        sprite.scale.set(90, 60, 0);
        scene.add(sprite);
      }
    };
    setImages();

    // 地面を作成
    const plane = new THREE.GridHelper(0, 0, 0x888888, 0x888888);
    scene.add(plane);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(30, width / height);
    camera.position.set(240, 500, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));//原点を見つめる

    const controls = new OrbitControls(camera, canvas);
    // 滑らかにカメラコントローラーを制御する
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    let rot = 0;

    const autoMove = () => {
      rot += 0.3; // 毎フレーム角度を0.5度ずつ足していく
      const radian = (rot * Math.PI) / 180;
      // 角度に応じてカメラの位置を設定
      camera.position.x = 300 * Math.sin(radian);
      camera.position.y = 150 * (Math.cos(radian) + 1.5);
      camera.position.z = 500 * Math.cos(radian);
      camera.lookAt(new THREE.Vector3(0, 0, 0));//原点を見つめる
    };

    let animation: number;
    // 毎フレーム時に実行されるループイベントです
    const tick = () => {
      autoMove();
      controls.update();

      // レンダリング
      renderer.render(scene, camera);
      animation = requestAnimationFrame(tick);
    };

    tick();
  };
  init();

  window.addEventListener('resize', init);
};