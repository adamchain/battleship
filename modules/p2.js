//import { updateStateDisplay, showHitAlert } from '../modules/cfig.js';
// Import necessary functions
import { showHitAlert, handleSquareClick } from '../modules/cfig.js';
//import { currentTurn, updateTurn } from '../modules/state.js';
import { addShot, isShotTaken, logShotsTaken, resetShots } from '../modules/gridRemaining.js';
import { addShips, checkShipHit, checkSunkShips, endGame, logShips, playerShips } from '../modules/ships.js';
import { currentTurn, updateTurn, updateStateDisplay } from '../modules/state.js';


// Constants for grid setup
const gridLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
const gridNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Sample ship data
const p2ship = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];
const p2shots = [];
//let currentTurn = '';

// state based on previous shots, to guide computer player when guessing
let thisShot = false;
let lastShot = false;

//first move
export function generateRandomId() {
    const randomLetterIndex = Math.floor(Math.random() * gridLetters.length);
    const randomNumberIndex = Math.floor(Math.random() * gridNumbers.length);
    return gridLetters[randomLetterIndex] + gridNumbers[randomNumberIndex];
}

export function logShotResult(shotId) {
    const isHit = p2ship.includes(shotId);

    if (isHit && thisShot) {
        console.log(`HIT 2 in a row at ${shotId}!`);
    } else if (isHit) {
        console.log(`HIT at ${shotId}!`);
    } else {
        console.log(`MISS at ${shotId}`);
    }

    lastShot = thisShot;
    thisShot = isHit;
}

export function p2TakeShot(p1ShipsAll, p2Shots, p1Shots, p2ShipsAll) {
    let shotId;

    // Generate a valid shot
    do {
        shotId = generateRandomId();
    } while (isShotTaken(shotId));

    addShot(shotId); // Track the shot
    const targetSquare = document.getElementById(shotId);

    if (!targetSquare) {
        console.error(`Target square ${shotId} not found in DOM`);
        return;
    }

    // Check if the shot hits Player 1's ships
    if (p1ShipsAll.includes(shotId)) {
        console.log(`Player 2 HIT Player 1 at ${shotId}`);
        targetSquare.style.backgroundColor = '#1e90ff'; // Blue for hit
        checkSunkShips(playerShips.p1, p2Shots, 'Player 2');
        showHitAlert();
    } else {
        console.log(`Player 2 MISS at ${shotId}`);
        targetSquare.style.backgroundColor = '#646166'; // Grey for miss
    }

    // Switch back to Player 1's turn
    updateTurn('p1');
    updateStateDisplay();
}

export function divideGridIntoSections() {
    const sections = {
        topLeft: [],
        bottomLeft: [],
        topRight: [],
        bottomRight: []
    };

    for (let row = 1; row <= gridNumbers.length; row++) {
        for (let col = 0; col < gridLetters.length; col++) {
            const colLetter = gridLetters[col];
            const cellId = `${colLetter}${row}`;

            if (col < Math.floor(gridLetters.length / 2)) {
                if (row <= Math.floor(gridNumbers.length / 2)) {
                    sections.topLeft.push(cellId);
                } else {
                    sections.bottomLeft.push(cellId);
                }
            } else {
                if (row <= Math.floor(gridNumbers.length / 2)) {
                    sections.topRight.push(cellId);
                } else {
                    sections.bottomRight.push(cellId);
                }
            }
        }
    }

    return sections;
}

export function getRandomIdFromSection(section) {
    const randomIndex = Math.floor(Math.random() * section.length);
    return section[randomIndex];
}

