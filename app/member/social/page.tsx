"use client";

import { styled } from "styled-components";
import { DefaultLayout } from "@/app/components/layout";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from "react";
import axiosInstance from "@/public/network/axios";
import { Loading } from "@/app/components/loading";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/reducers/poppingUser";
import { user } from "@/public/utils/types";

const SocialAuthPage: React.FC = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  // API를 두번 호출해서 한번만 호출하도록 useRef 사용
  const hasCalledApi = useRef(false); 
  const searchParams = useSearchParams();

  useEffect(() => {
    if (hasCalledApi.current) return; // 이미 호출되었다면 다시 호출 X

    const code = searchParams.get('code');
    const provider = searchParams.get('provider');

    if (code && provider) {
      socialAuthApi(code, provider);
      // 첫 호출 이후 재호출 방지
      hasCalledApi.current = true; 
    }
  }, [searchParams]);

  const socialAuthApi = async (code: string, provider: string) => {
    try {
      const response = await axiosInstance.post(`/api/user/social/auth/${provider}`, {
        code: code,
      });
      if (response.status === 200) {
        const userData: user = response.data.user;
        dispatch(setUser(userData));
        router.push('/');
      }
    } catch (error: any) {

      if (error.response.data.isSuccess === false){
        alert(error.response.data.message)
      } else {
        alert('소셜로그인 중 오류가 발생했습니다.');
      }
      router.push('/member/signin');
    }
  }

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <Container>
        <Loading/>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export default SocialAuthPage;
