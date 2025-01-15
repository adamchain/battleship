// gridRemaining.js

// Store the shots taken
const shotsTaken = new Set();

// Add a shot to the record
export function addShot(squareId) {
    if (!squareId || typeof squareId !== 'string') {
        console.error('Invalid square ID:', squareId);
        return;
    }
    shotsTaken.add(squareId);
}

// Check if a square has already been shot at
export function isShotTaken(squareId) {
    if (!squareId || typeof squareId !== 'string') {
        console.error('Invalid square ID:', squareId);
        return true; // Treat invalid IDs as already shot
    }
    return shotsTaken.has(squareId);
}

// Get all shots taken so far
export function getShotsTaken() {
    return Array.from(shotsTaken);
}

// Clear all recorded shots (for reset functionality)
export function resetShots() {
    shotsTaken.clear();
}

// Debugging utility
export function logShotsTaken() {
    console.log('Shots taken:', getShotsTaken());
}
