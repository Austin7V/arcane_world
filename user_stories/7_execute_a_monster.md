# User Story 7: Execute a Monster Counterattack During Battle

## Title
Execute a monster counterattack during battle

## User Story
As a player,  
I want the monster to perform a counterattack after my turn,  
so that the battle feels active and dangerous.

## Description
After the player plays a card and ends their turn, the monster should perform a counterattack.  
A available monster battle card should be used for the attack.  
One random attack option from that card, for example **"Strike"** or **"Bite"**, should be selected and applied to the player.  
This allows the monster to react actively to the player's turn and keeps the battle flow going.

## Acceptance Criteria
- After the player's turn, the monster performs a counterattack.
- An available monster battle card is used for the counterattack.
- One random attack option from the monster battle card is selected.
- The monster attack affects the current battle state.
- The effect of the monster attack is applied to the player.
- The used monster battle card is removed or marked as used.
- The battle screen updates after the monster counterattack.
- Only a valid monster attack can be executed.

## Tasks
- [ ] Implement logic to trigger the monster turn after the player turn.
- [ ] Select an available monster battle card for the counterattack.
- [ ] Determine one random attack option from the selected card.
- [ ] Apply the attack effect to the player.
- [ ] Update the game state after the monster attack.
- [ ] Remove the used monster battle card or mark it as used.
- [ ] Update the battle screen after the counterattack.
- [ ] Ensure that only valid monster attacks can be executed.
- [ ] Verify that the counterattack is correctly executed after the player turn.