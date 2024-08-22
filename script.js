const canvas = document.getElementById('spriteCanvas');
const ctx = canvas.getContext('2d');

// Load the spritesheet
const spriteSheet = new Image();
spriteSheet.src = 'planet.png'; // Change this to your actual spritesheet

// Load the background image
const spriteSheet = new Image();
spriteSheet.src = 'space.jpg'; // Use a test image
spriteSheet.onload = function() {
    ctx.drawImage(spriteSheet, 0, 0, 200, 200); // Draw a simple image
};


// Variables for animation
const totalFrames = 50;  // Total frames in the spritesheet
const frameWidth = 64;   // Width of each frame in the spritesheet
const frameHeight = 64;  // Height of each frame in the spritesheet
let currentFrame = 0;
const fps = 10;          // Frames per second
const frameDuration = 1000 / fps;  // Duration of each frame in milliseconds

// Scaling the sprite to be larger
const scale = 4;  // Scale factor for making the sprite larger
const scaledWidth = frameWidth * scale;
const scaledHeight = frameHeight * scale;

let lastTime = 0;

function animate(timestamp) {
    // Calculate the time difference
    const deltaTime = timestamp - lastTime;

    // Update the frame if the time passed is greater than the frame duration
    if (deltaTime > frameDuration) {
        lastTime = timestamp;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the background image to fill the entire canvas
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Calculate the x and y position of the sprite on the canvas to center it
        const canvasCenterX = (canvas.width - scaledWidth) / 2;
        const canvasCenterY = (canvas.height - scaledHeight) / 2;

        // Draw the current frame of the sprite
        const xPos = (currentFrame % (spriteSheet.width / frameWidth)) * frameWidth;
        const yPos = Math.floor(currentFrame / (spriteSheet.width / frameWidth)) * frameHeight;

        // Draw the sprite frame scaled and centered on the canvas
        ctx.drawImage(spriteSheet, xPos, yPos, frameWidth, frameHeight, canvasCenterX, canvasCenterY, scaledWidth, scaledHeight);

        // Update to the next frame
        currentFrame = (currentFrame + 1) % totalFrames;
    }

    requestAnimationFrame(animate);
}

// Start animation once both images are loaded
Promise.all([
    new Promise(resolve => spriteSheet.onload = resolve),
    new Promise(resolve => backgroundImage.onload = resolve)
]).then(() => {
    requestAnimationFrame(animate);
});
