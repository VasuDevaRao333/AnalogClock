const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const digitalTimeElement = document.getElementById('digital-time');
const toggleModeBtn = document.getElementById('toggleModeBtn');
const toggleColorBtn = document.getElementById('toggleColorBtn');
let isAnalogMode = true; // Flag to check if it's in analog mode
let currentBgColor = '#f0f0f0'; // Initial background color

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 20;

// Draw the clock face, hands, and update every second
function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const secondAngle = (Math.PI / 30) * seconds - Math.PI / 2 + (Math.PI / 15000) * milliseconds; // Smooth second hand
    const minuteAngle = (Math.PI / 30) * (minutes + seconds / 60) - Math.PI / 2;
    const hourAngle = (Math.PI / 6) * (hours % 12 + minutes / 60) - Math.PI / 2;

    // Draw clock face with shadow effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw numbers on the clock face
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 1; i <= 12; i++) {
        let angle = (i - 3) * Math.PI / 6;  // Adjust to position numbers correctly
        let x = centerX + radius * 0.85 * Math.cos(angle);
        let y = centerY + radius * 0.85 * Math.sin(angle);
        ctx.fillStyle = '#333';
        ctx.fillText(i, x, y);
    }

    // Draw hour hand
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * 0.5 * Math.cos(hourAngle), centerY + radius * 0.5 * Math.sin(hourAngle));
    ctx.stroke();

    // Draw minute hand
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * 0.7 * Math.cos(minuteAngle), centerY + radius * 0.7 * Math.sin(minuteAngle));
    ctx.stroke();

    // Draw second hand
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * 0.8 * Math.cos(secondAngle), centerY + radius * 0.8 * Math.sin(secondAngle));
    ctx.stroke();

    // Draw center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
}

// Draw the digital time display
function drawDigitalTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    digitalTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Toggle between analog and digital mode
function toggleMode() {
    isAnalogMode = !isAnalogMode;
    if (isAnalogMode) {
        toggleModeBtn.textContent = "Switch to Digital";
    } else {
        toggleModeBtn.textContent = "Switch to Analog";
    }
    updateClock();
}

// Change the background color of the page
function changeBackgroundColor() {
    const colors = ['#f0f0f0', '#3498db', '#2ecc71', '#f39c12', '#e74c3c'];
    currentBgColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = currentBgColor;
}

// Update the clock based on the mode (analog or digital)
function updateClock() {
    if (isAnalogMode) {
        drawClock();
    } else {
        drawDigitalTime();
    }
}

// Update the clock every frame for smooth animation
function animateClock() {
    updateClock();
    requestAnimationFrame(animateClock);
}

// Event listener to toggle between modes
toggleModeBtn.addEventListener('click', toggleMode);

// Event listener for changing background color
toggleColorBtn.addEventListener('click', changeBackgroundColor);

// Initial setup
animateClock();