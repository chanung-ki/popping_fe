import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLogin: false,
    nickname: '',
    name: '',
    isMale: null,
    phoneNumber: '',
    uuid: '',
    isPopper: false,
    isSocialuser: false,
    socialLoginProvider: '',
  }

};

const userSlice = createSlice({
  name: 'poppingUser',
  initialState,
  reducers: {
    setUser: (state, action) => { state.user = action.payload }, //login
    initUser: (state) => { state.user = initialState.user }, //logout
  }
});

export const { setUser, initUser } = userSlice.actions;
export default userSlice;
