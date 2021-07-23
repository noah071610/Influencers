import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import { mainSlice } from "./main";
import { userSlice } from "./user";
import { mainPostSlice } from "./mainPost";
import { storySlice } from "./story";
import { studySlice } from "./study";
import { commentSlice } from "./comment";

export const reducer = (state: any = {}, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    main: mainSlice.reducer,
    user: userSlice.reducer,
    mainPost: mainPostSlice.reducer,
    story: storySlice.reducer,
    study: studySlice.reducer,
    comment: commentSlice.reducer,
  })(state, action);
};

export type RootState = ReturnType<typeof reducer>;
