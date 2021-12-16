import { GET_ALL_DECKS } from "../actions/decks";

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_DECKS:
      return {
        ...action.decks
      };
  }
};
export default decks;
