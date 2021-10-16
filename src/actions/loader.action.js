export const SHOW_LOADER_ACTION = "SHOW_LOADER";
export const HIDE_LOADER_ACTION = "HIDE_LOADER";

export const showLoaderActionCreator = () => {
  return {
    type: SHOW_LOADER_ACTION,
  };
};

export const hideLoaderActionCreator = () => {
  return {
    type: HIDE_LOADER_ACTION,
  };
};
