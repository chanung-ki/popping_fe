'use client'

import Back from "@/app/components/back";
import { DefaultLayout } from "@/app/components/layout";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Follow, formatDate, FormatFollowers } from "@/public/utils/function";
import { IconFollow, IconLocation, IconAderessPin, IconViews } from "@/app/components/icons";
import axiosInstance from "@/public/network/axios";
import { PopupStoreDataType } from "@/public/utils/types";
import { useRouter } from "next/navigation";
import { Loading } from "@/app/components/loading";
import dayjs from "dayjs";
import NaverMap from "@/app/components/popup-map/NaverMap";
import Image from "next/image";
import { PlaceDataType } from "@/public/utils/types";
import SurroundRestaurantCard from "@/app/components/popup-map/SurroundRestaurantCard";

const OfflinePopupStoreDetailPage: React.FC<{ params: { popupId: string } }> = ({ params }) => {
  const router = useRouter();
  const { popupId } = params;

  const parentDiv = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const [parentWidth, setParentWidth] = useState<number>(0);
  const [popupData, setPopupData] = useState<PopupStoreDataType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>();
  const [restaurantData, setRestaurantDate] = useState<PlaceDataType[]>([]);
  const [distance, setDistance] = useState<number>(1000);

  const updateParentWidth = () => {
    if (parentDiv.current) {
      setParentWidth((parentDiv.current.offsetWidth / 1) * 1);
    }
  };

  useEffect(() => {
    PopupDetailData();
    const viewPopupList = sessionStorage.getItem('popupViewList')

    if (viewPopupList) {
      const parsedViewPopupList = JSON.parse(viewPopupList);

      if (Array.isArray(parsedViewPopupList) && parsedViewPopupList.includes(popupId)) {

      } else {
        viewCountAPI(parsedViewPopupList);
      }
    } else {
      viewCountAPI([]);
    }
  }, [router]);


  useEffect(() => {
    if (popupData) {
      SurroundPlaceData();
    }
  }, [popupData]);

  useEffect(() => {
    if (restaurantData.length > 0) {
      console.log(restaurantData[0].title);
    }
  }, [restaurantData]);

  useEffect(() => {
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [parentDiv.current]);

  const viewCountAPI = async (parsedViewPopupList: string[]) => {
    try {
      const response = await axiosInstance.get(`/api/maps/view-count/${popupId}`);

      if (response.status === 200) {
        parsedViewPopupList.push(popupId);  // 배열에 popupId 추가
        sessionStorage.setItem('popupViewList', JSON.stringify(parsedViewPopupList));  // 배열을 문자열로 변환하여 저장
      }

    } catch (error) {
      console.error(error);
    }
  }

  const PopupDetailData = async () => {
    try {
      const response = await axiosInstance.get(`/api/maps/popup/${popupId}`);

      if (response.status === 200) {
        setPopupData(response.data.popupData);
        setSaved(response.data.popupData.isSaved);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        // Handle unauthorized error
      }
    } finally {
      setLoading(false);
    }
  };

  //주변 맛집
  const SurroundPlaceData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/maps/surround-place?popupId=${popupId}&meter=${distance}`
      );

      if (response.status === 200) {
        setRestaurantDate(response.data.place);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        // Handle unauthorized error
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DefaultLayout top={0} left={0} right={0} bottom={0}>
        <SkeletonSwiperContainer>
          <SkeletonSlide />
        </SkeletonSwiperContainer>
      </DefaultLayout>
    );
  }
  if (!popupData) return <Loading />;


  const handleBookmarkClick = async (id: string) => {
    setSaved(!saved);
    if (saved) {
      setPopupData({
        ...popupData,
        saveCount: popupData.saveCount - 1,
      });

    } else {
      setPopupData({
        ...popupData,
        saveCount: popupData.saveCount + 1,
      });
    }
    Follow("Popup", id, router);
  };



  const now = dayjs();
  const contractStart = dayjs(popupData.date.start);
  const contractEnd = dayjs(popupData.date.end);

  const isAble = now.isAfter(contractStart) && now.isBefore(contractEnd);

  return (
    <DefaultLayout top={0} left={0} right={0} bottom={0}>
      <SwiperContainer>
        <div style={{ position: 'absolute', zIndex: 2, left: 20, top: 16 }}>
          <Back url={undefined} />
        </div>
        <Swiper
          modules={[Autoplay]}
          direction="horizontal"
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {popupData.image.map((image: string, index: number) => (
            <SwiperSlide key={`popup-image-${index}`}>
              <SlideBannerContainer
                height={parentWidth}
                image={`data:image/webp;base64,${image}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>

      <PopupContainer ref={parentDiv}>
        <PopupInfo>
          <PopupHeader>
            <HeaderLeft>
              <PopupTitle>
                <h3>{popupData.title}</h3>
              </PopupTitle>
              <PopupDate>
                <BrandStateBadge
                  style={{
                    color: isAble ? COLORS.primaryColor : COLORS.secondaryColor,
                    backgroundColor: isAble ? COLORS.mainColor : COLORS.lightGreyColor,
                  }}>
                  {isAble ? '진행중' : now.isBefore(contractStart) ? '진행 예정' : '종료'}
                </BrandStateBadge>
                <span>
                  {formatDate(popupData.date.start)} ~ {formatDate(popupData.date.end)}
                </span>
              </PopupDate>
            </HeaderLeft>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <PopupBookmark
                onClick={(event) => {
                  event.stopPropagation(); // 부모 요소로의 이벤트 전파를 막음
                  handleBookmarkClick(popupId);
                }}
              >
                <IconFollow
                  color={saved ? COLORS.mainColor : COLORS.greyColor}
                  width={20}
                  height={27}
                />
                <span>{FormatFollowers(popupData.saveCount)}</span>
              </PopupBookmark>
              <PopupBookmark>
                <IconViews
                  color={COLORS.greyColor}
                  width={undefined}
                  height={27}
                />
                <span>{FormatFollowers(popupData.viewCount)}</span>
              </PopupBookmark>
            </div>
          </PopupHeader>
          <PopupLocation onClick={() => {
            if (locationRef.current) {
                locationRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
            {/* <IconLocation color={COLORS.greyColor} width={undefined} height={16} /> */}
            {popupData.location.address}
          </PopupLocation>
          <PopupTagContainer>
            {popupData.tag.map((tagName: string, index: number) => (
              <PopupTag key={`tag-${index}`}>{tagName}</PopupTag>
            ))}
          </PopupTagContainer>
        </PopupInfo>
        <PopupContent>
          <PopupContentTitle>설명</PopupContentTitle>
          <PopupDescription>
            {popupData.description.map((text: string, index: number) => (
              text === '\n' ? <br key={index} /> : (
                <span key={`description-${index}`}>{text}</span>
              )
            ))}
          </PopupDescription>
        </PopupContent>



        <PopupContent>
          <PopupContentTitle ref={locationRef}>위치</PopupContentTitle>
          <PopupLocation>
            {popupData.location.address},{popupData.location.placeName}
          </PopupLocation>
          <NaverMap
            latitude={popupData.location.geoData.coordinates[1]}
            longitude={popupData.location.geoData.coordinates[0]}
            title={popupData.title}
          />

        </PopupContent>

        {/* #TODO  */}
        
        <PopupContent>
          <TitleArea>
            <PopupContentTitle ref={locationRef}>
              1km이내 맛집 & 카페
            </PopupContentTitle>
            {/* <div className={"input-container"}>
              <p>0km</p>
              <input type="range" />
              <p>2km</p>
            </div> */}
          </TitleArea>
          <HorizontalList>
            {restaurantData.length > 0 && (
              <>
                {restaurantData.map(
                  (restaurant, index) =>
                    index < 30 && (
                      //30개 제한 출력
                      <SurroundRestaurantCard
                        key={index}
                        restaurantData={restaurant}
                      />
                    )
                )}
              </>
            )}
          </HorizontalList>
        </PopupContent>
      </PopupContainer>
    </DefaultLayout>
  );
};

const BrandStateBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
`;

// Swiper 컨테이너에 대한 스타일링을 추가합니다.
const SwiperContainer = styled.div`
  width: 100%;
  position:relative;
`;

const SlideBannerContainer = styled.div<{ height: number; image: string }>`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 유지 */
  background-image: url(${(props) => props.image});
  background-color: ${COLORS.greyColor};
  background-position: center;
  background-size: cover;
  cursor: grab;
`;

// 스켈레톤 스타일을 추가합니다.
const SkeletonSwiperContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

const SkeletonSlide = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 비율 */
  background-color: ${COLORS.greyColor};
  border-radius: 8px;
`;

// 나머지 스타일링
const PopupContainer = styled.div`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  background-color: ${COLORS.primaryColor};
  gap: 40px;
  padding-left: 20px;
  padding-bottom: 80px;
`;

const PopupInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PopupHeader = styled.div`
  width: calc(100% -20px);
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin-top: 24px;
  align-items: flex-start;
  justify-content: space-between;
  padding-right: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`;

const PopupLocation = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${COLORS.greyColor};
  font-size: 12px;
  font-weight: 500;
`;

const PopupTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-bottom: 5px;

  & > h3 {
    font-size: 20px;
    font-weight: 600;
    word-break: break-all;
  }

`;

const PopupDate = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  & > span {
    font-size: 16px;
    font-weight: 500;
  }
`;

const PopupBookmark = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;

  & > span {
    font-weight: 600;
  }
`;


const PopupTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  flex-wrap: nowrap;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PopupTag = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border-radius: 16px;
  border: 1px solid ${COLORS.greyColor};
  padding: 8px 20px;
  box-sizing: border-box;

  font-size: 14px;
  font-weight: 500;
`;

const PopupContent = styled.div`
    width: calc(100% - 20px);
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: center;

  gap: 16px;
  padding-right: 20px;
`;

const PopupContentTitle = styled.p`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  gap: 8px;

  padding-right: 20px;
`;

const PopupDescription = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* background-color: ${COLORS.lightGreyColor}; */
  padding: 0;
  /* border-radius: 8px; */

  & span {
    font-size: 14px;
    line-height: 120%;
  }
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  .input-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const HorizontalList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 16px;

  width: 100%;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default OfflinePopupStoreDetailPage;
