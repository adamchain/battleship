// Import configurations and modules
import * as cfig from '../modules/cfig.js';
import * as shipSquares from '../modules/shipSquares.js';
import * as renderBottom from '../modules/renderBottom.js';
// Import specific functions from p2.js
import { generateRandomId, randomShipSetup, p2setup } from '../modules/p2.js';

// Initialize the game setup and render functions
console.log("Generated Random ID:", generateRandomId()); // Ensure working
//p2setup(); // Set up Player 2 grid and ships
cfig.p1p2Setup(); // Initialize the main game logic

// Render ship monitor and initial UI setup
renderBottom.renderShipMonitor();
shipSquares.getStartingSquare();

// Debugging setup
console.log("Game setup initialized.");

//gameState.stateMgmt();

