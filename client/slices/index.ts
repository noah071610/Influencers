import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";

import { mainSlice } from "./main";
import { userSlice } from "./user";

export const reducer = (state: any = {}, action: any) => {
  if (action.type === HYDRATE) {
    console.log("HYDRATE", action);
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    main: mainSlice.reducer,
    user: userSlice.reducer,
  })(state, action);
};

export type RootState = ReturnType<typeof reducer>;
