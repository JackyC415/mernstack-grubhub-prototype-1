import { REGISTER_USER, LOGIN_USER } from "../constants/action-types";
const forbiddenWords = ["admin","Admin","ADMIN"];
export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === REGISTER_USER) {
        
        const foundWord = forbiddenWords.filter(word =>
          action.payload.name.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: "INVALID CREDENTIALS" });
        }
      } else if (action.type === LOGIN_USER) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.name.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: "INVALID CREDENTIALS" });
        }
      }
      return next(action);
    };
  };
}