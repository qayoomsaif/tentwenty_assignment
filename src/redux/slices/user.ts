import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  // Boolean flag to indicate if the user is logged in
  isLogin: boolean;
  // Token for authentication
  token: string | null;
  // User details object
  userDetails: Record<string, any> | null;
  // if status check is in progress
  isLoading: Boolean;
}

// Initial state for the user slice
const initialState: UserState = {
  isLogin: false,
  token: null,
  userDetails: null,
  isLoading: false,
};

// Creating the user slice with actions to manage the user state
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to log in the user and set token.
    setLogin(
      state,
      action: PayloadAction<{token: string; userDetails: Record<string, any>}>,
    ) {
      state.isLogin = true;
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },

    // Action to log out the user and clear token and user details.
    setLogout(state) {
      state.isLogin = false;
      state.token = null;
      state.userDetails = null;
    },

    // Action to update user details.
    updateUserDetails(state, action: PayloadAction<Record<string, any>>) {
      state.userDetails = {...state.userDetails, ...action.payload};
    },

    // Action to update the token only.
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    //Action to reset the user state to its initial values.
    resetUserState(state) {
      state.isLogin = false;
      state.token = null;
      state.userDetails = null;
      state.isLoading = false;
    },

    // Action to check if the user is logged in.
    checkLoginStatus(state) {
      if (!state.isLogin || !state.token) {
        console.warn('User is not logged in or token is missing.');
      }
    },

    setIfLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  },
});

// Exporting the actions for use in components or other parts of the app
export const {
  setLogin,
  setLogout,
  updateUserDetails,
  setIfLoading,
  updateToken,
  resetUserState,
  checkLoginStatus
} = userSlice.actions;

export default userSlice.reducer;
