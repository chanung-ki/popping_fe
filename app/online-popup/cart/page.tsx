'use client'

import Back from "@/app/components/back";
import { DefaultLayout } from "@/app/components/layout";
import StoreDecisionButton from "@/app/components/online-popup/decisionButton";
import PopupHeader from "@/app/components/online-popup/header";
import HorizontalCard from "@/app/components/online-popup/horizontalCard";
import axiosInstance from "@/public/network/axios";
import { COLORS } from "@/public/styles/colors";
import { MobileMaxWidth, MobileMinWidth } from "@/public/styles/size";
import { CartType } from "@/public/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const test = {
  color: 'black',
  size: 'XL',
  amount: 1
};

const MyCartPage: React.FC = () => {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [brandName, setBrandName] = useState<string>();
  const [cartData, setCartData] = useState<CartType[]>();
  const [cartLen, setCartLen] = useState<number>(0);


  const handleCheckboxChange = (index: number, selected: boolean) => {
    setSelectedCards(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (selected) {
        newSelected.add(index);
      } else {
        newSelected.delete(index);
      }
      return newSelected;
    });
  };

  const Payment = () => {
    router.push(`payment`);
  };

  useEffect(() => {
    CartDataGetAPI();
  }, [])

  const CartDataGetAPI = async () => {
    try {
      const response = await axiosInstance.get(`/api/popup/cart/data`)

      if (response.status === 200) {
        setBrandName(response.data.brand)
        setCartData(response.data.cart)
        setCartLen(response.data.cart.length)
      }
    }

    catch (error: any) {
      if (error.response.status === 401) {
        alert("로그인 후 이용가능합니다.");
        router.push("/member/signin");
      }
    }
  }

  const decreaseCartLen = () => {
    setCartLen(prevLen => prevLen - 1);
  };

  if (!cartData || !brandName) return null

  return (
    <DefaultLayout top="16px" right="20px" bottom="0" left="20px">
      <Back url={undefined} color={undefined} />
      <Container>
        <PopupHeader main={'장바구니'} sub={`${brandName} STORE`} />
        <Content>
          {cartLen === 0 && (
            <EmptyCart><span>장바구니가 비어있어요!</span></EmptyCart>
          )}
          {cartLen !== 0 && cartData.map((data: CartType, index: number) => (
            <HorizontalCard
              setCartLen={decreaseCartLen}
              isPayment={false}
              key={index}
              data={data}
              brand={brandName}
              onCheckboxChange={(selected) => handleCheckboxChange(index, selected)}
            />
          ))}
        </Content>
        <BottomButtonContainer isVisible={selectedCards.size > 0}>
          <StoreDecisionButton
            isVisible={selectedCards.size > 0}
            onClick={Payment}
            sort={undefined}
            title={`주문하기`}
          />
        </BottomButtonContainer>
      </Container>
    </DefaultLayout>
  );
};

const BottomButtonContainer = styled.div<{ isVisible: boolean }>`
  width: 100%;
  min-width: ${MobileMinWidth}px;
  max-width: ${MobileMaxWidth}px;

  display: flex;
  flex-direction: row;

  gap: 20px;
  padding: 0 20px;

  position: fixed;

  left: 50%;
  bottom: 32px;
  transform: translate(-50%, 0);

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
`;
const Container = styled.div`
  height: calc(100dvh - 36px); 
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.primaryColor};

  gap: 40px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  gap: 20px;
`;

const EmptyCart = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, 0);

  & > span {
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.greyColor}
  }
`

export default MyCartPage;