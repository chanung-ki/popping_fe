import { COLORS } from "@/public/styles/colors";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { TopNavigation } from "../navigation/topnavigation";
import { LogoLettersMain } from "../components/logo";
import axiosInstance from "@/public/network/axios";
import { useRouter } from "next/navigation";
import { SubwayMap, MainSortedData } from "@/public/utils/types";
import PopupCard from "../components/main/popupCardComponents";

import DummyBanner1 from "@/public/images/dummy/dummy_banner1.jpg";
import DummyBanner2 from "@/public/images/dummy/dummy_banner2.jpg";
import DummyBanner3 from "@/public/images/dummy/dummy_banner3.jpg";

import DummyPlace1 from "@/public/images/dummy/dummy_place1.png";
import DummyPlace2 from "@/public/images/dummy/dummy_place2.png";
import DummyPlace3 from "@/public/images/dummy/dummy_place3.png";
import DummyPlace4 from "@/public/images/dummy/dummy_place4.png";

import DummyStore from "@/public/images/dummy/dummy_store.jpg";
import { BottomBox, DefaultLayout } from "../components/layout";
import Router from "@/node_modules/next/router";

const subway: SubwayMap = {
  성수역: [127.055983543396, 37.54457732085582],
  강남역: [127.02761650085449, 37.49796319921411],
  잠실역: [127.10013270378113, 37.5132661890097],
  용산역: [126.96480184793472, 37.52988484762269],
  여의도역: [126.92406177520752, 37.52163980072133],
  홍대입구역: [126.925950050354, 37.55811021038101],
  압구정역: [127.02849626541138, 37.52633678124275],
  삼성역: [127.06318259239197, 37.50887477317293],
};

const HomePage = () => {
  const router = useRouter();
  const parentDiv = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [sortPopularity, setSortPopularity] = useState<MainSortedData[] >([]);
  const [sortDate, setSortDate] = useState<MainSortedData[] >([]);


  const updateParentWidth = () => {
    if (parentDiv.current) {
      setParentWidth((parentDiv.current.offsetWidth / 4) * 3);
    }
  };

  const handlePlaceClick = async (value: string) => {
    
    const geoData = subway[`${value}`]

    try {
      const response = await axiosInstance.get(`/api/maps/surround-popup?geoX=${geoData[0]}&geoY=${geoData[1]}&sorted=distance&meter=1000`);

      if (response.status === 200 ){
        sessionStorage.setItem('popupStores', JSON.stringify(response.data.popupStores));
        router.push("/popup-map?hotPlace=true");
      }
    }catch{

    }

  };

  const popupCardListAPI = async () => {
    
    try {
      const response = await axiosInstance.get(`/api/maps/main-popups`);

      if (response.status === 200 ){
        setSortPopularity(response.data.sortPopularity)
        setSortDate(response.data.sortDate)
      }
    }catch{

    }

  };

  useEffect(()=>{
    popupCardListAPI()
  },[])

  useEffect(() => {
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [parentDiv]);

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0}>
      <TopNavigation>
        <TopNavLogoContainer>
          <LogoLettersMain width={undefined} height={24} />
        </TopNavLogoContainer>
      </TopNavigation>

      <Container ref={parentDiv}>
        {/* 배너 */}
        <SwiperContainer>
          <Swiper
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <SlideBannerContainer
                height={parentWidth}
                image={DummyBanner2.src}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SlideBannerContainer
                height={parentWidth}
                image={DummyBanner1.src}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SlideBannerContainer
                height={parentWidth}
                image={DummyBanner3.src}
              />
            </SwiperSlide>
          </Swiper>
        </SwiperContainer>

        <Sections>
          <Section>
            <p>HOT PLACE</p>
            <ContentsContainer>
              <Place image={DummyPlace1.src} onClick={() => handlePlaceClick('성수역')}/>
              <Place image={DummyPlace2.src} onClick={() => handlePlaceClick('강남역')}/>
              <Place image={DummyPlace3.src} onClick={() => handlePlaceClick('잠실역')}/>
              {/* <Place image={DummyPlace4.src} onClick={() => handlePlaceClick('value')}/> */}
            </ContentsContainer>
          </Section>

          <PopupCard
            title="인기 팝업스토어"
            storeData={sortPopularity}
          />
          <PopupCard
            title="새로운 팝업스토어"
            storeData={sortDate}
          />
          
        </Sections>
      </Container>
      <BottomBox />
    </DefaultLayout>
  );
};

const TopNavLogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: auto;
  height: 24px;

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background: ${COLORS.primaryColor};
`;

const SwiperContainer = styled.div`
  width: 100%;
`;

const SlideBannerContainer = styled.div<{ height: number; image: string }>`
  width: 100%;
  height: ${(props) => props.height}px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  background-position: center;
  background-size: cover;

  cursor: grab;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;

  margin: 36px 0 0 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  flex-wrap: nowrap;
  /* overflow-x: scroll; */

  div:last-child {
    margin-right: 16px;
  }
`;

const Place = styled.div<{ image: string | null }>`
  flex: 0 0 auto;

  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  background-position: center;
  background-size: cover;

  cursor: pointer;
`;

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StoreImage = styled.div<{ image: string | null }>`
  flex: 0 0 auto;

  width: 120px;
  height: 120px;
  border-radius: 8px;
  background: ${(props) =>
    props.image ? `url(${props.image})` : COLORS.greyColor};
  background-position: center;
  background-size: cover;

  cursor: pointer;
`;

const StoreDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  p:first-child {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  p:last-child {
    color: ${COLORS.greyColor};
    font-family: "Pretendard";
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export default HomePage;
