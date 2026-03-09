# User Story 4.1: Assign Monster Battle Cards Based on Health Points

## Title
Assign monster battle cards based on health points

## User Story
As a player,  
I want each monster to receive battle cards based on its health points,  
so that the enemy setup matches the monster's strength.

## Description
In addition to monster cards, there are 20 monster battle cards, which are also stored in MongoDB.  
When a monster is selected for a battle, it should receive a number of battle cards equal to its health points.  
For example, if a monster has 8 health points, it receives 8 monster battle cards.

Each monster battle card contains two possible attacks, such as **"Strike"** and **"Bite"**.  
During combat, one random attack option should be used for an attack.

## Acceptance Criteria
- All monster battle cards are stored in MongoDB.
- There are 20 monster battle cards in the database.
- The application provides an API endpoint to fetch monster battle cards.
- Monster battle cards are loaded in the frontend.
- A selected monster receives a number of battle cards equal to its health points.
- Each monster battle card contains two possible attacks.
- A random attack option can be selected for an attack.
- The assigned monster battle cards are stored in the game state.
- The monster battle cards are available in the battle flow.

## Tasks
- [ ] Define a data structure for monster battle cards.
- [ ] Prepare a MongoDB collection for monster battle cards.
- [ ] Create 20 monster battle cards in the database.
- [ ] Create an API endpoint to fetch monster battle cards.
- [ ] Load the monster battle cards in the frontend.
- [ ] Implement logic to determine the number of battle cards based on the monster's health points.
- [ ] Implement logic to assign the correct number of battle cards to the monster.
- [ ] Ensure that each monster battle card contains two possible attacks.
- [ ] Implement logic to make one random attack option selectable during combat.
- [ ] Store the assigned monster battle cards in the game state.
- [ ] Verify that the monster receives the correct number of battle cards.