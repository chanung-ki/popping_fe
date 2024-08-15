'use client'

import { IconBookmark, IconChevronLeft } from "@/app/components/icons";
import { DefaultLayout } from "@/app/components/layout";
import axiosInstance from "@/public/network/axios";
import { COLORS } from "@/public/styles/colors";
import { Follow, KRWLocaleString } from "@/public/utils/function";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface BrandData {
  id: number;
  logo: string;
  name: string;
  proceeding: boolean;
  conditions: {};
  saved: number;
  isSaved: boolean;
}

interface ProductData {
  id: number;
  brandFK: BrandData;
  description: string;
  name: string;
  option: Option[];
  price: number;
  productInvoice: string;
  createdAt: string;
  updatedAt: string;
  saved: number;
  view: number;
  isSaved: boolean;
}

interface Option {
  name: string;
  option: Size[];
}

interface Size {
  name: string;
  length: number;
  chest: number;
  sleeve: number
}



const OnlinePopupProductPage: React.FC<{ params: { storeId: string, product: number } }> = ({ params }) => {
  const { storeId, product } = params;

  const [productData, setProductData] = useState<ProductData>();
  const [saveState, setSaveState] = useState<boolean>();
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (storeId && product) {
      ProductDataGetAPI()
    }
  }, [storeId, product])


  const ProductDataGetAPI = async () => {
    try {
      const response = await axiosInstance.get(`/api/popup/product/data/${storeId}/${product}`)

      if (response.status === 200) {
        console.log(response.data)
        setProductData(response.data)
        setSaveState(response.data.isSaved)

      }
    }
    catch (e: any) {
      if (e.response.sataus != 401) {
      }
    }
  }

  const handleBookmarkClick = async (id: number) => {
    const newSavedState = !saveState;
    if (productData) {
      setProductData({
        ...productData,
        isSaved: newSavedState
      });
    }
    Follow("Product", id);
  };


  const handleOptionChange = (optionName: string, selectedOption: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: selectedOption,
    });
  };



  if (!productData) return null;

  const sizeOptions = productData?.option.find(option => option.name.toLowerCase() === "size");

  return (
    <DefaultLayout top="0" right="0" bottom="0" left="0">
      <ChevronLeft href={"../store-main"}>
        <IconChevronLeft
          color={COLORS.secondaryColor}
          width={undefined}
          height={16} />
      </ChevronLeft>

      <ProductContainer>
        <Product>
          <ProductThumbnailImg
            src="/images/gray.png" />
          <ProductBookmark onClick={(event) => {
            event.stopPropagation();  // 부모 요소로의 이벤트 전파를 막음
            handleBookmarkClick(productData.id);
          }} >
            <IconBookmark
              color={productData.isSaved ? COLORS.mainColor : COLORS.greyColor}
              width={20}
              height={27} />
          </ProductBookmark>
        </Product>

        <ProductInfo>
          <ProductHeader>

            <ProductTitle>
              {productData.name}
            </ProductTitle>
            <ProductPrice>
              {KRWLocaleString(productData.price)} KRW
            </ProductPrice>
            <ProductSave>
              이 상품을 <span>{KRWLocaleString(productData.saved)}</span>명의 <span>팝플</span>이 저장합니다.
            </ProductSave>
          </ProductHeader>




          <ProductOptionContainer>
            {productData.option.map((data: Option, index: number) => (
              <ProductOption key={index}>
                <ProductOptionTitle>
                  <span>
                    {data.name}
                  </span>
                  {data.name.toLowerCase() === "size" && (
                    <SizeGuide href="#sizeGuide">사이즈 가이드 ⓘ</SizeGuide>
                  )}
                </ProductOptionTitle>
                <ProductOptionContent>
                  {data.option.map((option: Size, optionIndex: number) => (
                    <RadioLabel key={optionIndex}>
                      <RadioButton
                        type="radio"
                        name={data.name}
                        value={option.name}
                        checked={selectedOptions[data.name] === option.name}
                        onChange={() => handleOptionChange(data.name, option.name)}
                      />
                      {option.name}
                    </RadioLabel>
                  ))}
                </ProductOptionContent>
              </ProductOption>
            ))}

            <ProductOptionContent>
              <ProductOptionTitle>
                DETAILS
              </ProductOptionTitle>
              <ProductDescription>
                {productData.description}
              </ProductDescription>
            </ProductOptionContent>

            {sizeOptions && sizeOptions.option && (
              <>
                <ProductOptionContent>
                  <ProductOptionTitle id="sizeGuide">
                    SIZE GUIDE
                  </ProductOptionTitle>
                  <SizeGuideTable>
                    <thead>
                      <tr>
                        <th>cm</th>
                        <th>총장</th>
                        <th>가슴단면</th>
                        <th>소매길이</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeOptions.option.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.length}</td>
                          <td>{item.chest}</td>
                          <td>{item.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </SizeGuideTable>
                </ProductOptionContent>
              </>
            )}
          </ProductOptionContainer>
        </ProductInfo>


      </ProductContainer>
    </DefaultLayout >
  );
};


