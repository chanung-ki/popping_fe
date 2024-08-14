import { createSlice } from "@reduxjs/toolkit";

type user = {
  nickname: string,
  name: string,
  isMale: boolean | null,
  businessInfo: {
    businessNumber: string,
    startDate: string,
    participantName: string,
    //일반 user -> 빈 객체 반환
  },
  phoneNumber: string,
  uuid: string,
  createdAt: string,
  isPopper: boolean,
  isSocialuser: boolean,
  socialLoginProvider: string,
  gradeInfo: {
    grade: string,
    minOrderAmount: number,
    maxOrderAmount: number,
    earnRate: number,
    discountRate: number,
  },
  point: number,
  savedPopup: string[],
}

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
