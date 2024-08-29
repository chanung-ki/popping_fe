'use client'

import Back from "@/app/components/back";
import { DefaultLayout } from "@/app/components/layout";
import { COLORS } from "@/public/styles/colors";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FormatFollowers, KRWLocaleString } from "@/public/utils/function";
import { IconBookmark, IconFollow, IconLocation, IconMarker } from "@/app/components/icons";
import axiosInstance from "@/public/network/axios";
import { PopupStoreDataType } from "@/public/utils/types";
import { useRouter } from "next/navigation";
import { Loading } from "@/app/components/loading";

const OfflinePopupStoreDetailPage: React.FC<{ params: { popupId: string } }> = ({ params }) => {
  const router = useRouter();
  const { popupId } = params;


  const parentDiv = useRef<HTMLDivElement>(null);

  const [parentWidth, setParentWidth] = useState<number>(0);
  const [popupData, setPopupData] = useState<PopupStoreDataType>();

  const updateParentWidth = () => {
    if (parentDiv.current) {
      setParentWidth((parentDiv.current.offsetWidth / 1) * 1);
    }
  };

  useEffect(() => {
    PopupDetailData();
  }, [router])

  useEffect(() => {
    console.log(popupData)
  }, [popupData])

  useEffect(() => {
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [parentDiv]);

  const PopupDetailData = async () => {
    try {
      const response = await axiosInstance.get(`/api/maps/popup/${popupId}`)

      if (response.status === 200) {
        setPopupData(response.data.popupData);
      }
    }
    catch (error: any) {
      if (error.response.status === 401) {

      }
    }

  }

  const locationClickHandler = () => {

  }

  if (!popupData) return <Loading />
  return (
    <DefaultLayout top={0} left={0} right={0} bottom={0}>
      <SwiperContainer>
        <div style={{ position: 'absolute', zIndex: 2, left: 20, top: 16 }}>
          <Back url={undefined} />
        </div>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          direction="horizontal"
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
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
                <PopupLocation onClick={locationClickHandler}>
                  <IconLocation color={COLORS.greyColor} width={undefined} height={16} />
                  {popupData.location.address}
                </PopupLocation>
                <h3>{popupData.title}</h3>
              </PopupTitle>
              <PopupDate>
                {KRWLocaleString(1)} KRW
                <span>배송비 무료</span>
              </PopupDate>
            </HeaderLeft>
            <PopupBookmark
            // onClick={(event) => {
            //   event.stopPropagation(); // 부모 요소로의 이벤트 전파를 막음
            //   handleBookmarkClick(productData.id);
            // }}
            >
              <IconFollow
                // color={saveState ? COLORS.mainColor : COLORS.greyColor}
                color={COLORS.mainColor}
                width={20}
                height={27}
              />
              <span>{FormatFollowers(1)}</span>
            </PopupBookmark>
          </PopupHeader>
        </PopupInfo>
      </PopupContainer>

    </DefaultLayout>
  );
}


const SwiperContainer = styled.div`
  width: 100%;

  position:relative;
`;

const SlideBannerContainer = styled.div<{ height: number; image: string }>`
  width: 100%;
  height: ${(props) => props.height}px;
  background: ${(props) =>
    props.image
      ? `url(${props.image})`
      : COLORS.greyColor};
  background-position: center;
  background-size: cover;
  cursor: grab;
`;

const PopupContainer = styled.div`
  width: calc(100% - 20px);

  display: flex;
  flex-direction: column;

  align-items: start;
  position: relative;

  background-color: ${COLORS.primaryColor};

  gap: 24px;
  padding-left: 20px;
  padding-bottom: 80px;
`

const PopupInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 24px;
`

const PopupHeader = styled.div`
  width: calc(100% -20px);
  display: flex;
  flex-direction: row;

  gap: 32px;
  margin-top: 24px;

  align-items: flex-start;
  justify-content: space-between;
  padding-right: 20px;
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: center;
  gap: 20px;
`;

const PopupLocation = styled.h5`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  color: ${COLORS.greyColor};

  font-size: 12px;
  font-weight: 500;
`

const PopupTitle = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  gap: 8px;

  & > h3 {
    font-size: 20px;
    font-weight: 500;
    word-break: break-all;
  }
`;

const PopupDate = styled.span`
  gap: 4px;
  font-size: 20px;
  font-weight: 700;

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



export default OfflinePopupStoreDetailPage;