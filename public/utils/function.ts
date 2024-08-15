import axiosInstance from "../network/axios";

// email, nickname, phoneNumber 중복 확인 api
export const duplicateCheckApi = async (
  checkData: string,
  option: string
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(`/api/user/duplicate/${option}`, {
      checkData: checkData,
    });
    if (response.status === 200) {
      return response.data.isExist;
    }
    return true;
  } catch (error) {
    return true;
  }
};

// 회원가입 인증 메일 전송 api
export const callEmailAuthApi = async (email: string): Promise<string> => {
  try {
    const response = await axiosInstance.post(`/api/user/email/auth`, {
      email: email,
    });
    if (response.status === 200) {
      return response.data.authCode;
    }
    return "";
  } catch (error) {
    return "";
  }
};

// 회원가입 인증 메일 전송 api
export const businessRegistrationCheckApi = async (
  businessNumber: string,
  startDate: string,
  participantName: string
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(
      `/api/user/business-registration`,
      {
        businessNumber: businessNumber,
        startDate: startDate,
        participantName: participantName,
      }
    );
    if (response.status === 200) {
      return response.data.isValid;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export function KRWLocaleString(price: number) {
  return price.toLocaleString("ko-KR");
}

export const Follow = async (type: string, id: number) => {
  try {
    await axiosInstance.post(`/api/popup/follow/toggle`, {
      type: type,
      id: id,
    });
  } catch (e: any) {
    if (e.response.status != 401) {
    }
  }
};
