import { CSSProperties } from "react";
import { abilityNames, Ability, useAbility } from "../hooks/abilities";
import useCharacter from "../hooks/character";

export default function CharacterSheet() {
  const character = useCharacter();

  return (
    <article>
      <section style={sectionStyle}>
        <label style={labelStyle}>
          Name
          <input
            type="text"
            value={character.name}
            onChange={(e) => character.setName(e.target.value)}
          />
        </label>
      </section>
      <section style={sectionStyle}>
        {abilityNames.map((name) => (
          <label style={labelStyle}>
            <span style={{ flex: "1" }}>{name}</span>
            <Score ability={name} />
            <span>({formatModifier(character.abilities[name].modifier)})</span>
          </label>
        ))}
      </section>
    </article>
  );

  function formatModifier(modifier: number) {
    return Intl.NumberFormat("en-US", { signDisplay: "always" }).format(
      modifier
    );
  }
}

function Score({ ability }: { ability: Ability }) {
  const { score, set } = useAbility(ability);

  return (
    <input type="number" value={score} onChange={(e) => set(+e.target.value)} />
  );
}

const sectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "325px",
};

const labelStyle: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: "4px",
};
