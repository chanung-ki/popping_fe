import styled from "styled-components";
import StoreCard from "./StoreCard";
import { PopupStoreSimpleData, PopupStoreDataType, FilterType } from "@/public/utils/types";
import { IconCheck, IconRoundTriangle, IconTrash } from "../icons";
import { COLORS } from "@/public/styles/colors";
import { activeFilterData, filterData } from "@/public/utils/function";
import { useEffect, useState } from "react";
import BottomUpModal from "../BottomUpModal";
import { Loading } from "../loading";
import { useRouter } from "next/navigation";

interface StoreCardListProps {
  storeList?: PopupStoreDataType[];
  isPopper: boolean;
}

const StoreCardList: React.FC<StoreCardListProps> = ({
  storeList,
  isPopper,
}) => {
  const [actionModalShow, setActionModalShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectFilter, setSelectFilter] = useState<number>(0);
  const [selectActionFilter, setSelectActionFilter] = useState<number>(1);
  const [filteringData, setFilteringData] = useState<PopupStoreDataType[]>();

  useEffect(() => {
    FilterClick()
  }, [storeList])

  useEffect(() => {
    if (storeList && storeList.length > 0) {
      FilterClick();
    }
  }, [selectFilter, selectActionFilter]);

  const FilterClick = () => {
    if (!storeList) return;

    let filtered = [...storeList];

    switch (selectActionFilter) {
      case 1:
        filtered = filtered.filter((popup) =>
          popup.status == 1
        );
        break;
      case 2:
        filtered = filtered.filter((popup) =>
          popup.status == 2
        );
        break;
      case 0: // 전체
      default:
        break;
    }

    // 정렬 기준에 따른 정렬
    switch (selectFilter) {
      case 0: // 최신순
        filtered = filtered.sort((a, b) => new Date(b.date.start).getTime() - new Date(a.date.start).getTime());
        break;
      case 1: // 인기순
        filtered = filtered.sort((a, b) => (b.saveCount * 3 + b.viewCount) - (a.saveCount * 3 + a.viewCount));
        break;
      case 2: // 팔로우순
        filtered = filtered.sort((a, b) => b.saveCount - a.saveCount);
        break;
      default:
        break;
    }

    setFilteringData(filtered);
  };

  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  const toggleActionModal = () => {
    setActionModalShow(!actionModalShow);
  };

  const toggleReset = () => {
    setModalShow(false);
    setActionModalShow(false);
    setSelectFilter(0);
    setSelectActionFilter(1);
  }

  const handleFilterSelect = (filterValue: number) => {
    setSelectFilter(filterValue);
    toggleModal();
  };

  const handleActionFilterSelect = (filterValue: number) => {
    setSelectActionFilter(filterValue);
    toggleActionModal();
  };

  return isPopper ? (
    <Container>
      <ThemeContainer>
        <div className={"theme-title"}>내 팝업 스토어</div>
        <StoreCardListContainer>
          {storeList ?
            storeList.map((store: PopupStoreDataType) => (
              <StoreCard key={store.id} store={store} isPopper={isPopper} />
            )) :
            <>
              <SkeletonDiv />
              <SkeletonDiv />
              <SkeletonDiv />

              <SkeletonDiv />
              <SkeletonDiv />
              <SkeletonDiv />

              <SkeletonDiv />
              <SkeletonDiv />
              <SkeletonDiv />
            </>
          }
        </StoreCardListContainer>
      </ThemeContainer>
    </Container>
  ) : (
    <Container>
      <CardListHeader>
        <Filters>
          <Filter onClick={toggleActionModal}>
            <span>{activeFilterData.find(filter => filter.value === selectActionFilter)?.label}</span>
            <SelectUnderlineTriangleContainer>
              <IconRoundTriangle color={COLORS.secondaryColor} width={8} height={undefined} />
            </SelectUnderlineTriangleContainer>
          </Filter>
          <Filter onClick={toggleModal}>
            <span>{filterData.find(filter => filter.value === selectFilter)?.label}</span>
            <SelectUnderlineTriangleContainer>
              <IconRoundTriangle color={COLORS.secondaryColor} width={8} height={undefined} />
            </SelectUnderlineTriangleContainer>
          </Filter>
          {(selectActionFilter !== 1 || selectFilter !== 0) &&
            <Filter onClick={toggleReset}>
              <IconTrash color={COLORS.secondaryColor} width={12} height={undefined} />
            </Filter>
          }
        </Filters>
      </CardListHeader>
      <StoreCardListContainer>
        {
          filteringData ? (
            <>
              <Caption>총 {filteringData.length}개의 팝업스토어가 있습니다.</Caption>
              {filteringData.map((store: PopupStoreDataType) => (
                <StoreCard key={store.id} store={store} isPopper={isPopper} />
              ))}
            </>
          ) : (
            <>
              <Caption>총 00개의 팝업스토어가 있습니다.</Caption>
              <SkeletonDiv />
              <SkeletonDiv />
              <SkeletonDiv />

              <SkeletonDiv />
              <SkeletonDiv />
              <SkeletonDiv />

              <SkeletonDiv />
              <SkeletonDiv />
              <SkeletonDiv />
            </>
          )
        }
      </StoreCardListContainer>





      <BottomUpModal
        title={"옵션"}
        toggleModal={toggleActionModal}
        isVisible={actionModalShow}
        heightRate={30}
      >
        <Options>
          {activeFilterData.map((filter: FilterType) => (
            <Option key={filter.value} onClick={() => handleActionFilterSelect(filter.value)}>
              <span>{filter.label}</span>
              {filter.value === selectActionFilter &&
                <IconCheck color={COLORS.secondaryColor} height={12} width={undefined} />
              }
            </Option>
          ))}
        </Options>
      </BottomUpModal>
      <BottomUpModal
        title={"정렬"}
        toggleModal={toggleModal}
        isVisible={modalShow}
        heightRate={25}
      >
        <Options>
          {filterData.map((filter: FilterType) => (
            <Option key={filter.value} onClick={() => handleFilterSelect(filter.value)}>
              <span>{filter.label}</span>
              {filter.value === selectFilter &&
                <IconCheck color={COLORS.secondaryColor} height={12} width={undefined} />
              }
            </Option>
          ))}

        </Options>
      </BottomUpModal>

    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
`;

const CardListHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;


const Filters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const SkeletonDiv = styled.div`
  flex: 0 0 calc(50% - 12px);  
  @media (min-width: 768px) {
    flex: 0 0 calc(33.333% - 12px);
  }

  margin-bottom: 20px;

  aspect-ratio: 1 / 1;
  background-color: ${COLORS.greyColor};
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  /* 애니메이션 효과 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.2) 75%);
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
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
width: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;

  margin-bottom: 16px;
`;

const StoreCardListContainer = styled.div`
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: space-between;
  
  overflow-y: scroll;
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

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const Option = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
  align-items: center;
  justify-content: space-between;
`;


export default StoreCardList;
