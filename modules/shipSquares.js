// Arrays to hold ship locations
const smallShipLocation = [];
const mediumShipLocation = [];
const largeShipLocation = [];
let shipArray = []; // This will hold the locations of the current ship

// Initialize function to set up event listeners
export function getStartingSquare() {

    let shipPlaced = {
        smlShipBtn: false,
        midShipBtn: false,
        lrgShipBtn: false
    };

    document.querySelectorAll('.addShipButtons').forEach((button) => {

        button.addEventListener('click', (event) => {
            const shipBtnId = event.target.id;

            document.querySelectorAll('.square').forEach((square) => {
                square.style.pointerEvents = 'auto'; // Enable clicks on grid squares
            });

            // Prevent selecting the button again if a ship has been placed
            if (shipPlaced[shipBtnId]) {
                console.log(`Ship already placed for ${shipBtnId}`);
                return; // Prevent further actions
            }

            let shipLength = 0;
            let shipDirection = '';
            let shipImg = '';

            // Correctly accessing the parent element of the clicked button
            // Hiding the parent element (e.g., the button's container or div)
            const addShipElement = document.getElementById(shipBtnId).parentElement;
            addShipElement.style.display = 'none';

            // Determine the corresponding direction and ship length
            if (shipBtnId === 'smlShipBtn') {
                shipLength = 3;
                shipImg = 'images/small.png';
                shipArray = smallShipLocation; // Set shipArray to smallShipLocation
                shipDirection = document.getElementById('smlShipDir').value;
            } else if (shipBtnId === 'midShipBtn') {
                shipLength = 4;
                shipImg = 'images/medium.png';
                shipArray = mediumShipLocation; // Set shipArray to mediumShipLocation
                shipDirection = document.getElementById('midShipDir').value;
            } else if (shipBtnId === 'lrgShipBtn') {
                shipLength = 6;
                shipImg = 'images/large.png';
                shipArray = largeShipLocation; // Set shipArray to largeShipLocation
                shipDirection = document.getElementById('lrgShipDir').value;
            }

            console.log(`Ship Length: ${shipLength}`);
            console.log(`Button Clicked: ${shipBtnId}`);
            console.log(`Selected Direction: ${shipDirection}`);

            shipPlaced[shipBtnId] = true; // Mark ship as placed

            // Add event listeners to all squares
            document.querySelectorAll('.square').forEach((square) => {
                square.removeEventListener('click', squareClickHandler); // Prevent duplicate listeners
                square.addEventListener('click', squareClickHandler);
            });

            // Handler for square clicks
            function squareClickHandler(event) {
                const squareId = event.target.id;

                // Disable the clicked square after it's been selected
                event.target.style.pointerEvents = 'none'; // Disable further clicks on this square
                console.log(`Starting Square Selected: ${squareId}`);

                let letterFromId = squareId.substring(0, 1);
                let numberFromId = parseInt(squareId.substring(1));

                if (isNaN(numberFromId)) {
                    console.error(`Invalid numberFromId: ${numberFromId}`);
                    return;
                }

                console.log(`Starting Letter: ${letterFromId}`);
                console.log(`Starting Number: ${numberFromId}`);

                // Generate additional ship square IDs and check if ship fits
                if (canPlaceShip(letterFromId, numberFromId, shipDirection, shipLength)) {
                    allShipDivs(letterFromId, numberFromId, shipDirection, shipLength);
                } else {
                    alert('Ship cannot be placed here. Try a different square.');
                }
            }

            // Function to check if the ship can be placed at the given position
            function canPlaceShip(letterFromId, numberFromId, shipDirection, shipLength) {
                // Check if placing the ship horizontally fits within the grid
                if (shipDirection === 'horizontal') {
                    if (numberFromId + shipLength - 1 > 15) return false; // Prevent overflow horizontally
                }

                // Check if placing the ship vertically fits within the grid
                if (shipDirection === 'vertical') {
                    if (letterFromId.charCodeAt(0) + shipLength - 1 > 'Z'.charCodeAt(0)) return false; // Prevent overflow vertically
                }

                return true; // Ship can be placed
            }

            // Function to calculate all ship square IDs
            function allShipDivs(letterFromId, numberFromId, shipDirection, shipLength) {

                // Array to store all generated ship locations
                const gameArray = [];

                if (shipDirection === 'horizontal') {
                    for (let i = 0; i < shipLength; i++) { // Assuming ship length is 3
                        let nextNumber = numberFromId + i;
                        let idCreated = letterFromId + nextNumber;
                        console.log(`Horizontal ID Created: ${idCreated}`);
                        gameArray.push(idCreated); // Add this new ID to the ship array
                        document.getElementById(idCreated).style.backgroundColor = '#0a7214';
                        document.getElementById(idCreated).style.color = 'white';
                    }
                } else if (shipDirection === 'vertical') {
                    for (let i = 0; i < shipLength; i++) { // Assuming ship length is 3
                        let nextLetter = String.fromCharCode(letterFromId.charCodeAt(0) + i);
                        let idCreated = nextLetter + numberFromId;
                        console.log(`Vertical ID Created: ${idCreated}`);
                        gameArray.push(idCreated); // Add this new ID to the ship array
                        document.getElementById(idCreated).style.backgroundColor = '#0a7214';
                        document.getElementById(idCreated).style.color = 'white';
                    }
                } else {
                    console.error(`Invalid shipDirection: ${shipDirection}`);
                    return;
                }

                // Create a new display of the ship's locations and append it
                const monitorDiv = document.getElementById('newActivity');
                const yourPositions = document.createElement('p');

                yourPositions.innerHTML = `
                    <div class="shipDiv">
                        <div class="addShipDiv">
                            <img style="height: 40px;" src="${shipImg}">
                            <p>${gameArray.join(', ')}</p> <!-- Display ship locations -->
                            <br>
                        </div>
                    </div>
                `;
                monitorDiv.appendChild(yourPositions); // Append new ship locations
            }
        });
    });
}

getStartingSquare(); // Initialize the function
