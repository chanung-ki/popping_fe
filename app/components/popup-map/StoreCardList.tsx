import styled from "styled-components";
import StoreCard from "./StoreCard";
import { PopupStoreSimpleData, PopupStoreDataType } from "@/public/utils/types";

interface StoreCardListProps {
  storeList: PopupStoreSimpleData[];
  isPopper: boolean;
  // isViewDesc: boolean;
  // setIsViewDesc: React.Dispatch<React.SetStateAction<boolean>>;
  // clickedStore: PopupStoreSimpleData | null;
  // setClickedStore: React.Dispatch<React.SetStateAction<PopupStoreDataType | null>>;
}

const StoreCardList: React.FC<StoreCardListProps> = ({
  storeList,
  isPopper,
  // isViewDesc,
  // setIsViewDesc,
  // clickedStore,
  // setClickedStore,
}) => {
  // TODO : popper 여부에 따른 storeList 이원화 필요?

  return isPopper ? (
    <Container>
      <ThemeListContainer>
        <ThemeContainer>
          <div className={"theme-title"}>내 팝업 스토어</div>
          <StoreCardListContainer>
            {storeList.map((store: PopupStoreSimpleData) => (
              <StoreCard
                key={store.id}
                store={store}
                isPopper={isPopper}
                // isViewDesc={isViewDesc}
                // setIsViewDesc={setIsViewDesc}
                // clickedStore={clickedStore}
                // setClickedStore={setClickedStore}
              />
            ))}
          </StoreCardListContainer>
        </ThemeContainer>

        {/* <ThemeContainer>
          <div className={"theme-title"}>기타</div>
          <StoreCardListContainer>
            {storeList.map((store: PopupStoreSimpleData) => (
              <StoreCard
                key={store.id}
                store={store}
                isPopper={isPopper}
                isViewDesc={isViewDesc}
                setIsViewDesc={setIsViewDesc}
                clickedStore={clickedStore}
                setClickedStore={setClickedStore}
              />
            ))}
          </StoreCardListContainer>
        </ThemeContainer> */}
      </ThemeListContainer>
    </Container>
  ) : (
    <Container>
      <StoreCardListContainer>
        {storeList.map((store: PopupStoreSimpleData) => (
          <StoreCard
            key={store.id}
            store={store}
            isPopper={isPopper}
            isViewDesc={isViewDesc}
            setIsViewDesc={setIsViewDesc}
            clickedStore={clickedStore}
            setClickedStore={setClickedStore}
          />
        ))}
      </StoreCardListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StoreCardListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 28px;

  margin-left: 22px;
  width: 100%;
  overflow-y: auto;
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
    font-family: "Pretendard";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-left: 24px;
  }
`;

const ListContainer = styled.div``;

export default StoreCardList;
