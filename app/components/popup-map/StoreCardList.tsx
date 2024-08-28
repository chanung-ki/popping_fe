import styled from "styled-components";
import StoreCard from "./StoreCard";
import { Store } from "@/public/utils/types";

interface StoreCardListProps {
  storeList: Store[];
  isPopper: boolean;
  isViewDesc: boolean;
  setIsViewDesc: React.Dispatch<React.SetStateAction<boolean>>;
  clickedStore: Store | null;
  setClickedStore: React.Dispatch<React.SetStateAction<Store | null>>;
}

const StoreCardList: React.FC<StoreCardListProps> = ({
  storeList,
  isPopper,
  isViewDesc,
  setIsViewDesc,
  clickedStore,
  setClickedStore,
}) => {
  return (
    <StoreCardListContainer>
      {isPopper ? (
        <ThemeListContainer></ThemeListContainer>
      ) : (
        <>
          {storeList.map((store: Store) => (
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
        </>
      )}
    </StoreCardListContainer>
  );
};

const StoreCardListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 28px;

  margin-left: 22px;
  width: 100%;
  overflow-y: auto;
`;

const ThemeListContainer = styled.div``;

export default StoreCardList;
