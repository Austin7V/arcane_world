# User Story 4.0: Load Monster Data from MongoDB via API

## Title
Load monster data from MongoDB via API

## User Story
As a player,  
I want the game to load monster data from MongoDB via API,  
so that monsters are stored centrally and can be used in the game.

## Description
All monster data is stored in the MongoDB database.  
The application should load this data through an API endpoint and make it available in the frontend.  
At the beginning of the project, there are 10 monster cards with defined values such as name and health points.  
This allows the game to work with centrally stored and reusable monster data.

## Acceptance Criteria
- All monster cards are stored in MongoDB.
- There are 10 monster cards in the database.
- The application provides an API endpoint to fetch monster data.
- The monster data is loaded in the frontend.
- The loaded monster data is available for the game logic.
- The monster data structure is consistent and usable in the game.

## Tasks
- [ ] Define a data structure for monster cards.
- [ ] Prepare a MongoDB collection for monster cards.
- [ ] Create 10 monster cards with defined values in the database.
- [ ] Create an API endpoint to fetch monster data.
- [ ] Load the monster data in the frontend.
- [ ] Ensure that the loaded monster data can be used in the game logic.
- [ ] Verify that the monster data matches the expected structure.