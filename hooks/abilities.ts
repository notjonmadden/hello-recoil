import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const abilityStates = {
  strength: atom({
    key: "abilities:strength",
    default: 10,
  }),
  dexterity: atom({
    key: "abilities:dexterity",
    default: 10,
  }),
  constitution: atom({
    key: "abilities:constitution",
    default: 10,
  }),
  wisdom: atom({
    key: "abilities:wisdom",
    default: 10,
  }),
  intelligence: atom({
    key: "abilities:intelligence",
    default: 10,
  }),
  charisma: atom({
    key: "abilities:charisma",
    default: 10,
  }),
};

export type Ability = keyof typeof abilityStates;

export const abilityNames = Object.keys(
  abilityStates
) as ReadonlyArray<Ability>;

export default function useAbilities() {
  const strength = useAbility("strength");
  const dexterity = useAbility("dexterity");
  const constitution = useAbility("constitution");
  const wisdom = useAbility("wisdom");
  const intelligence = useAbility("intelligence");
  const charisma = useAbility("charisma");

  return {
    strength,
    dexterity,
    constitution,
    wisdom,
    intelligence,
    charisma,
  };
}

export function useAbility(ability: Ability) {
  const [score, setScore] = useRecoilState(abilityStates[ability]);
  const _modifier = useRecoilValue(modifier(ability));

  function increment() {
    setScore((s) => s + 1);
  }

  function decrement() {
    setScore((s) => s - 1);
  }

  function set(value: number) {
    setScore(value);
  }

  return {
    score,
    increment,
    decrement,
    set,
    modifier: _modifier,
  };
}

function modifier(ability: Ability) {
  return selector({
    key: `abilities:${ability}:modifier`,
    get: ({ get }) => {
      const abilityScore = get(abilityStates[ability]);

      return Math.floor((abilityScore - 10) / 2);
    },
  });
}
