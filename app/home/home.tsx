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

import DummyStore from "@/public/images/dummy/dummy_store.jpg";
import { BottomBox, DefaultLayout } from "../components/layout";
import Router from "@/node_modules/next/router";
import CustomJoyride from "../components/tour/CustomJoyride";
import { CallBackProps, STATUS, Step } from "react-joyride";
import { TourContainer } from "../components/tour/TourStyle";

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

const HomePage: React.FC = () => {
  const router = useRouter();
  const parentDiv = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const hotPlaceRef = useRef<HTMLDivElement>(null);
  const famousPopupRef = useRef<HTMLDivElement>(null);
  const newPopupRef = useRef<HTMLDivElement>(null);

  const joyrideStatusKey = `joyride_status_home`;

  const [parentWidth, setParentWidth] = useState<number>(0);
  const [sortPopularity, setSortPopularity] = useState<MainSortedData[]>([]);
  const [sortDate, setSortDate] = useState<MainSortedData[]>([]);
  const [joyrideRun, setJoyrideRun] = useState<boolean>(false);
  const [steps, setSteps] = useState<Step[]>([]);

  const updateParentWidth = () => {
    if (parentDiv.current) {
      setParentWidth((parentDiv.current.offsetWidth / 4) * 3);
    }

  };

  const handlePlaceClick = async (value: string) => {

    const geoData = subway[`${value}`]

    try {
      const response = await axiosInstance.get(`/api/maps/surround-popup?geoX=${geoData[0]}&geoY=${geoData[1]}&sorted=distance&meter=1000`);

      if (response.status === 200) {
        sessionStorage.setItem('popupStores', JSON.stringify(response.data.popupStores));
        router.push("/popup-map?hotPlace=true");
      }
    } catch {
    }
  };

  const popupCardListAPI = async () => {

    try {
      const response = await axiosInstance.get(`/api/maps/main-popups`);

      if (response.status === 200) {
        setSortPopularity(response.data.sortPopularity)
        setSortDate(response.data.sortDate)
      }
    } catch {

    }

  };

  useEffect(() => {
    popupCardListAPI()
  }, [])

  useEffect(() => {
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [parentDiv]);

  useEffect(() => {
    const key = localStorage.getItem(joyrideStatusKey);
    if (key === "finished" || key === "skipped") {
      setJoyrideRun(false);
    } else {
      setJoyrideRun(true);
    }

  }, [router])


  useEffect(() => {
    if (iconRef.current &&
      bannerRef.current &&
      hotPlaceRef.current &&
      famousPopupRef.current &&
      newPopupRef.current) {
      setSteps([
        {
          target: 'body',
          content: (
            <TourContainer>
              <h3>안녕하세요! 🍿</h3>
              <p>여러분들의 팝핑 여정에 도움을 드릴 <strong>팝콘</strong>입니다!</p>
              <p>제 가이드는 언제든지 <strong>마이페이지</strong>에서 다시 설정할 수 있어요!</p>
            </TourContainer>
          ),
          title: '안녕하세요 !',
          placement: 'center',
        },
        {
          target: iconRef.current,
          content: (
            <TourContainer>
              <h3>저희 팝핑의 로고입니다.</h3>
              <p>어디서든, 보이면 <strong>눌러주세요!</strong></p>
              <p>다시 돌아올 수 있을거랍니다!</p>
            </TourContainer>
          ),
          title: '메인',
          placement: 'bottom',
        },
        {
          target: bannerRef.current,
          content: (
            <TourContainer>
              <h3><strong>이벤트</strong>, <strong>공지사항</strong>, <strong>인기있는 팝업스토어</strong> 등</h3>
              <p>많은 정보들을 얻을 수 있을거에요!</p>
            </TourContainer>
          ),
          title: '메인',
          placement: 'bottom',
        },
        {
          target: hotPlaceRef.current,
          content: (
            <TourContainer>
              <h3><strong>이벤트</strong>, <strong>공지사항</strong>, <strong>인기있는 팝업스토어</strong> 등</h3>
              <p>많은 정보들을 얻을 수 있을거에요!</p>
            </TourContainer>
          ),
          title: '메인',
          placement: 'bottom',
        },
        {
          target: famousPopupRef.current,
          content: (
            <TourContainer>
              <h3><strong>이벤트</strong>, <strong>공지사항</strong>, <strong>인기있는 팝업스토어</strong> 등</h3>
              <p>많은 정보들을 얻을 수 있을거에요!</p>
            </TourContainer>
          ),
          title: '메인',
          placement: 'top',
        },
        {
          target: newPopupRef.current,
          content: (
            <TourContainer>
              <h3><strong>이벤트</strong>, <strong>공지사항</strong>, <strong>인기있는 팝업스토어</strong> 등</h3>
              <p>많은 정보들을 얻을 수 있을거에요!</p>
            </TourContainer>
          ),
          title: '메인',
          placement: 'top',
        },
      ]);
    }
  }, [iconRef.current, bannerRef.current, hotPlaceRef.current, famousPopupRef.current, newPopupRef.current,]);



  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setJoyrideRun(false);
      localStorage.setItem(joyrideStatusKey, status);
    }
  };

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0}>
      <CustomJoyride steps={steps} runStatus={joyrideRun} callback={handleJoyrideCallback} />
      <TopNavigation>
        <TopNavLogoContainer ref={iconRef}>
          <LogoLettersMain width={undefined} height={24} />
        </TopNavLogoContainer>
      </TopNavigation>

      <Container ref={parentDiv}>
        {/* 배너 */}
        <SwiperContainer ref={bannerRef}>
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
          <span ref={hotPlaceRef}>HOT PLACE</span>
          <Section>
            <ContentsContainer>
              <Place image={'/images/subway/성수.svg'} onClick={() => handlePlaceClick('성수역')} />
              <Place image={'/images/subway/잠실.svg'} onClick={() => handlePlaceClick('강남역')} />
              <Place image={'/images/subway/강남.svg'} onClick={() => handlePlaceClick('잠실역')} />
              {/* <Place image={DummyPlace4.src} onClick={() => handlePlaceClick('value')}/> */}
            </ContentsContainer>
          </Section>

          <PopupCard
            title="인기 팝업스토어"
            storeData={sortPopularity}
            ref={famousPopupRef}
          />
          <PopupCard
            title="새로운 팝업스토어"
            storeData={sortDate}
            ref={newPopupRef}
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
  align-items: flex-start;
  justify-content: center;

  gap: 36px;

  margin: 36px 0 0 20px;

  span {
    color: ${COLORS.secondaryColor};
    font-family: "Pretendard";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
