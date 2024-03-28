// atoms.js
import { atom } from "recoil";

const postsAtom = atom({
  key: "postsAtom",
  default: [], // Initial state
});

export default postsAtom;
