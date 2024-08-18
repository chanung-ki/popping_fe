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
import { Follow, FormatFollowers, KRWLocaleString } from "@/public/utils/function";
import { IconBookmark, IconCart, IconChevronLeft, IconFollow } from "@/app/components/icons";
import { BrandType, ProductType } from "@/public/utils/types";
import Back from "@/app/components/back";
import StoreDecisionButton from "@/app/components/online-popup/decisionButton";
import { useSelector } from "react-redux";
import CartButton from "@/app/components/online-popup/cartButton";


const StoreMainPage: React.FC<{ params: { storeId: string } }> = ({ params }) => {
  const { storeId } = params;
  const { isPopper } = useSelector((state: any) => state.poppingUser.user);


  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [brandData, setBrandData] = useState<BrandType>();
  const [productData, setProductData] = useState<ProductType[]>();
  const [savedProducts, setSavedProducts] = useState<{ [key: number]: boolean }>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);

  const updateParentWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
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

        const savedStates = response.data.product.reduce((acc: any, product: ProductType) => {
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
      <div style={{ position: 'absolute', top: 16, left: 20 }}>
        <Back
          url={'store-openning'}
          color={undefined} />
      </div>

      <Container ref={containerRef}>
        <StoreThumbnailContainer
          src={brandData.thumbnail}
          height={parentWidth}
        />

        <StoreMainPageContainer>
          <CartButton />
          <StoreInfoContainer>
            <StoreInfoHeader>
              <StoreName>
                {storeId.toUpperCase()} STORE
              </StoreName>
              <StoreDesc>
                {brandData.description}
              </StoreDesc>
            </StoreInfoHeader>

            <StoreSave
              onClick={() => storeFollowHandler()}>
              {isFollowed ? <IconFollow color={COLORS.mainColor} width={undefined} height={30} /> : <IconFollow color={COLORS.greyColor} width={undefined} height={30} />}
              <span>
                {FormatFollowers(brandData.saved)}
              </span>
            </StoreSave>

          </StoreInfoContainer>
          {isPopper && (
            <PopperManageContainer>
              <FollowerUpdate>
                어제보다 <span>300</span>명 늘었어요
              </FollowerUpdate>
              <StoreDecisionButton
                isVisible={true}
                title="스토어 관리"
                onClick={() => alert('test')}
                sort="right"
              />
            </PopperManageContainer>
          )}

          <StoreProductContainer>
            {productData.map((item: ProductType, index: number) => (
              <Product
                key={index}
                href={`product/${item.id}`}
              >
                <ProductThumbnail>
                  <ProductThumbnailImage
                    src={item.thumbnail}
                  />
                  <ProductBookmark onClick={(event) => {
                    event.stopPropagation();
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
  height: 100dvh;
  width: 100%;
  background-color: ${COLORS.primaryColor};
`;

const StoreMainPageContainer = styled.div`
  height: 100%;
  width: calc(100% - 40px);

  padding: 0 20px;
  padding-bottom: 80px;
`;

const StoreThumbnailContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  gap: 8px;
  padding-top: 20px;
`;


const StoreInfoHeader = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;


const StoreName = styled.h2`
  font-size: 32px;
  font-weight: 600;
`;

const StoreSave = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 4px;
  font-size: 12px;
  font-weight: 500;

  & > span {
    font-weight: 600;
  }
`;

const StoreDesc = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
  `;


const PopperManageContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  margin-top: 12px;
`

const FollowerUpdate = styled.p`
  font-size: 14px;
  font-weight: 600;
  & > span {
  color: ${COLORS.mainColor};
  }
`

const StoreProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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
  margin-bottom: 8px;
`;


const ProductThumbnailImage = styled.img`
  width: 100%; 
  aspect-ratio: 1 / 1;
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

