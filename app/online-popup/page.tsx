'use client'

import styled from "styled-components";
import Back from "../components/back";
import { DefaultLayout } from "../components/layout";
import BrandComponent from "../components/brandComponent";
import axiosInstance from "@/public/network/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandType } from "@/public/utils/types";
import { Loading } from "../components/loading";
import { IconCheck, IconRoundTriangle, IconX } from "../components/icons";
import { COLORS } from "@/public/styles/colors";
import Link from "next/link";
import BottomUpModal from "../components/BottomUpModal";
import dayjs from 'dayjs';

interface FilterType {
  label: string,
  value: number
}

const filterData = [
  { label: '최신순', value: 0 },
  { label: '인기순', value: 1 },
  { label: '팔로우순', value: 2 },
]

const activeFilterData = [
  { label: '전체', value: 0 },
  { label: '진행중', value: 1 },
  { label: '진행예정', value: 2 },
  { label: '종료', value: 3 },
]

const OnlinePopupPage: React.FC = () => {
  const router = useRouter();
  const [originalData, setOriginalData] = useState<BrandType[]>([]);
  const [brandsData, setBrandsData] = useState<BrandType[]>([]);
  const [selectFilter, setSelectFilter] = useState<number>(0);
  const [selectActionFilter, setSelectActionFilter] = useState<number>(0);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const parseDate = (dateString: string) => dayjs(dateString, 'YY.MM.DD');

  useEffect(() => {
    BrandsDataGet();
  }, [router]);

  useEffect(() => {
    if (originalData.length > 0) {
      FilterClick();
    }
  }, [selectFilter, selectActionFilter]);


  const BrandsDataGet = async () => {
    try {
      const response = await axiosInstance.get(`/api/popup/brand/data`);
      if (response.status === 200) {
        setBrandsData(response.data);
        setOriginalData(response.data)
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("로그인 후 이용가능합니다.");
        router.push(`/member/signin?redirect=${encodeURIComponent(window.location.href)}`);
      }
    }
  };

  const FilterClick = () => {
    if (!originalData) return;

    let filteredData = [...originalData];
    const now = dayjs();

    // 날짜 포맷 변환 함수
    console.log(parseDate(filteredData[0].contractEnd).format())
    // 상태에 따른 필터링
    switch (selectActionFilter) {
      case 1: // 진행중
        filteredData = filteredData.filter((brand) =>
          now.isAfter(parseDate(brand.contractStart)) && now.isBefore(parseDate(brand.contractEnd))
        );
        break;
      case 2: // 진행예정
        filteredData = filteredData.filter((brand) =>
          now.isBefore(parseDate(brand.contractStart))
        );
        break;
      case 3: // 종료
        filteredData = filteredData.filter((brand) =>
          now.isAfter(parseDate(brand.contractEnd))
        );
        break;
      case 0: // 전체
      default:
        break;
    }

    // 정렬 기준에 따른 정렬
    switch (selectFilter) {
      case 0: // 최신순
        filteredData = filteredData.sort((a, b) => b.id - a.id);
        break;
      case 1: // 인기순
        filteredData = filteredData.sort((a, b) => b.saved - a.saved);
        break;
      case 2: // 팔로우순
        filteredData = filteredData.sort((a, b) => Number(b.isSaved) - Number(a.isSaved));
        break;
      default:
        break;
    }

    setBrandsData(filteredData);
  };


  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  const handleFilterSelect = (filterValue: number) => {
    setSelectFilter(filterValue);
    toggleModal();
  };

  const handleActionFilterSelect = (filterValue: number) => {
    setSelectActionFilter(filterValue);
    toggleModal();
  };


  if (!brandsData) return <Loading />;

  return (
    <DefaultLayout top={0} right={20} bottom={0} left={20}>
      <Container>
        <Top>
          <Link href={'/'} style={{ position: 'absolute', top: 16 }}>
            <IconX color={COLORS.secondaryColor} width={undefined} height={16} />
          </Link>
          <PageTitle>온라인 팝업스토어</PageTitle>
        </Top>

        <Content>
          <Filter onClick={toggleModal}>
            <span>{filterData.find(filter => filter.value === selectFilter)?.label}</span>
            <SelectUnderlineTriangleContainer>
              <IconRoundTriangle color={COLORS.secondaryColor} width={8} height={undefined} />
            </SelectUnderlineTriangleContainer>
          </Filter>
          {brandsData.map((brand: BrandType) => (
            <BrandComponent key={`brand-${brand.id}`} data={brand} />
          ))}
        </Content>
      </Container>

      <BottomUpModal
        title={"정렬"}
        toggleModal={toggleModal}
        isVisible={modalShow}
        heightRate={50}
      >
        <Options>
          팝업상태
          {activeFilterData.map((filter: FilterType) => (
            <Option key={filter.value} onClick={() => handleActionFilterSelect(filter.value)}>
              <span>{filter.label}</span>
              {filter.value === selectActionFilter &&
                <IconCheck color={COLORS.secondaryColor} height={12} width={undefined} />
              }
            </Option>
          ))}
          <div style={{ width: '100%', backgroundColor: COLORS.lightGreyColor, height: 2 }} />

          정렬
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
    </DefaultLayout>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
`;

const Top = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: ${COLORS.primaryColor};
`;

const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 68px;
  gap: 24px;
  justify-content: center;
  padding-bottom: 80px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;

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

export default OnlinePopupPage;
