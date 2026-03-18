## Title
Create and load a user profile from MongoDB

### User Story
As a player,  
I want my profile to be created and loaded from MongoDB after login,  
so that my account is connected to my personal game data.

### Description
After a player signs in with Google for the first time, the app should create a user profile in MongoDB.  
If the player already exists, the existing profile should be loaded instead.

The database should store only player-related information, not the complete card catalog.

### Acceptance Criteria
- A new player profile is created in MongoDB after the first successful login.
- An existing profile is loaded on later logins.
- The user profile is connected to the authenticated Google account.
- MongoDB stores only player-related information.
- Full card definitions are not stored in the database.
- The app can access the loaded profile after login.

### Tasks
- [ ] Connect the project to MongoDB.
- [ ] Create a database connection helper.
- [ ] Create a user model/schema.
- [ ] Define the basic profile fields.
- [ ] Implement logic to create a new profile if none exists.
- [ ] Implement logic to load an existing profile.
- [ ] Connect the auth session to the database user.
- [ ] Test first login and repeated login behavior.