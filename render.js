const playHtml = document.getElementById('content');
playHtml.innerHTML =
    `
<div id="alertDiv">SYSTEM ONLINE</div>
    <div id=heading style="margin-left: 0">

    </div>
    <div id="mainContainer">
        <div class="grid" id="gridContainer"></div>

        <div id="rightPanel">
            <div id="feed">
                <p style="margin: 0; border-bottom: 2px solid #646166; padding-bottom: 3px;">Activity Feed</p>
                <p style="text-align: center;">LIVE server online</p>
                <div class="light-container">
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                    <div class="light"></div>
                </div>
                <div id="liveFeed"></div>
                <p class="newFeed"></p>
            </div>
        </div>
        <div id="rightPanel2">
            <div class="body" style="padding: 15%; margin-bottom: 30%;">
                <div class="block-section">
                    <ul class="block-links">
                        <li class="dark-blue animate-pulse" style="margin-bottom: 10px;">
                            <div draggable="true">GUN</div>
                        </li>
                        <li>
                            <div draggable="true"></i>AIR</div>
                        </li>
                        <li>
                            <div draggable="true">SUB</div>
                        </li>

                        <li>
                            <div draggable="true">RDR</div>
                        </li>
                        <li>
                            <div draggable="true">TST</div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div id="rightPanel2">
            <div class="body" style="padding: 15%; margin-bottom: 30%;">
                <div class="block-section">
                    <ul class="block-links">
                        <li class="dark-blue animate-pulse" style="margin-bottom: 10px;">
                            <div draggable="true">GUN</div>
                        </li>
                        <li>
                            <div draggable="true"></i>AIR</div>
                        </li>
                        <li>
                            <div draggable="true">SUB</div>
                        </li>
                        <hr>
                        <li>
                            <div draggable="true">RDR</div>
                        </li>
                        <li>
                            <div draggable="true">TST</div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>

    </div>
    <div id="bottomPanel"></div>
    <div id="bottomNav"></div>
    <div id="bottomNav">
        <button style="display: none;" id="resetGame">Reset</button>
    </div>
`;