const ChevronLeft = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  z-index: 1;

  margin: 16px;
`;

const ProductContainer = styled.div`
  width: calc(100% - 32px);

  display: flex;
  flex-direction: column;

  background-color: ${COLORS.primaryColor};

  gap: 24px;
  padding: 0 16px;
  padding-bottom: 32px;
`

const Product = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

const ProductThumbnailImg = styled.img`
  border-radius: 8px;
`

const ProductBookmark = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 32px;
`

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`
const ProductSave = styled.p`
  font-size: 12px;
  color: ${COLORS.secondaryColor} !important;
  font-weight: 400;

  & > span {
    font-weight: 500;
  }
`

const ProductTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: 600;
`;


const ProductOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  justify-content: center;

  gap: 32px;
`

const ProductOption = styled.div`
  display: flex;
  flex-direction: column;

  gap:16px;
`

const ProductOptionTitle = styled.p`
display: flex;
align-items: center;
  font-size: 18px;
  font-weight: 500;
  gap: 8px;
`

const SizeGuide = styled.a`
  font-size: 10px;
  font-family: "Pretendard";
  font-weight: 500;
  color: ${COLORS.greyColor};
  width: 67px;
  height: 12px;
`;

const ProductOptionContent = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: center;

  gap: 16px;
`;


const RadioButton = styled.input.attrs({ type: 'radio' })`
  margin: 0;
  margin-right: 8px;
  appearance: none; // 기본 라디오 버튼 스타일을 없애기 위해 사용
  width: 16px;
  height: 16px; 
  background-color: ${COLORS.primaryColor};
  border: 1px solid ${COLORS.greyColor};
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: ${COLORS.mainColor}; // 체크된 상태의 배경색 변경
    border-color: ${COLORS.mainColor}; // 체크된 상태의 테두리 색 변경
  }

  &:checked::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`;

const ProductDescription = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 160%;
  white-space: pre-line; /* 줄 바꿈을 그대로 반영 */
`

const SizeGuideTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  th, td {
    padding: 8px;
    text-align: center;
    border: 1px solid ${COLORS.greyColor};
  }

  th {
    background-color: ${COLORS.primaryColor};
    color: ${COLORS.secondaryColor};
    font-weight: 500;
    font-size: 14px;
  }

  td {
    background-color: white;
    color: ${COLORS.secondaryColor};
    font-size: 14px;
  }

  thead tr {
    background-color: ${COLORS.primaryColor};
  }

  tbody tr:nth-child(odd) {
    background-color: ${COLORS.lightGreyColor};
  }

  tbody tr:nth-child(even) {
    background-color: white;
  }
`;

export default OnlinePopupProductPage;
