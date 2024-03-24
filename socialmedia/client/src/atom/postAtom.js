// atoms.js
import { atom } from "recoil";

const postAtom = atom({
  key: "postAtom",
  default: [], // Initial state
});

export default postAtom;
