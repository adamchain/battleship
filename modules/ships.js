export const playerShips = {
    p1: [], // Player 1's ship IDs
    p2: []  // Player 2's ship IDs
};

// Add ships for a player
export function addShips(player, shipIds) {
    if (!playerShips[player]) {
        console.error(`Invalid player: ${player}`);
        return;
    }
    playerShips[player] = shipIds;
}

// Check if a ship is sunk
export function checkShipHit(player, shotId) {
    if (!playerShips[player].includes(shotId)) {
        return false; // No ship hit
    }

    // Remove the hit ship ID
    playerShips[player] = playerShips[player].filter(id => id !== shotId);

    // Check if all ships are sunk
    if (playerShips[player].length === 0) {
        sunkShips[player]++;
        alert(`${player === 'p1' ? 'Player 1' : 'Player 2'} has lost all their ships!`);
        endGame(player === 'p1' ? 'p2' : 'p1');
    } else {
        console.log(`${player === 'p1' ? 'Player 1' : 'Player 2'}'s ship hit at ${shotId}!`);
    }

    return true;
}

export function checkSunkShips(shipList, shots, sunkShips, playerName) {
    // Ensure inputs are arrays
    if (!Array.isArray(shipList) || !Array.isArray(shots)) {
        console.error('Invalid arguments passed to checkSunkShips. shipList and shots must be arrays.');
        return;
    }

    // Check if all ships in the list have been hit
    if (shipList.every(ship => shots.includes(ship))) {
        // Prevent redundant game over logic
        if (!Object.values(sunkShips).every(status => status)) {
            console.log(`${playerName} ships ALL SINK`);

            // Mark all ships as sunk
            Object.keys(sunkShips).forEach(key => (sunkShips[key] = true));

            // Trigger end game alert
            setTimeout(() => alert(`${playerName} loses!`), 1000);
        }
    }
}

// End the game
export function endGame(winner) {
    alert(`${winner === 'p1' ? 'Player 1' : 'Player 2'} wins the game!`);
    console.log('Game Over. Resetting...');
    // Optionally, trigger a game reset or redirect
    location.reload();
}

// Debugging utility
export function logShips() {
    console.log('Player 1 Ships:', playerShips.p1);
    console.log('Player 2 Ships:', playerShips.p2);
}
