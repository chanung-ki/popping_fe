"use client";
import styled from "styled-components";
import { DefaultLayout } from "@/app/components/layout";
import { useRouter, useSearchParams } from "next/navigation";
import { COLORS } from "@/public/styles/colors";
import { IconChevronLeft } from "@/app/components/icons";
import axiosInstance from "@/public/network/axios";
import React, { useEffect, useState } from "react";
import { PopupStoreSimpleData, user } from "@/public/utils/types";
import StoreCardList from "@/app/components/popup-map/StoreCardList"; 
import { useSelector } from "react-redux";
import { Loading } from "@/app/components/loading";

const MapSearchResultPage: React.FC = () => {
  const userData: user = useSelector((state: any) => state.poppingUser.user);
  const router = useRouter();
  const params = useSearchParams();

  const [storeList, setStoreList] = useState<PopupStoreSimpleData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchParam = params.get('search');
  const locationParam = params.get('location');

  const popupStoreAPI = async () => {

    if (locationParam) {
      var district = locationParam.split(" ")[1];
      var APIurl = `/api/maps/off-popups?district=${district}&search=${searchParam}`;
    }else{
      var APIurl = `/api/maps/off-popups?search=${searchParam}`;
    }


    await axiosInstance
      .get(APIurl)
      .then((response: any) => {
        setStoreList(response.data.popupStores);
        setIsLoading(false)
      })
      .catch((error: any) => {
        console.error("There was an error making the GET request!", error);
      });
  };

  useEffect(() => {
    popupStoreAPI();
  },[router])

  return (
    <DefaultLayout top={0} bottom={0} left={0} right={0}>
      {isLoading ? (
        <Loading />
      ):(
        <Container>
          <ResultHeader>
            <ResultHeaderContents>
              <div
                onClick={() => {
                  router.push("/popup-map");
                }}
              >
                <IconChevronLeft
                  width={9}
                  height={16}
                  color={COLORS.secondaryColor}
                />
              </div>
              {locationParam ? (
                <p>
                  {locationParam}의 &quot;{searchParam}&quot; 검색 결과
                </p>
              ):(
                <p>
                  {searchParam}&quot; 검색 결과
                </p>
              )}
              <SlideBottomMenu>
                <StoreInformationList>
                  <StoreCardList
                    storeList={storeList}
                    isPopper={userData.isPopper}
                  />
                </StoreInformationList>
              </SlideBottomMenu>
            </ResultHeaderContents>
          </ResultHeader>
        </Container>

      )}
    </DefaultLayout>
  );
};

const SlideBottomMenu = styled.div`
  position: fixed;
  z-index: 101;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  max-width: 600px;
  height: 95%;

  /* border-radius: 16px 16px 0px 0px; */
  background-color: ${COLORS.whiteColor};

  /* transition: height 0.3s ease, transform 0.3s ease; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; */
`;

const StoreInformationList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 40px;
  overflow-y: auto;
  width: 100%;
  padding-bottom: 40px;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;
  background-color: ${COLORS.whiteColor};
`;

const ResultHeader = styled.div`
  position: absolute;
  z-index: 1;
  top: 16px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 20px;
  width: calc(100% - 40px);
  height: 32px;

  & > p {
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const ResultHeaderContents = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  gap: 50px;
`;

const LocationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 21px;

  margin-top: 32px;
  width: 100%;
`;
export default MapSearchResultPage;
