export let currentTurn = 'p1';

export function updateTurn(newTurn) {
    currentTurn = newTurn;
}

export function updateStateDisplay() {
    const stateElement = document.getElementById('state');
    if (!stateElement) {
        console.error('State element not found in DOM. Ensure the game UI is correctly rendered.');
        return;
    }
    console.log("Updating state display:", currentTurn);
    stateElement.textContent = currentTurn === 'p1' ? "Player 1's Turn" : "Player 2's Turn";
}
