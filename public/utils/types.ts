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
  proceeding: boolean;
  conditions: {};
  saved: number;
  isSaved: boolean;
  description: string;
  thumbnail: string;
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

export interface CartType {
  id: number;
  product: ProductType;
  option: CartOption;
}

export interface CartOption {
  color: string;
  size: string;
  amount: number;
}
