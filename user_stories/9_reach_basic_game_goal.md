# User Story 9: Reach a Basic Game Goal

## Title
Reach a basic game goal

## User Story
As a player,  
I want the game to have a simple goal,  
so that I know what I need to achieve in the MVP.

## Description
The player should complete multiple battles successfully in order to reach that goal.  
Once the defined number of victories has been reached, the game should mark the run as successfully completed.  
This gives the player a clear objective and a recognizable ending to the MVP game flow.

## Acceptance Criteria
- The game defines a simple goal for the run.
- The goal is based on a fixed number of won battles.
- Each won battle is counted in the game state.
- The game detects when the required number of victories has been reached.
- The run is marked as successfully completed when the goal is reached.
- No further normal battles are started after the goal is reached.
- The game view updates accordingly after the goal is reached.

## Tasks
- [ ] Define a fixed number of required victories for the MVP.
- [ ] Implement logic to count won battles.
- [ ] Store the run progress in the game state.
- [ ] Implement a condition to check whether the game goal has been reached.
- [ ] Mark the run as successfully completed when the goal is reached.
- [ ] Prevent further normal battles from starting after the goal is reached.
- [ ] Update the game view after the game goal is reached.
- [ ] Verify that the game goal is detected correctly after the required number of victories.