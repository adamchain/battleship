import { generateRandomId, p2setup, randomShipSetup, p2TakeShot } from '../modules/p2.js';
import { addShot, isShotTaken, logShotsTaken, resetShots } from '../modules/gridRemaining.js';
import { addShips, checkShipHit, checkSunkShips, endGame, logShips, playerShips } from '../modules/ships.js';
import { currentTurn, updateTurn, updateStateDisplay } from '../modules/state.js';

console.log("Generated Random ID:", generateRandomId());
generateRandomId();
p2setup();
console.log("Generated Random ID:", generateRandomId()); // 'p1' for Player 1, 'p2' for Player 2
//let currentTurn = 'p1';
// Main game setup function
export function p1p2Setup() {
    const p1Name = 'Adam';
    const p2Name = 'Virtual Remus';

    // Define Player 1's ships
    const p1Ship2 = ['C2', 'D2'];
    const p1Ship3 = ['B4', 'B5', 'B6'];
    const p1Ship4 = ['D1', 'E1', 'F1', 'G1'];
    const p1Ship6 = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'];
    const p1ShipsAll = [...p1Ship2, ...p1Ship3, ...p1Ship4, ...p1Ship6];

    // Randomize Player 2's ships
    const p2Ships = randomShipSetup();
    const p2ShipsAll = p2Ships.flatMap(ship => ship[1]); // Flatten ship positions

    console.log("Player 2 Ships:", p2Ships);

    // Register the ships for each player
    addShips('p1', p1ShipsAll); // Add Player 1's ships to playerShips
    addShips('p2', p2ShipsAll); // Add Player 2's ships to playerShips

    // Log ships for debugging
    logShips();

    // Initialize the game and grid
    initializeGame(p1Name, p2Name, p1ShipsAll, p2ShipsAll);
    setupGrid(p1Name, p2Name, p1ShipsAll, p2ShipsAll, [], []); // Empty arrays for shots
    setupResetButton([], []);
}

// Setup the game grid
export function setupGrid(p1Name, p2Name, p1ShipsAll, p2ShipsAll, p1Shots, p2Shots) {
    const gridContainer = document.getElementById('gridContainer');
    const rows = 15;
    const cols = 15;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, cols);

    if (!gridContainer) {
        console.error('Grid container not found in DOM');
        return;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const square = document.createElement('div');
            square.classList.add('square');

            const columnLetter = letters[j];
            const rowNumber = i + 1;
            square.id = `${columnLetter}${rowNumber}`;
            square.textContent = square.id;
            gridContainer.appendChild(square);

            square.addEventListener('click', () => {
                handleSquareClick(square, p1ShipsAll, p2ShipsAll, p1Shots, p2Shots);
            });
        }
    }
}

// Initialize game state
export function initializeGame(p1Name, p2Name, p1ShipsAll, p2ShipsAll) {
    console.log('Game Initialized');
    console.log(`Player 1: ${p1Name}`);
    console.log(`Player 2: ${p2Name}`);
    console.log('Player 1 Ships:', p1ShipsAll);
    console.log('Player 2 Ships:', p2ShipsAll);
    updateStateDisplay();
}

export function handleSquareClick(square, p1Shots, p2Shots) {
    const shotTaken = square.id;

    // Prevent duplicate shots
    if (isShotTaken(shotTaken)) {
        console.log(`Shot at ${shotTaken} already taken.`);
        return;
    }

    // Add the shot to the record
    addShot(shotTaken);

    if (currentTurn === 'p1') { // Player 1's turn
        if (playerShips.p2.includes(shotTaken)) { // Check Player 2's ships
            console.log(`Player 1 HIT Player 2 at ${shotTaken}`);
            square.style.backgroundColor = '#df4414'; // Red for hit
            checkShipHit('p2', shotTaken); // Handle ship hit for Player 2
            checkSunkShips(playerShips.p2, p1Shots, 'Player 2'); // Check if Player 2's ships are sunk
            showHitAlert();
        } else {
            console.log(`Player 1 MISS at ${shotTaken}`);
            square.style.backgroundColor = '#646166'; // Grey for miss
        }
        p1Shots.push(shotTaken);

        updateTurn('p2'); // Switches to Player 2
        updateStateDisplay(); // Updates the UI

        // Call Player 2's turn after a delay
        setTimeout(() => {
            p2TakeShot(playerShips.p1, p2Shots, p1Shots, playerShips.p2);
        }, 1000);
    }
}


export function updateFeed(shotTaken) {
    const newFeedDiv = document.getElementById('liveFeed');
    if (!newFeedDiv) {
        console.error('Feed div not found in DOM');
        return;
    }

    // Create a new paragraph element
    const feedItem = document.createElement('p');
    feedItem.innerHTML = `<p style='background-color: #12bc23aa; padding: 0%; margin: 0%;'>HIT DETECTED</p>`;

    // Append the new paragraph to the feed container
    newFeedDiv.appendChild(feedItem);
}

// Display a flashing hit alert
export function showHitAlert() {
    const alertDiv = document.getElementById('alertDiv');
    const bottomMonitor = document.getElementById('monitorP1')
    if (!alertDiv) {
        console.error('Alert div not found in DOM');
        return;
    }

    alertDiv.textContent = 'HIT';

    bottomMonitor.style.border = '#df4414';

    let flashCount = 0;
    const flashInterval = setInterval(() => {
        alertDiv.style.backgroundColor = flashCount % 2 === 0 ? '#5d0707' : '#646166';
        flashCount++;
        if (flashCount >= 4) {
            clearInterval(flashInterval);
            alertDiv.style.backgroundColor = '';
            alertDiv.textContent = 'SYSTEM ONLINE';
        }
    }, 600);
}

// Reset button functionality
function setupResetButton(p1Shots, p2Shots) {
    const resetButton = document.getElementById('resetGame');
    if (!resetButton) {
        console.error('Reset button not found in DOM');
        return;
    }

    resetButton.addEventListener('click', () => {
        p1Shots.length = 0;
        p2Shots.length = 0;

        // Clear recorded shots
        resetShots();

        console.log('Game Reset');
        location.reload();
    });
}

