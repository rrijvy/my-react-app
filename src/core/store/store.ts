import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { personApi } from "./queries/getPerson";

export const store = configureStore({
  reducer: {
    [personApi.reducerPath]: personApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(personApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
