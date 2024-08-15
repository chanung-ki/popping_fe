"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useState } from "react";
import axiosInstance from "@/public/network/axios";
import { DefaultLayout } from "@/app/components/layout";
import Link from "next/link";
import { IconX } from "@/app/components/icons";
import { useRouter } from "next/navigation";

//버튼이 아니라 Link로 하는게 나을듯? 

interface BrandsOpening {
  id: number;
  name: string;
  logo: string;
  saved: number;
  description: string;
  thumbnail: string;
}

const OnlinePopUpOpenningPage: React.FC<{ params: { storeId: string } }> = ({ params }) => {
  const router = useRouter();

  const [openingData, setOpeningData] = useState<BrandsOpening>();

  const { storeId } = params;

  useEffect(() => {
    BrandDataGetAPI();
  }, [router]);

  const BrandDataGetAPI = async () => {
    try {
      const response = await axiosInstance.get(`/api/popup/brand/opening/${storeId}`)
      if (response.status === 200) {
        setOpeningData(response.data)
      }
    }
    catch (error: any) {
      if (error.response.status === 400) {
        alert('없음')
      }
    }
  }

  if (!openingData) return null;

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">

      <>
        <OpeningImage src={openingData.thumbnail} />
        <Link
          href={'/'}
          style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}
        >
          <IconX
            color={COLORS.primaryColor}
            width={undefined}
            height={16} />
        </Link>
        <Overlay />
      </>

      <OpenningPageContainer>
        <OpenningPageContentsContainer>
          <BrandInfo>
            <BrandIcon
              src={openingData.logo}
              alt="Brand Icon" />
            <BrandName>
              {storeId.toUpperCase()}
            </BrandName>
            <BrandDesc>
              {openingData.description}
            </BrandDesc>
          </BrandInfo>
          <Button
            href={`store-main`}>입장하기</Button>
        </OpenningPageContentsContainer>
      </OpenningPageContainer>
    </DefaultLayout >
  );
};

const OpeningImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 0;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top, 
    rgba(0, 0, 0, 1) 0%, 
    rgba(0, 0, 0, .1) 100%
  );
  z-index: 1;
`;

const OpenningPageContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  align-items: flex-end;
  justify-content: flex-end;
  z-index: 1;
`;

const OpenningPageContentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  align-items: flex-end;
  justify-content: flex-end;
  
  gap: 40px;
`;


const BrandInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  gap: 16px;
  color: ${COLORS.greyColor};
`

const BrandIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;

  object-fit: cover;
`


const BrandName = styled.h2`
  font-size: 32px;
  font-weight: 700;
`

const BrandDesc = styled.p`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 550;
  line-height: 160%;
`

const Button = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 16px 0px;
  width: 100%;
  background-color: ${COLORS.mainColor};
  color: ${COLORS.primaryColor};
  font-size: 16px;
  font-weight: 500;
  z-index: 2;
`;

export default OnlinePopUpOpenningPage;
