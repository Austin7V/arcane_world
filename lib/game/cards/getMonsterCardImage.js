const monsterCardImages = {
  "monster-card-1": "/cards/monster/01_monster_card_savage_claws.png",
  "monster-card-2": "/cards/monster/02_monster_card_beast_rush.png",
  "monster-card-3": "/cards/monster/03_monster_card_rotten_fangs.png",
  "monster-card-4": "/cards/monster/04_monster_card_night_hunt.png",
  "monster-card-5": "/cards/monster/05_monster_card_bone_crusher.png",
  "monster-card-6": "/cards/monster/06_monster_card_wild_howl.png",
  "monster-card-7": "/cards/monster/07_monster_card_venom_snap.png",
  "monster-card-8": "/cards/monster/08_monster_card_predator_leap.png",
  "monster-card-9": "/cards/monster/09_monster_card_shadow_maw.png",
  "monster-card-10": "/cards/monster/10_monster_card_rage_strike.png",
  "monster-card-11": "/cards/monster/11_monster_card_terror_bite.png",
  "monster-card-12": "/cards/monster/12_monster_card_blood_claw.png",
  "monster-card-13": "/cards/monster/13_monster_card_crushing_jaw.png",
  "monster-card-14": "/cards/monster/14_monster_card_feral_charge.png",
  "monster-card-15": "/cards/monster/15_monster_card_carrion_teeth.png",
  "monster-card-16": "/cards/monster/16_monster_card_dark_pounce.png",
  "monster-card-17": "/cards/monster/17_monster_card_hunter_instinct.png",
  "monster-card-18": "/cards/monster/18_monster_card_cursed_bite.png",
  "monster-card-19": "/cards/monster/19_monster_card_brutal_slam.png",
  "monster-card-20": "/cards/monster/20_monster_card_abyss_fang.png",
};

export default function getMonsterCardImage(cardId) {
  return (
    monsterCardImages[cardId] ??
    "/cards/monster/01_monster_card_savage_claws.png"
  );
}
