import { COLORS } from "@/public/styles/colors";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { TopNavigation } from "../navigation/topnavigation";
import Image from "next/image";

import LogoLetters from "@/public/images/logo_letters.png";

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
          <TopNavLogo
            src={LogoLetters}
            alt={"로고"}
            width={undefined}
            height={24}
          />
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
          >
            <SwiperSlide>
              <SlideBannerContainer height={parentWidth}></SlideBannerContainer>
            </SwiperSlide>
            <SwiperSlide>
              <SlideBannerContainer height={parentWidth}></SlideBannerContainer>
            </SwiperSlide>
          </Swiper>
        </SwiperContainer>

        <Sections>
          <Section>
            <p>HOT PLACE</p>
            <ContentsContainer>
              <Place image={null} />
              <Place image={null} />
              <Place image={null} />
              <Place image={null} />
            </ContentsContainer>
          </Section>

          <Section>
            <p>최근 본 팝업스토어</p>
            <ContentsContainer>
              <StoreContainer>
                <StoreImage image={null} />
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
                <StoreImage image={null} />
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

const TopNavLogo = styled(Image)`
  width: auto;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: ${COLORS.primaryColor};
`;

const SwiperContainer = styled.div`
  width: 100%;
`;

const SlideBannerContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height}px;
  background: ${COLORS.greyColor};

  cursor: grab;

  img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;

  margin: 36px 0 80px 20px;
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
