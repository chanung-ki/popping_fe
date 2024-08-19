import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLogin: false,
    nickname: '',
    name: '',
    isMale: null,
    businessInfo: {
      businessNumber: '',
      startDate: '',
      participantName: '',
      //일반 user -> 빈 객체 반환
    },
    phoneNumber: '',
    uuid: '',
    createdAt: '',
    isPopper: false,
    isSocialuser: false,
    socialLoginProvider: '',
    gradeInfo: {
      grade: '',
      minOrderAmount: 0,
      maxOrderAmount: 0,
      earnRate: 0,
      discountRate: 0,
    },
    point: 0,
    savedPopup: [],
  }

};

const userSlice = createSlice({
  name: 'poppingUser',
  initialState,
  reducers: {
    setUser: (state, action) => { state.user = action.payload }, //login
    initUser: (state) => { state.user = initialState.user }, //logout
    changeNickname: (state, action) => {
      state.user.nickname = action.payload;
    },
    changeName: (state, action) => {
      state.user.name = action.payload;
    },
    changeisMale: (state, action) => {
      state.user.isMale = action.payload;
    },
  }
});

export const { setUser, initUser, changeNickname, changeName, changeisMale } = userSlice.actions;
export default userSlice;
