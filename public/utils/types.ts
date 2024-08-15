export type user = {
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
};