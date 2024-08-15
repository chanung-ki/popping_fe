import { createSlice } from "@reduxjs/toolkit";
import { user } from "@/public/utils/types";

const initialState: user = {
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

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => { state = action.payload }, //login
    initUser: (state) => { state = initialState }, //logout
  }
});

export const { setUser, initUser } = userSlice.actions;
export default userSlice;
