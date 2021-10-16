import { SHOW_LOADER_ACTION, HIDE_LOADER_ACTION } from "../actions/loader.action";

const initialState = {
  showLoader: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER_ACTION:
      return {
        showLoader: true,
      };
      // break;

    case HIDE_LOADER_ACTION:
      return {
        showLoader: false,
      };
      // break;
      default:
        return state;
    }
}
