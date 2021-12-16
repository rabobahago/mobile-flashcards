import {
  removeDeck,
  addCardToDeck,
  getDecks,
  saveDeckTitle
} from "../utils/data";

export const GET_ALL_DECKS = "GET_ALL_DECKS";

export const handleInitialData = () => {
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(getAllDecks(decks));
    });
  };
};

export const getAllDecks = (decks) => {
  return {
    type: GET_ALL_DECKS,
    decks
  };
};

export const handleAddQuestionToDeck = (title, card) => {
  return (dispatch) => {
    return addCardToDeck(title, card).then((decks) => {
      dispatch(getAllDecks(decks));
    });
  };
};

export const handleCreateNewDeck = (title) => {
  return (dispatch) => {
    return saveDeckTitle(title).then((decks) => {
      dispatch(getAllDecks(decks));
    });
  };
};

export const handleDeleteDeck = (key) => {
  return (dispatch) => {
    return removeDeck(key).then((decks) => {
      dispatch(getAllDecks(decks));
    });
  };
};
