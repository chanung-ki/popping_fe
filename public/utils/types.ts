export type user = {
  isLogin: boolean;
  nickname: string;
  name: string;
  isMale: boolean | null;
  businessInfo: {
    businessNumber: string;
    startDate: string;
    participantName: string;
    //일반 user -> 빈 객체 반환
  };
  phoneNumber: string;
  uuid: string;
  createdAt: string;
  isPopper: boolean;
  isSocialuser: boolean;
  socialLoginProvider: string;
  gradeInfo: {
    grade: string;
    minOrderAmount: number;
    maxOrderAmount: number;
    earnRate: number;
    discountRate: number;
  };
  point: number;
  savedPopup: string[];
};

export interface UserAddress {
  id: number;
  addressName: string;
  name: string;
  phoneNumber: string;
  postNumber: string;
  address: string;
  detailAddress: string;
  default: boolean;
}

export interface UserGrade {
  grade: string;
  minOrderAmount: number;
  maxOrderAmount: number;
  earnRate: number;
  discountRate: number;
  color: string;
}

// Popup Type INTERFACE
export interface GeoDataType {
  type: string;
  coordinates: number[];
}

export interface LocationDataType {
  address: string;
  placeName: string;
  geoData: GeoDataType;
}

export interface PopupStoreDataType {
  id: string;
  title: string;
  location: LocationDataType;
  startDate: string;
  endDate: string;
  openTime: string[];
  event: string[];
  image: any;
  isSaved: boolean;
}

export interface PlaceDataType {
  title: string;
  bestMenu: string[];
  gradePoint: number;
  loadAddr: string;
  numberAddr: string;
  telNumber: string;
  option: string;
  charTag: string[];
  tags: string[];
  geoData: GeoDataType;
}

// online Popup Type INTERFACE

export interface ProductType {
  id: number;
  brandFK: BrandType;
  description: string;
  name: string;
  option: OptionType[];
  price: number;
  productInvoice: string;
  createdAt: string;
  updatedAt: string;
  saved: number;
  view: number;
  isSaved: boolean;
  thumbnail: string;
}

export interface BrandType {
  id: number;
  logo: string;
  name: string;
  proceeding: number;
  isAble: boolean;
  conditions: {};
  saved: number;
  isSaved: boolean;
  description: string;
  thumbnail: string;
  contractStart: string;
  contractEnd: string;
}

export interface OptionType {
  name: string;
  option: SizeType[];
}

export interface SizeType {
  name: string;
  length: number;
  chest: number;
  sleeve: number;
}

export interface SimpleProductType {
  id: number;
  name: string;
  option: OptionType[];
  price: number;
  thumbnail: string;
  isSaved: boolean;
}

export interface CartType {
  id: number;
  product: SimpleProductType;
  option: CartOption;
}

export interface CartOption {
  color: string;
  size: string;
  amount: number;
}

export interface PaymentType {
  id: number;
  name: string;
  totalPrice: number;
  totalDiscount: number;
  item: CartType[];
}
export type gradeTypes = {
  grade: string;
  minOrderAmount: string;
  maxOrderAmount: string;
  earnRate: number;
  discountRate: number;
  gradeRatio: number;
  nextGradeInfo: {
    nextGrade: string;
    nextMinOrderAmount: string;
  };
};

export type pointHistoryTypes = {
  changeCategory: string;
  changePoint: string;
  changeAt: string;
};

// 팝플용 마이페이지 타입
export type myPagePoppleTypes = {
  followingNum: number;
  point: string;
  gradeInfo: gradeTypes;
};

// 베네핏 타입 (유저 등급, 포인트 정보)
export type benefitTypes = {
  point: string;
  orderAmount: string;
  gradeInfo: gradeTypes;
  pointHistory: pointHistoryTypes[];
};

export type brandManageTypes = {
  id: number;
  logo: string;
  thumbnail: string;
  description: string;
};

