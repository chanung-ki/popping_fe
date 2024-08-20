import { COLORS } from "@/public/styles/colors";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { TopNavigation } from "../navigation/topnavigation";
import { LogoLettersMain } from "../components/logo";

import DummyBanner1 from "@/public/images/dummy/dummy_banner1.jpg";
import DummyBanner2 from "@/public/images/dummy/dummy_banner2.jpg";
import DummyBanner3 from "@/public/images/dummy/dummy_banner3.jpg";

import DummyPlace1 from "@/public/images/dummy/dummy_place1.png";
import DummyPlace2 from "@/public/images/dummy/dummy_place2.png";
import DummyPlace3 from "@/public/images/dummy/dummy_place3.png";
import DummyPlace4 from "@/public/images/dummy/dummy_place4.png";

import DummyStore from "@/public/images/dummy/dummy_store.jpg";

const HomePage = () => {
  const parentDiv = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(0);

  const updateParentWidth = () => {
    if (parentDiv.current) {
      setParentWidth((parentDiv.current.offsetWidth / 4) * 3);
    }
  };

  useEffect(() => {
    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, [parentDiv]);

  return (
    <>
      <TopNavigation>
        <TopNavLogoContainer>
          <LogoLettersMain width={undefined} height={24} />
        </TopNavLogoContainer>
      </TopNavigation>

      <Container ref={parentDiv}>
        {/* Top Navigation */}

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
              <Place image={DummyPlace1.src} />
              <Place image={DummyPlace2.src} />
              <Place image={DummyPlace3.src} />
              <Place image={DummyPlace4.src} />
            </ContentsContainer>
          </Section>

          <Section>
            <p>최근 본 팝업스토어</p>
            <ContentsContainer>
              <StoreContainer>
                <StoreImage image={DummyStore.src} />
                <StoreDesc>
                  <p>팝핑 스토어</p>
                  <p>서울 용산구</p>
                </StoreDesc>
              </StoreContainer>
            </ContentsContainer>
          </Section>

          <Section>
            <p>새로운 팝업스토어</p>
            <ContentsContainer>
              <StoreContainer>
                <StoreImage image={DummyStore.src} />
                <StoreDesc>
                  <p>팝핑 스토어</p>
                  <p>서울 용산구</p>
                </StoreDesc>
              </StoreContainer>
            </ContentsContainer>
          </Section>
        </Sections>
      </Container>
    </>
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
  height: 100%;
  overflow: auto;

  background: ${COLORS.primaryColor};

  padding-bottom: 80px;
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
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

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

  width: 82px;
  height: 82px;
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
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  p:last-child {
    color: ${COLORS.greyColor};
    font-family: "Pretendard";
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export default HomePage;
