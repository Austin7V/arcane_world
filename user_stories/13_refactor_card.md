## Title
Refactor the card data model

### User Story
As a developer,  
I want to use a better structured card data model,  
so that cards can be expanded, explained, and styled more easily later.

### Description
The current card structure should be refactored into a more flexible and consistent format.  
Each card should contain not only its gameplay effect, but also descriptive and UI-related metadata.

The full card catalog remains in the project code and is not stored in MongoDB.

### Acceptance Criteria
- Each card has a clear and consistent data structure.
- Each card contains at least an id, a name, a type, and its effects.
- Each card includes descriptive text for the player.
- The structure supports future UI and animation metadata.
- The structure is reusable for both player cards and monster cards.
- The new format fits the current game architecture.

### Suggested Card Fields
- `id`
- `name`
- `type`
- `description`
- `usageText`
- `target`
- `effects`
- `animationKey`
- `illustration`

### Tasks
- [ ] Review the current player and monster card data.
- [ ] Define a new shared card structure.
- [ ] Refactor existing cards into the new format.
- [ ] Make sure the current card functionality still works.
- [ ] Keep the structure readable and scalable.
- [ ] Test the new card format in the existing game flow.