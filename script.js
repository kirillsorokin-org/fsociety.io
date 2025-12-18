
  window.onload = function() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  let active = false;
  const ground = 120;
  let hacker = { x: 50, y: ground, w: 30, h: 30, vy: 0 };
  let corp = { x: 800, y: ground, w: 30, h: 30 };
  const gravity = 1;

  function loop() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hacker.vy += gravity;
    hacker.y += hacker.vy;
    if (hacker.y > ground) { hacker.y = ground; hacker.vy = 0; }

    corp.x -= 5;
    if (corp.x < -corp.w) corp.x = canvas.width;

    if (
      hacker.x < corp.x + corp.w &&
      hacker.x + hacker.w > corp.x &&
      hacker.y < corp.y + corp.h &&
      hacker.y + hacker.h > corp.y
    ) { active = false; alert("Corporation Z caught you!"); }

    ctx.fillStyle = "#0f0";
    ctx.fillRect(hacker.x, hacker.y, hacker.w, hacker.h);
    ctx.fillStyle = "red";
    ctx.fillRect(corp.x, corp.y, corp.w, corp.h);

    requestAnimationFrame(loop);
  }

  canvas.addEventListener("click", () => { active = true; canvas.focus(); loop(); });
  canvas.tabIndex = 1000;

  document.addEventListener("keydown", e => {
    if (!active) return;
    if (e.code === "Space" && hacker.y >= ground - 0.1) {
      e.preventDefault();
      hacker.vy = -15;
      hacker.y = ground;
    }
  });
};
