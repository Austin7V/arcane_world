# User Story 6: Play a Card During Battle

## Title
Play a card during battle

## User Story
As a player,  
I want to play a card during battle,  
so that I can attack the monster and influence the fight.

## Description
During battle, the player should be able to select and play an available card from their hand.  
When a card is played, its effect should be applied to the monster, for example damage.  
This allows the player to actively take part in the battle and affect the outcome of the fight.

## Acceptance Criteria
- The player can select an available card during battle.
- The player can play a selected card.
- When a card is played, its effect is executed.
- The card effect changes the current battle state.
- A played card is removed from the player's hand or marked as used.
- The battle screen updates after the card is played.
- Only a valid and available card can be played.

## Tasks
- [ ] Provide a card action for the player on the battle screen.
- [ ] Implement logic to select a card.
- [ ] Implement logic to play a selected card.
- [ ] Apply the card effect to the battle state.
- [ ] Transfer the damage or effect to the monster.
- [ ] Remove the played card from the player's hand or mark it as used.
- [ ] Update the battle screen after a card is played.
- [ ] Ensure that only valid cards can be played.
- [ ] Verify that playing a card correctly affects the battle.