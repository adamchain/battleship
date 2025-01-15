import * as shipSquares from '../modules/shipSquares.js';
shipSquares.getStartingSquare();

export function renderAddShipsToGrid() {
    const getControlPanelDiv = document.getElementById('bottomPanel');
    const addShipsToGridDiv = document.createElement('div');
    addShipsToGridDiv.innerHTML = `
    <div id="shipContainer";>
        <div class="shipDiv">
            <!--Small Ship Div-->
            <div class="addShipDiv" id='addSmlShip'>
            
            <img style="height: 40px;" src="images/small.png">
                    <!-- <label for='lrgShipDir'>Position</label> -->
                    <select id='smlShipDir' class="addShipDropdown">
                        <option value='vertical'>Vertical</option>
                        <option value='horizontal'>Horizontal</option>
                    </select>
                    <button class="addShipButtons" id="smlShipBtn">ADD</button>
            </div>

        </div>

        <div class="shipDiv">
            <!-- Medium Ship DIV -->
            <div class="addShipDiv" id='addMidShip'>
            <img style="height: 40px;" src="images/medium.png">
                    <!-- <label for='lrgShipDir'>Position</label> -->
                    <select id='midShipDir' class="addShipDropdown">
                        <option value='vertical'>Vertical</option>
                        <option value='horizontal'>Horizontal</option>
                    </select>

                    <button class="addShipButtons" id="midShipBtn">ADD</button>
            </div>
        </div>

        <div class="shipDiv">
            <!-- Large Ship DIV -->
            <div class="addShipDiv" id='addLrgShip'>
            <img style="height: 40px;" src="images/large.png">
                   <!-- <label for='lrgShipDir'>Position</label> -->
                    <select id='lrgShipDir' class="addShipDropdown">
                        <option value='vertical'>Vertical</option>
                        <option value='horizontal'>Horizontal</option>
                    </select>
                    <button class="addShipButtons" id="lrgShipBtn">ADD</button>

                    
            </div>
        </div>
    </div>
    `
    document.body.appendChild(addShipsToGridDiv);
};

export function renderShipMonitor() {
    const getControlPanelDiv = document.getElementById('bottomPanel');
    const addShipMonitor = document.createElement('div');
    addShipMonitor.innerHTML = `
    <div id="renderBottomPlay";>
        <div class="shipDivPlay">
            <div class="addShipDivPlay" id='monitorP1'>
            <img style="height: 90px;" src="images/ships/ship6.png">
            </div>
        
        </div>

        <div class="shipDivPlay">
            <div class="addShipDivPlay" id='monitorp1'>
            <img style="height: 90px;" src="images/ships/ship4.png">
            </div>
            
        </div>

        <div class="shipDivPlay">
            <div class="addShipDivPlay" id='monitorP3'>
            <img style="height: 90px;" src="images/ships/ship3.png">
            </div>
            
        </div>

        <div class="shipDivPlay">
            <div class="addShipDivPlay" id='monitorP3'>
            <img style="height: 90px;" src="images/ships/ship2.png">
            </div>
            
        </div>

    </div>

    <!--
    <div id="renderBottomPlay"; style="back">
        <div class="shipDivPlay">
            <div class="addShipDivPlay" id='monitorP1'>
            <img style="height: 20px;" src="">
            </div>
            <div class="dot-container">
            <div class="dot" id="p1ship3hit1"></div>
            <div class="dot" id="p1ship3hit2"></div>
            <div class="dot" id="p1ship3hit3"></div>
            </div>
        </div>

        <div class="shipDivPlay">
            <div class="addShipDivPlay" id='monitorp1'>
            <img style="height: 20px;" src="">
            </div>
            <div class="dot-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            </div>
        </div>

        <div class="shipDivPlay">
            <div class="addShipDivPlay" id='monitorP3'>
            <img style="height: 20px;" src="">
            </div>
            <div class="dot-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            </div>
        </div>
    </div>-->
    `
    document.body.appendChild(addShipMonitor);
};


