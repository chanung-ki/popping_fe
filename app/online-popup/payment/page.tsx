'use client'
import Back from "@/app/components/back";
import { IconPlus } from "@/app/components/icons";
import { DefaultLayout } from "@/app/components/layout";
import StoreDecisionButton from "@/app/components/online-popup/decisionButton";
import PopupHeader from "@/app/components/online-popup/header";
import HorizontalCard from "@/app/components/online-popup/horizontalCard";
import axiosInstance from "@/public/network/axios";
import { COLORS } from "@/public/styles/colors";
import { FormatTelHyphen, KRWLocaleString } from "@/public/utils/function";
import { CartType } from "@/public/utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Payment: React.FC = () => {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [brandName, setBrandName] = useState<string>();
  const [cartData, setCartData] = useState<CartType[]>();
  const [value, setValue] = useState<number>(20000000000000000000);

  useEffect(() => {
    CartDataGetAPI();
  }, [])

  const CartDataGetAPI = async () => {
    try {
      const response = await axiosInstance.get(`/api/popup/cart/data`)

      if (response.status === 200) {
        setBrandName(response.data.brand)
        setCartData(response.data.cart)
      }
    }
    catch (error: any) {
      if (error.response.status === 401) {
        alert("로그인 후 이용가능합니다.");
        router.push(
          `/member/signin?redirect=${encodeURIComponent(
            window.location.pathname
          )}`
        );
      }
    }
  }

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


  if (!cartData || !brandName) return null;

  return (
    <DefaultLayout top="16px" right="20px" bottom="0" left="20px">
      <Back url={undefined} color={undefined} />
      <Container>
        <PopupHeader main={'주문'} sub={`${brandName} STORE`} />

        {/* Payment Product Section */}
        <Section>
          <PopupHeader section={`상품`} />
          {cartData.map((data: CartType, index: number) => (
            <HorizontalCard
              brand={brandName}
              isPayment={true}
              key={index}
              data={data}
              onCheckboxChange={(selected) => handleCheckboxChange(index, selected)}
            />
          ))}
        </Section>
        {/* END, Payment Product Section */}

        {/* CS(Delivery address) User Data Section */}
        <Section>
          <PopupHeader section={`배송지`} />
          {/* user Delivery Address */}
          <Contents>
            <ContentsHeader>
              <AddressBadge>
                <span>
                  집
                </span>
              </AddressBadge>
              <AddressEditButton href={'#'}>
                주소 변경
              </AddressEditButton>
            </ContentsHeader>
            <ContentsBody>
              <Name>김태은</Name>
              <Tel>{FormatTelHyphen('01012341234')}</Tel>
              <Address>경기도 안양시 어딘가 너의 마음속에 있지 않을까하는 동네
                102동 1022호</Address>
              <DeliveryRequestTextArea
                placeholder="배송 요청사항을 입력하세요..." />

            </ContentsBody>
          </Contents>

        </Section>
        {/* END, CS(Delivery address) User Data Section */}


        <Section>
          <PopupHeader section={`콘`} />
          <Point>
            <PointInput
              placeholder="사용하실 콘을 입력하세요..."
              value={KRWLocaleString(value)} // 포맷팅된 값을 value로 전달
              onChange={(e) => setValue(Number(e.target.value.replace(/[^0-9]/g, '')))} // 숫자만 추출하여 업데이트
            />
            <span>
              보유 콘 : 200콘
            </span>
          </Point>
        </Section>

        <Section>
          <PopupHeader section={`적립`} />
          <OneByOne>
            <Guide>등급 적립 ⓘ</Guide>
            <ExpectedPoint>{KRWLocaleString(1000000)}원</ExpectedPoint>
          </OneByOne>
        </Section>

        <Section>
          <PopupHeader section={`결제 금액`} />

          <OneByOne>
            <Simple>상품 금액</Simple>
            <Simple>{KRWLocaleString(1000000)}원</Simple>
          </OneByOne>

          <OneByOne>
            <Guide>할인 금액 ⓘ</Guide>
            <Simple>{KRWLocaleString(1000000)}원</Simple>
          </OneByOne>

          <OneByOne>
            <Simple>사용 콘</Simple>
            <Simple>{KRWLocaleString(1000000)}콘</Simple>
          </OneByOne>

          <OneByOne>
            <Simple>배송비</Simple>
            <Simple>무료</Simple>
          </OneByOne>

          <FinalOneByOne>
            <Strong>총 결제 금액</Strong>
            <Strong>{KRWLocaleString(1000000)}원</Strong>
          </FinalOneByOne>
        </Section>

        <StoreDecisionButton
          isVisible={true}
          onClick={() => alert('test')}
          sort={'right'}
          title={`${KRWLocaleString(1000000)}원 결제하기`}
        />

      </Container>
    </DefaultLayout>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.primaryColor};

  gap: 40px;
  padding-bottom: 80px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;
`

const Contents = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`

const ContentsHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  align-items: center;
`

const AddressBadge = styled.button`
  cursor: pointer;

  background-color: ${COLORS.mainColor};
  border: none;
  border-radius: 4px;

  padding: 3px 11px;
  
  & > span {
    font-size: 12px;
    font-weight: 600;
    color: ${COLORS.primaryColor};
  }
`

const AddressEditButton = styled(Link)`
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  color: ${COLORS.greyColor};
`

const ContentsBody = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`

const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
`

const Tel = styled.p`
  font-size: 12px;
  font-weight: 500;
`

const Address = styled.p`
  font-size: 12px;
  font-weight: 500;
`

const DeliveryRequestTextArea = styled.textarea`
  height: 52px;
  padding: 8px;

  border: none;
  resize: none;
  /* box-shadow: 0 0 2px ${COLORS.greyColor} inset; */
  border: 1px solid ${COLORS.greyColor};
  border-radius: 4px;

  box-sizing: border-box;
  font-size: 10px;
  
  &::placeholder { 
    font-family: 'Pretendard';
    color: ${COLORS.secondaryColor};
    font-weight: 400; 
  }
  outline:none;
  &:focus {
    border: 1px solid ${COLORS.mainColor};
    border-radius: 4px;
  }
`

const Point = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;

  & > span {
    font-size: 12px;
    font-weight: 500;
  }
`

const PointInput = styled.input`
  font-size: 12px;
  border: none;
  border: 1px solid ${COLORS.greyColor};
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  outline:none;
  font-family: 'Pretendard';

  &:focus {
    border: 1px solid ${COLORS.mainColor};
    border-radius: 4px;
  }
`

const OneByOne = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`

const FinalOneByOne = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

`

const Strong = styled.div`
  font-size: 12px;
  font-weight: 600;
`

const Simple = styled.div`
  font-size: 12px;
  font-weight: 500;
`

const Guide = styled.div`
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
`

const ExpectedPoint = styled.span`
  font-size: 12px;
  font-weight: 500;
`


export default Payment;
