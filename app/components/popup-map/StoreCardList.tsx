import styled from "styled-components";
import StoreCard from "./StoreCard";
import { PopupStoreSimpleData, PopupStoreDataType } from "@/public/utils/types";
import { IconRoundTriangle } from "../icons";
import { COLORS } from "@/public/styles/colors";

interface StoreCardListProps {
  storeList: PopupStoreSimpleData[];
  isPopper: boolean;
}

const StoreCardList: React.FC<StoreCardListProps> = ({
  storeList,
  isPopper,
}) => {
  // TODO : popper 여부에 따른 storeList 이원화 필요?

  return isPopper ? (
    <Container>
      <ThemeListContainer>
        <ThemeContainer>
          <div className={"theme-title"}>내 팝업 스토어</div>
          <StoreCardListContainer>
            {storeList.map((store: PopupStoreSimpleData) => (
              <StoreCard key={store.id} store={store} isPopper={isPopper} />
            ))}
          </StoreCardListContainer>
        </ThemeContainer>
      </ThemeListContainer>
    </Container>
  ) : (
    <Container>
      <CardListHeader>
        <FilterContainer>
          <Filter>
            <span>A 정렬</span>
            <SelectUnderlineTriangleContainer>
              <IconRoundTriangle
                color={COLORS.secondaryColor}
                width={8}
                height={undefined}
              />
            </SelectUnderlineTriangleContainer>
          </Filter>

          <Filter>
            <span>A 정렬</span>
            <SelectUnderlineTriangleContainer>
              <IconRoundTriangle
                color={COLORS.secondaryColor}
                width={8}
                height={undefined}
              />
            </SelectUnderlineTriangleContainer>
          </Filter>
        </FilterContainer>
        <Caption>총 {storeList.length}개의 팝업스토어가 있습니다.</Caption>
      </CardListHeader>
      <StoreCardListContainer>
        {storeList.map((store: PopupStoreSimpleData) => (
          <StoreCard key={store.id} store={store} isPopper={isPopper} />
        ))}
      </StoreCardListContainer>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 16px;
`;

const CardListHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 8px;
`;

const Filter = styled.div`
  cursor: pointer;
  min-width: 55px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
  }
`;

const SelectUnderlineTriangleContainer = styled.div`
  display: flex;
  align-items: center;
  transform: rotate(-180deg);
`;

const Caption = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
`;

const StoreCardListContainer = styled.div`
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: flex-start;
  justify-content: space-between;
`;

const ThemeListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 28px;

  /* margin-left: 22px; */
  width: 100%;
  overflow-y: auto;
`;

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .theme-title {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-left: 24px;
  }
`;

const ListContainer = styled.div``;

export default StoreCardList;
