import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICommentRequestForm } from "@typings/db";
import axios from "axios";
import { toastErrorMessage } from "config";

export const commentCreateAction = createAsyncThunk<any, ICommentRequestForm>(
  "comment/create",
  async (form) => {
    try {
      await axios.post(`/comment`, form);
      return;
    } catch (error) {
      toastErrorMessage(error);
      throw error;
    }
  }
);

export const commentDeleteAction = createAsyncThunk<any, number>(
  "comment/delete",
  async (commentId) => {
    try {
      await axios.delete(`/comment/${commentId}`);
      return;
    } catch (error) {
      toastErrorMessage(error);
      throw error;
    }
  }
);

export const subCommentCreateAction = createAsyncThunk<any, ICommentRequestForm>(
  "comment/subComment/create",
  async (form) => {
    try {
      await axios.post(`/comment/subComment`, form);
      return;
    } catch (error) {
      toastErrorMessage(error);
      throw error;
    }
  }
);

export const subCommentDeleteAction = createAsyncThunk<any, number>(
  "comment/subComment/delete",
  async (subCommentId) => {
    try {
      await axios.delete(`/comment/subComment/${subCommentId}`);
      return;
    } catch (error) {
      toastErrorMessage(error);
      throw error;
    }
  }
);
