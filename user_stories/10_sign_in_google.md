## Title
Sign in with Google

### User Story
As a player,  
I want to sign in with my Google account,  
so that I can access my personal game progress securely.

### Description
The game should allow users to authenticate with Google.  
After signing in, the application should recognize the player session and keep the user logged in until they sign out.

This story creates the foundation for all future persistent player data.

### Acceptance Criteria
- A player can sign in with Google.
- A player can sign out again.
- The application can detect whether a player is signed in or not.
- The signed-in state is available in the app.
- A signed-in player is recognized again after reloading the page.
- The implementation fits the current Next.js project structure.

### Tasks
- [ ] Install and configure authentication for Google login.
- [ ] Add the Google provider.
- [ ] Create the required auth configuration.
- [ ] Wrap the app with session handling if needed.
- [ ] Add a sign-in button to the UI.
- [ ] Add a sign-out button to the UI.
- [ ] Show different UI states for signed-in and signed-out users.
- [ ] Test login flow and logout flow.