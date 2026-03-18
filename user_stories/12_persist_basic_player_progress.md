## Title
Persist basic player progress

### User Story
As a player,  
I want my basic game progress to be saved,  
so that the game remembers my stats and current progress.

### Description
The application should store the player's most important progress data in MongoDB.  
At this stage, the focus is only on core values such as nickname, wins, losses, and current stage.

This creates a clean persistence layer before more complex game systems are added later.

### Acceptance Criteria
- The player profile stores a nickname.
- The player profile stores the total number of wins.
- The player profile stores the total number of losses.
- The player profile stores the current stage.
- The game can read these values after login.
- These values can be updated after relevant gameplay events.
- The values remain available after reloading the page and after future logins.

### Tasks
- [ ] Add the progress fields to the user model.
- [ ] Define default values for new players.
- [ ] Implement reading progress data after login.
- [ ] Implement updating progress data after relevant gameplay events.
- [ ] Connect the progress data to the frontend state.
- [ ] Test create, read, and update behavior.