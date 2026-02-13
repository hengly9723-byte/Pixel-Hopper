const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let bird = {
    x: 80,
    y: 300,
    radius: 15,
    velocity: 0,
    gravity: 0.5,   // slower gravity
    jump: -8         // softer jump
};

let pipes = [];
let pipeWidth = 60;
let pipeGap = 200;   // bigger gap (EASIER)
let pipeSpeed = 3; // slower pipes

let score = 0;
let gameOver = false;

// Jump controls
document.addEventListener("keydown", () => {
    if (!gameOver) bird.velocity = bird.jump;
});

canvas.addEventListener("click", () => {
    if (!gameOver) bird.velocity = bird.jump;
});

// Keyboard
document.addEventListener("keydown", () => {
    if (!gameOver) bird.velocity = bird.jump;
});

// Mouse click
canvas.addEventListener("click", () => {
    if (!gameOver) bird.velocity = bird.jump;
});

// Mobile touch (ADD THIS)
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (!gameOver) bird.velocity = bird.jump;
});

// Create pipe every 2 seconds
setInterval(() => {
    if (!gameOver) {
        let topHeight = Math.random() * 250 + 50;
        pipes.push({
            x: canvas.width,
            topHeight: topHeight,
            counted: false
        });
    }
}, 2000);

// Draw bird
function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

// Draw pipes
function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(
            pipe.x,
            pipe.topHeight + pipeGap,
            pipeWidth,
            canvas.height
        );
    });
}

// Update pipes
function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

        // Score (only count once)
        if (!pipe.counted && pipe.x + pipeWidth < bird.x) {
            score++;
            pipe.counted = true;
        }

        // Simple collision
        if (
            bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + pipeWidth &&
            (
                bird.y - bird.radius < pipe.topHeight ||
                bird.y + bird.radius > pipe.topHeight + pipeGap
            )
        ) {
            endGame();
        }
    });

    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}

function endGame() {
    gameOver = true;
    document.getElementById("finalScore").textContent = "Score: " + score;
    document.getElementById("gameOverScreen").classList.remove("hidden");
}

function restartGame() {
    bird.y = 300;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    document.getElementById("gameOverScreen").classList.add("hidden");
}

function loop() {
    if (!gameOver) {
   // update game
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
        endGame();
    }

    updatePipes();
    drawPipes();
    drawBird();

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 20, 40);

    requestAnimationFrame(loop);
}

loop();