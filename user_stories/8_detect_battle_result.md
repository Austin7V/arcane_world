# User Story 8: Detect the Battle Result

## Title
Detect the battle result

## User Story
As a player,  
I want the game to detect whether I win or lose a battle,  
so that the fight can end correctly and the next step can begin.

## Description
As soon as the health points of the player or the monster reach zero or below, the game should detect the battle result.  
The game should determine whether the player has won or lost the battle and end the fight accordingly.  
This allows the next game step to be triggered correctly.

## Acceptance Criteria
- The game detects when the monster's health points are zero or lower.
- The game detects when the player's health points are zero or lower.
- The battle ends automatically as soon as one of these conditions is met.
- The game distinguishes between victory and defeat.
- The battle result is stored in the game state.
- No further battle actions are possible after the battle ends.
- The battle screen updates accordingly after the battle result is determined.

## Tasks
- [ ] Implement logic to check the health points of the player and the monster after each action.
- [ ] Define a condition for player victory.
- [ ] Define a condition for player defeat.
- [ ] Implement logic to end the battle automatically.
- [ ] Store the battle result in the game state.
- [ ] Prevent further battle actions after the battle ends.
- [ ] Update the battle screen after victory or defeat.
- [ ] Verify that victory and defeat are detected correctly.