export function randomShipSetup() {
    const setups = [
        [["p2p2Ship6", ["A1", "A2", "A3", "A4", "A5", "A6"]], ["p2Ship4", ["B10", "C10", "D10", "E10"]], ["p2Ship3", ["J5", "J6", "J7"]], ["p2Ship2", ["M13", "N13"]]],
        [["p2Ship6", ["D4", "D5", "D6", "D7", "D8", "D9"]], ["p2Ship4", ["H11", "I11", "J11", "K11"]], ["p2Ship3", ["A14", "B14", "C14"]], ["p2Ship2", ["F2", "F3"]]],
        [["p2Ship6", ["O1", "O2", "O3", "O4", "O5", "O6"]], ["p2Ship4", ["A7", "B7", "C7", "D7"]], ["p2Ship3", ["J12", "J13", "J14"]], ["p2Ship2", ["F15", "G15"]]],
        [["p2Ship6", ["B3", "B4", "B5", "B6", "B7", "B8"]], ["p2Ship4", ["G12", "H12", "I12", "J12"]], ["p2Ship3", ["E8", "E9", "E10"]], ["p2Ship2", ["L14", "L15"]]],
        [["p2Ship6", ["F1", "F2", "F3", "F4", "F5", "F6"]], ["p2Ship4", ["K3", "L3", "M3", "N3"]], ["p2Ship3", ["C9", "C10", "C11"]], ["p2Ship2", ["H14", "I14"]]],
        [["p2Ship6", ["G9", "G10", "G11", "G12", "G13", "G14"]], ["p2Ship4", ["B5", "C5", "D5", "E5"]], ["p2Ship3", ["L7", "L8", "L9"]], ["p2Ship2", ["O1", "O2"]]],
        [["p2Ship6", ["A10", "B10", "C10", "D10", "E10", "F10"]], ["p2Ship4", ["I1", "J1", "K1", "L1"]], ["p2Ship3", ["F3", "G3", "H3"]], ["p2Ship2", ["M8", "M9"]]],
        [["p2Ship6", ["L1", "L2", "L3", "L4", "L5", "L6"]], ["p2Ship4", ["D7", "E7", "F7", "G7"]], ["p2Ship3", ["I11", "J11", "K11"]], ["p2Ship2", ["A14", "B14"]]],
        [["p2Ship6", ["K4", "K5", "K6", "K7", "K8", "K9"]], ["p2Ship4", ["H13", "I13", "J13", "K13"]], ["p2Ship3", ["E1", "F1", "G1"]], ["p2Ship2", ["N10", "O10"]]],
        [["p2Ship6", ["M11", "M12", "M13", "M14", "M15", "M16"]], ["p2Ship4", ["C3", "D3", "E3", "F3"]], ["p2Ship3", ["H8", "I8", "J8"]], ["p2Ship2", ["A2", "B2"]]],
        [["p2Ship6", ["A15", "B15", "C15", "D15", "E15", "F15"]], ["p2Ship4", ["L2", "M2", "N2", "O2"]], ["p2Ship3", ["G4", "G5", "G6"]], ["p2Ship2", ["J12", "K12"]]],
        [["p2Ship6", ["O3", "O4", "O5", "O6", "O7", "O8"]], ["p2Ship4", ["E9", "F9", "G9", "H9"]], ["p2Ship3", ["A12", "B12", "C12"]], ["p2Ship2", ["J14", "K14"]]]
    ];

    const randomSetupIndex = Math.floor(Math.random() * setups.length);
    return setups[randomSetupIndex];
}

export function p2setup() {
    const sections = divideGridIntoSections();
    const randomSetup = randomShipSetup();

    //console.log("Random Ship Setup:", randomSetup);

    // Example shot taking
    //p2TakeShot();
    //p2TakeShot();

    // Example of selecting random IDs from sections
    const randomFromTopLeft = getRandomIdFromSection(sections.topLeft);
    const randomFromBottomRight = getRandomIdFromSection(sections.bottomRight);
    const randomFromTopRight = getRandomIdFromSection(sections.topRight);
    const randomFromBottomLeft = getRandomIdFromSection(sections.bottomLeft);

    console.log("Random from Top Left:", randomFromTopLeft);
    console.log("Random from Top Right:", randomFromTopRight);
    console.log("Random from Bottom Left:", randomFromBottomLeft);
    console.log("Random from Bottom Right:", randomFromBottomRight);

}


