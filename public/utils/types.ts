export type user = {
  isLogin: boolean,
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

export interface GeoData {
  type: string;
  coordinates: number[];
}

export interface LocationData {
  address: string;
  placeName: string;
  geoData: GeoData;
}

export interface PopupStoreData {
  id: string;
  title: string;
  location: LocationData;
  startDate: string;
  endDate: string;
  openTime: string[];
  event: string[];
  image: any;
}

export interface PlaceData {
  title: string;
  bestMenu: string[];
  gradePoint: number;
  loadAddr: string;
  numberAddr: string;
  telNumber: string;
  option: string;
  charTag: string[];
  tags: string[];
  geoData: GeoData;
}