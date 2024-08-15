"use client";
import styled from "styled-components";
import FOLLOW from "@/public/icons/store_follow.svg";
import GO_BACK from "@/public/icons/gt_white.svg";
import FOLLOWED from "@/public/icons/store_follow_active.svg";
import Link from "next/link";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { COLORS } from "@/public/styles/colors";
import { DefaultLayout } from "@/app/components/layout";
import axiosInstance from "@/public/network/axios";
import { Follow, KRWLocaleString } from "@/public/utils/function";
import { IconBookmark, IconCart } from "@/app/components/icons";

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
  option: string[];
}


const StoreMainPage: React.FC<{ params: { storeId: string } }> = ({ params }) => {
  const { storeId } = params;

  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [brandData, setBrandData] = useState<BrandData>();
  const [productData, setProductData] = useState<ProductData[]>();
  const [savedProducts, setSavedProducts] = useState<{ [key: number]: boolean }>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);

  const updateParentWidth = () => {
    console.log(containerRef.current)
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      console.log("Container width:", width); // 디버깅을 위한 로그 추가
      if (width > 0) {
        setParentWidth((width / 4) * 3);
      }
    }
  };


  useLayoutEffect(() => {
    if (containerRef.current) {
      updateParentWidth();
      window.addEventListener("resize", updateParentWidth);
    }

    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [containerRef.current]);



  useEffect(() => {
    StoreDataGet();
  }, []);


  const storeFollowHandler = () => {
    if (brandData) {
      const updatedSaved = isFollowed ? brandData.saved - 1 : brandData.saved + 1;
      setBrandData({
        ...brandData,
        saved: updatedSaved,
      });
      setIsFollowed(!isFollowed);
      Follow("Brands", brandData.id);
    }
  };

  const StoreDataGet = async () => {
    try {
      const response = await axiosInstance.get(`/api/popup/brand/store/main/${storeId}`)
      if (response.status === 200) {
        console.log(response.data)
        setBrandData(response.data.brand)
        setProductData(response.data.product)
        setIsFollowed(response.data.brand.isSaved)

        const savedStates = response.data.product.reduce((acc: any, product: ProductData) => {
          acc[product.id] = product.isSaved;
          return acc;
        }, {});
        setSavedProducts(savedStates);
      }
    }
    catch (error: any) {
      if (error.response.status === 400) {
        alert('없음')
      }
    }
  }


  const handleBookmarkClick = async (id: number) => {
    const newSavedState = !savedProducts[id];
    setSavedProducts((prev) => ({
      ...prev,
      [id]: newSavedState,
    }));
    Follow("Product", id);
  };

  if (!brandData || !productData) return null;

  return (
    <DefaultLayout top="0" right="0" bottom="0" left="0">

      <StoreThumbnailContainer
        src="/images/dummy_sky.jpeg"
        height={parentWidth}
      />

      <StoreThumbnailNav href={"store-openning"}>
        <GO_BACK />
      </StoreThumbnailNav>

      <Container ref={containerRef}>
        <StoreMainPageContainer>
          <CartButton href={"/mypage/1/my-cart"}>
            <IconCart
              color={COLORS.secondaryColor}
              width={undefined}
              height={undefined} />
          </CartButton>

          <StoreInfoContainer>
            <StoreInfoHeader>
              <StoreName>
                {storeId.toUpperCase()}
              </StoreName>
              <StoreSave
                onClick={() => storeFollowHandler()}>
                {isFollowed ? <FOLLOWED /> : <FOLLOW />}
              </StoreSave>
            </StoreInfoHeader>
            <StoreDesc>
              브랜드설명입니다브랜드설명입니다브랜드설명입니다브랜드설명입니다브랜드설명입니다브랜드설명입니다브랜드설명입니다브랜드설명입니다
            </StoreDesc>
            <BrandFollower>
              이 브랜드를 <span>{KRWLocaleString(brandData.saved)}</span>명의 <span>팝플</span>이 팔로우합니다.
            </BrandFollower>
          </StoreInfoContainer>

          <StoreProductContainer>
            {productData.map((item: ProductData, index: number) => (
              <Product
                key={index}
                href={`product/${item.id}`}
              >
                <ProductThumbnail>
                  <ProductThumbnailImage
                    src={`/images/popping-white.png`}
                  />
                  <ProductBookmark onClick={(event) => {
                    event.stopPropagation();  // 부모 요소로의 이벤트 전파를 막음
                    handleBookmarkClick(item.id);
                  }} >
                    <IconBookmark
                      color={savedProducts[item.id] ? COLORS.mainColor : COLORS.greyColor}
                      width={20}
                      height={27} />
                  </ProductBookmark>
                </ProductThumbnail>

                <ProductTitle>
                  {item.name}
                </ProductTitle>
                <ProductPrice>
                  {KRWLocaleString(item.price)} KRW
                </ProductPrice>
              </Product>
            ))}
          </StoreProductContainer>
        </StoreMainPageContainer>
      </Container>
    </DefaultLayout>

  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  background-color: ${COLORS.primaryColor};

`;

const StoreMainPageContainer = styled.div`
  height: 100%;
  width: calc(100% - 40px);

  padding: 0 20px;
`;

const CartButton = styled(Link)`
  width: 44px;
  height: 44px;

  bottom: 112px;
  right: 20px;
  
  border: 1px solid ${COLORS.greyColor};
  background-color: white;
  border-radius: 50%;
  position: fixed;

  display: flex;

  align-items: center;
  justify-content: center;
  
  z-index: 100;
`

const StoreThumbnailContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StoreThumbnailNav = styled(Link)`

  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  top: 20px;
  left: 20px;

  border-radius: 8px;
  z-index: 1;
`;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  padding-top: 16px;

`;

const BrandFollower = styled.span`
  font-size: 12px;
  color: ${COLORS.secondaryColor};

  & > span {
    font-weight: 600;
  }
`;

const StoreInfoHeader = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;


const StoreName = styled.h2`
  font-size: 32px;
  font-weight: 700;
`;

const StoreSave = styled.span`
`;

const StoreDesc = styled.p`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%;
`;

const StoreProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* 요소들 사이에 8px 간격 설정 */
  justify-content: space-between;
  
  margin-top: 28px;
`;

const Product = styled(Link)`
  cursor: pointer;
  position: relative;

  flex: 0 0 calc(50% - 12px);
  margin-bottom: 20px;
  

  @media (min-width: 768px) {
    flex: 0 0 calc(33.333% - 12px); 
  };

`;

const ProductThumbnail = styled.div`
  position: relative;
`;


const ProductThumbnailImage = styled.img`
  width: 100%; 
  aspect-ratio: 1 / 1; /* 1:1 비율로 설정 */
  object-fit: cover;
  border-radius: 8px;
`;

const ProductBookmark = styled.div`
  position: absolute;
  bottom: 13px;
  right: 12px;
`;

const ProductTitle = styled.h3`
  word-break: break-all;
  white-space: normal;

  font-size: 14px;
  font-weight: 500;
  margin-bottom: 26px;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
  position: absolute; /* 하단 고정을 위한 절대 위치 */
  bottom: 0;
`;


export default StoreMainPage;

