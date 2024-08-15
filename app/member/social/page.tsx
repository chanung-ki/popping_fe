"use client";

import { styled } from "styled-components";
import { DefaultLayout } from "@/app/components/layout";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import axiosInstance from "@/public/network/axios";

const SocialAuthPage: React.FC = () => {

  const searchParams = useSearchParams();
  // const [code, setCode] = useState<string>('');
  // const [provider, setProvider] = useState<string>('');

  useEffect(() => {
    const code = searchParams.get('code');
    const provider = searchParams.get('provider');

    if (code && provider) {
      // setCode(getCode);
      // setProvider(getProvider);
      socialAuthApi(code, provider);
    }
  }, [searchParams]);

  const socialAuthApi = async (code: string, provider: string) => {
    try {
      const response = await axiosInstance.post(`/api/user/social/auth/${provider}`, {
        code: code,
      });
      if (response.status === 200) {
        console.log('성공');
        // 유저 정보 저장 후 메인으로 렌더링
      }
    } catch (error) {
      alert('소셜로그인 중 오류가 발생했습니다.');
      window.location.href = '/member/signin';
    }
  }

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <Container>
        {/* 로딩 컴포넌트 필요 */}
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
