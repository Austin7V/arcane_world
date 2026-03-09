# User Story 3: Create a Starter Deck from Loaded Card Data

## Title
Create a starter deck from loaded card data

## User Story
As a player,  
I want the game to create my starter deck from the loaded card data,  
so that I can begin the game with a playable deck.

## Description
After the card data has been loaded from MongoDB via the API, the game should create a starter deck for a new run.  
The starter deck should be based on predefined cards from the loaded data and be available for the first battle.

## Acceptance Criteria
- A starter deck is created when a new game begins.
- The starter deck is created from the loaded card data.
- The starter deck contains a predefined number of cards.
- All cards in the starter deck are valid and playable.
- The starter deck is stored in the game state.
- The starter deck is available for the first battle.

## Tasks
- [ ] Define the starter deck rules and card selection.
- [ ] Create logic to build the starter deck from the loaded card data.
- [ ] Ensure only valid cards are added to the starter deck.
- [ ] Store the starter deck in the game state.
- [ ] Make the starter deck available in the battle flow.