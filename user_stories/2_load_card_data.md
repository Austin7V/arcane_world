# User Story 2: Load Card Data from MongoDB via API

## Title
Load card data from MongoDB via API

## User Story
As a player,  
I want the game to load card data from MongoDB via API,  
so that all card data is stored centrally and can be used in the game.

## Description
All card data is stored in the MongoDB database.  
The application should load this data through an API endpoint and make it available in the frontend using SWR.  
This allows the game to work with centrally stored and reusable card data.

## Acceptance Criteria
- All card data is stored in MongoDB.
- The application provides an API endpoint to fetch card data.
- The card data is loaded in the frontend using SWR.
- The loaded card data is available for the game logic.
- The card data structure is consistent and usable in the game.

## Tasks
- [ ] Define a card schema for MongoDB.
- [ ] Set up a MongoDB connection in the project.
- [ ] Create card data entries in the database.
- [ ] Create an API endpoint to fetch card data.
- [ ] Load the card data in the frontend using SWR.
- [ ] Ensure that the loaded data can be used in the game logic.