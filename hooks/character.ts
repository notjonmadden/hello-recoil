import { atom, useRecoilState } from "recoil";
import useAbilities from "./abilities";

const nameState = atom({
  key: "character:name",
  default: "",
  effects: [
    ({ onSet }) => {
      onSet((name) => console.log("name", name));
    },
  ],
});

export default function useCharacter() {
  const [name, setName] = useRecoilState(nameState);
  const abilities = useAbilities();

  return {
    name,
    abilities,
    setName,
  };
}
