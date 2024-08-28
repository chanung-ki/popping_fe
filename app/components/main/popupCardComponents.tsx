"use client";
import styled from "styled-components";
import { COLORS } from "@/public/styles/colors";
import {
  MainSortedData
} from "@/public/utils/types";
import Link from "next/link";

//TODO : Props interface 정의 필요
const PopupCard: React.FC<{
    title : string
    storeData : MainSortedData[];
}> = ({ title, storeData }) => {
  return (
    <Section>
        <p>{title}</p>
        <ContentsContainer>
            {storeData.length > 0 ? (
                storeData.map((item: MainSortedData, index: number) => (
                    <Stuff
                        key={index}
                        href={`online-popup`}
                    >
                        <ProductThumbnail>
                            <ProductThumbnailImage
                            src={`data:image/jpeg;base64,${item.image}`}
                            />
                        </ProductThumbnail>
                        <ProductTitle>
                            {item.title}
                        </ProductTitle>
                    </Stuff>
                ))
            ) : (
                <StoreContainer>
                    <NoneDataText>데이터가 없습니다</NoneDataText>
                </StoreContainer>
            )}
        </ContentsContainer>
    </Section>
  );
};

const Stuff = styled(Link)`
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

const ProductTitle = styled.h3`
  word-break: break-all;
  white-space: normal;

  font-size: 14px;
  font-weight: 500;

  font-weight: 500;
  margin-bottom: 4px;
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
  display: grid;
  flex-direction: row;
  gap: 16px;

  flex-wrap: nowrap;
  /* overflow-x: scroll; */
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개의 열 */
  
  div:last-child {
    margin-right: 16px;
  }
`;

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NoneDataText = styled.div`
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

const PopupStoreThumbnailImage = styled.img`
    flex: 0 0 auto;

    width: 120px;
    height: 120px;
    border-radius: 8px;
    background-position: center;
    background-size: cover;

    cursor: pointer;

  /* width: 100%; 
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px; */
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

export default PopupCard;



