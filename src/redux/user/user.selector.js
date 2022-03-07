import { createSelector } from "reselect";

const selectUser = (state) => state.user;

//createSelector produces memoized selector function.

//NOTE: Create multiple instances if using same selector in multiple areas as caching depth is only 1.
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
