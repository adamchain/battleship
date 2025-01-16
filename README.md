# Battleship Game
*still very much in-progress

Welcome to my first game, **Battleship**. This is a fun little project where you go head-to-head with the computer in the classic game of Battleship. The whole thing leans heavily on **state management** and **arrays** to keep everything running smoothly.

## What's Cool About It
- **Play solo:** It's you vs. the computer in a turn-based battle of wits.
- **Smart state tracking:** The game keeps tabs on the board, your ships, and every move in real-time.
- **Array magic:** Arrays do the heavy lifting to manage the grid, ship positions, and gameplay logic.
- **Randomized AI:** The computer is no pushover—it places ships randomly and picks targets strategically.

## How It Works
1. **Setup Phase:**
   - You place your ships on a 10x10 grid.
   - The computer does the same (don’t peek!).

2. **Game Phase:**
   - Take turns guessing grid coordinates to attack.
   - Hits and misses are tracked, and the first to sink all the opponent's ships wins.

## Behind the Scenes: State Management
This game’s all about keeping track of stuff:

- **Player's Grid:** Tracks where your ships are and what’s been hit/missed.
- **Computer's Grid:** Same deal, but hidden from you.
- **Game Progress:** Who’s up next? How many ships are left? Is it game over?

Everything updates dynamically so it’s always up-to-date.

## Arrays FTW
Arrays make this game tick:

1. **The Grid:**
   - It’s a 10x10 2D array where each cell tracks what’s going on: empty, ship, hit, or miss.

   Example:
   ```javascript
   const grid = [
       [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       // ... rest of the grid
   ];
   // 0: empty, 1: ship, -1: miss, 2: hit
   ```

2. **Ships:**
   - Each ship is an array of coordinates.

   Example:
   ```javascript
   const ship = [
       { x: 0, y: 3 },
       { x: 0, y: 4 }
   ];
   ```

3. **Hits and Misses:**
   - Another array to track where you’ve already guessed.

   Example:
   ```javascript
   const attemptedHits = [
       { x: 0, y: 3 },
       { x: 2, y: 5 }
   ];
   ```

## Tools Used
- **HTML:** Lays out the game.
- **CSS:** Makes it look decent.
- **JavaScript:** Brings it all together.

## How to Play
1. Clone the repo:
   ```bash
   git clone https://github.com/adamchain/battleship.git
   ```
2. Go to the project folder and open `setup.html` in your browser.
3. Place your ships and get ready to sink the computer’s fleet!

## What’s Next?
- Add multiplayer support so you can play with friends.
- Let the computer have different difficulty levels.
- Add cool animations for hits, misses, and sinking ships.

## Want to Help?
Contributions are awesome! Fork the repo, make a branch, and send in a pull request with your tweaks or new features.


---

Alright, that’s it. Go sink some ships and have fun coding!

