import { writable } from "svelte/store";
import { SessionState } from "../models";

export const session = writable({
  state: SessionState.Unstarted,
  index: 0,
  grades: {
    correct: [],
    wrong: []
  }
})