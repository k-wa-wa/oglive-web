
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