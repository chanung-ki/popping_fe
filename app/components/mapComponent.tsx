import { COLORS } from "@/public/styles/colors";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconUser } from "./icons";
import { Loading } from "./loading";
import { IconChevronLeft, IconSearch, IconX } from "./icons";
import StyledSelect from "./styledSelect";
import StoreCard from "./popup-map/StoreCard";
import { Store } from "@/public/utils/types";
import Image from "next/image";
import { formatDate } from "@/public/utils/function";
import StoreDescription from "./popup-map/StoreDescription";

declare global {
  interface Window {
    naver: any;
  }
}

const MapComponent: React.FC = () => {
  // 서울 25개구 더미 데이터
  const DUMMY_SEOUL_OPTIONS = [
    { value: "서울시 종로구", label: "서울시 종로구" },
    { value: "서울시 중구", label: "서울시 중구" },
    { value: "서울시 용산구", label: "서울시 용산구" },
    { value: "서울시 성동구", label: "서울시 성동구" },
    { value: "서울시 광진구", label: "서울시 광진구" },
    { value: "서울시 동대문구", label: "서울시 동대문구" },
    { value: "서울시 중랑구", label: "서울시 중랑구" },
    { value: "서울시 성북구", label: "서울시 성북구" },
    { value: "서울시 강북구", label: "서울시 강북구" },
    { value: "서울시 도봉구", label: "서울시 도봉구" },
    { value: "서울시 노원구", label: "서울시 노원구" },
    { value: "서울시 은평구", label: "서울시 은평구" },
    { value: "서울시 서대문구", label: "서울시 서대문구" },
    { value: "서울시 마포구", label: "서울시 마포구" },
    { value: "서울시 양천구", label: "서울시 양천구" },
    { value: "서울시 강서구", label: "서울시 강서구" },
    { value: "서울시 구로구", label: "서울시 구로구" },
    { value: "서울시 금천구", label: "서울시 금천구" },
    { value: "서울시 영등포구", label: "서울시 영등포구" },
    { value: "서울시 동작구", label: "서울시 동작구" },
    { value: "서울시 관악구", label: "서울시 관악구" },
    { value: "서울시 서초구", label: "서울시 서초구" },
    { value: "서울시 강남구", label: "서울시 강남구" },
    { value: "서울시 송파구", label: "서울시 송파구" },
    { value: "서울시 강동구", label: "서울시 강동구" },
  ];
  //지도 관련 states
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 팝업 스토어 목록
  const [storeList, setStoreList] = useState<any[]>([]);
  // 검색 영역 활성화
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);
  // 선택된 지역
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  // 하단 메뉴 오픈 여부
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  // 하단 메뉴 리스트 스토어 클릭 여부
  const [clickedStore, setClickedStore] = useState<Store | null>(null);
  // 스토어 좋아요 여부
  const [isLikedStore, setIsLikedStore] = useState<boolean>(false);
  // 스토어 상세보기 여부
  const [isViewDesc, setIsViewDesc] = useState<boolean>(false);

  //지도 ref
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // 더미데이터
  const DUMMY_LIST: Store[] = [
    {
      id: "store123",
      title: "일릭서 스토어",
      location: {
        address: "서울시 강남구",
        placeName: "일릭서",
        geoData: {
          type: "Point",
          coordinates: [127.024612, 37.5326],
        },
      },
      description: [
        "일어나라 노예들이여 이 텍스트는 두줄까지만 가능",
        "일어나라 노예들이여 이 텍스트는 두줄까지만 가능",
      ],
      isSaved: false,
      image: "/images/popping-orange.png",
      viewCount: 1,
    },
    {
      id: "store124",
      title: "김태은 전립선 클리닉",
      location: {
        address: "서울시 도봉구",
        placeName: "전립선",
        geoData: {
          type: "Point",
          coordinates: [127.024612, 37.5326],
        },
      },
      description: ["김태은 전립선 절제술", "김태은 전립선 절제술"],
      isSaved: false,
      image: "/images/popping-orange.png",
      viewCount: 1,
    },
    {
      id: "store125",
      title: "GS THE FRESH 관악점",
      location: {
        address: "서울시 관악구",
        placeName: "GS THE FRESH 관악점",
        geoData: {
          type: "Point",
          coordinates: [127.024612, 37.5326],
        },
      },
      description: ["우리동네 지에스", "우리동네 지에스"],
      isSaved: false,
      image: "/images/popping-orange.png",
      viewCount: 1,
    },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      // 위치 추적을 시작합니다.
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          setIsLoading(false); // 위치를 성공적으로 가져오면 로딩 상태 해제
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false); // 위치를 가져오지 못하더라도 로딩 상태 해제
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );

      // 컴포넌트가 언마운트될 때 위치 추적을 중지합니다.
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setIsLoading(false); // Geolocation을 지원하지 않는 경우 로딩 상태 해제
    }
  }, []);

  useEffect(() => {
    if (userLocation && window.naver) {
      if (!mapRef.current) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(
            userLocation.lat,
            userLocation.lng
          ),
          zoom: 15,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          mapTypeControl: false,
          logoControlOptions: {
            position: window.naver.maps.Position.BOTTOM_LEFT,
          },
        };
        mapRef.current = new window.naver.maps.Map("map", mapOptions);

        // 지도 이동 시 버튼을 보이게 하는 이벤트 추가
        window.naver.maps.Event.addListener(mapRef.current, "idle", () => {
          const center = mapRef.current.getCenter();
          const distance = Math.sqrt(
            Math.pow(center.lat() - userLocation.lat, 2) +
              Math.pow(center.lng() - userLocation.lng, 2)
          );
          if (distance > 0.001) {
            // 사용자가 위치에서 벗어났다고 판단할 거리
            setIsButtonVisible(true);
          } else {
            setIsButtonVisible(false);
          }
        });
      }

      if (!markerRef.current) {
        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            userLocation.lat,
            userLocation.lng
          ),
          map: mapRef.current,
          icon: {
            content: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="41" viewBox="0 0 28 41" fill="none">
  <g clip-path="url(#clip0_821_46)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0037 0C6.27056 0 0 6.32055 0 14.1154C0 23.188 14.0037 40.3276 14.0037 40.3276C14.0037 40.3276 28.0075 23.188 28.0075 14.1154C28 6.32055 21.7369 0 14.0037 0ZM14.0037 19.1507C11.2435 19.1507 9.0008 16.8977 9.0008 14.1078C9.0008 11.318 11.236 9.06501 14.0037 9.06501C16.7715 9.06501 19.0067 11.318 19.0067 14.1078C19.0067 16.8977 16.7715 19.1507 14.0037 19.1507Z" fill="#FA8D0E"/>
    <path d="M19.9574 10.7912C19.5334 12.1558 19.7684 13.6397 20.5933 14.8065C21.6146 16.2506 20.5966 18.2479 18.8281 18.2709C17.3992 18.2895 16.0605 18.9715 15.206 20.1167C14.148 21.5341 11.9339 21.1837 11.3659 19.5086C10.9071 18.1555 9.84463 17.093 8.49149 16.6341C6.81648 16.0657 6.46567 13.852 7.88341 12.794C9.02829 11.9394 9.71061 10.6003 9.72917 9.1718C9.75182 7.40321 11.7491 6.38564 13.1935 7.40655C14.3603 8.23145 15.8441 8.46644 17.2088 8.04249C18.8979 7.51755 20.483 9.10275 19.9581 10.7919L19.9574 10.7912Z" fill="white"/>
    <path d="M17.0739 9.54188L15.5266 9.95655C14.7946 10.1526 14.5496 11.0677 15.0852 11.6038L16.2179 12.7364C16.7536 13.2721 17.6687 13.0271 17.865 12.295L18.2797 10.7477C18.4757 10.0156 17.806 9.34586 17.0739 9.54188Z" fill="#FA8D0E"/>
  </g>
  <defs>
    <clipPath id="clip0_821_46">
      <rect width="28" height="40.32" fill="white"/>
    </clipPath>
  </defs>
</svg>`,
            anchor: new window.naver.maps.Point(5, 5), // 마커의 중심점을 설정
          },
        });
      } else {
        // 위치가 업데이트될 때마다 마커 위치를 업데이트합니다.
        markerRef.current.setPosition(
          new window.naver.maps.LatLng(userLocation.lat, userLocation.lng)
        );
      }
    }
  }, [userLocation]);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      const mapHeight = isOpenMenu
        ? "calc(100% - 568px)"
        : "calc(100% - 100px)";
      mapRef.current.getElement().style.height = mapHeight;

      const newCenter = new window.naver.maps.LatLng(
        userLocation.lat,
        userLocation.lng
      );

      // 지도 높이 변경 후 중심 조정
      window.naver.maps.Event.trigger(mapRef.current, "resize");
      mapRef.current.setCenter(newCenter);
    }
  }, [isOpenMenu, userLocation]);

  const handleLocationButtonClick = () => {
    if (userLocation && mapRef.current) {
      const newCenter = new window.naver.maps.LatLng(
        userLocation.lat,
        userLocation.lng
      );
      // 부드럽게 지도 이동
      mapRef.current.panTo(newCenter, { duration: 500 }); // 500ms 동안 슬라이드 이동
      mapRef.current.setZoom(15); // 줌 레벨 설정
      setIsButtonVisible(false); // 버튼 숨김
    }
  };

  // 검색 활성화 핸들러
  const activeSearchHandler = () => {
    setIsActiveSearch(!isActiveSearch);
  };

  return (
    <Container>
      <MapContainer>
        <StyledNaverMap
          id="map"
          style={{
            width: "100%",
          }}
        />
        {!isLoading && (
          <LocationResetBtn onClick={handleLocationButtonClick}>
            <IconUser
              color={isButtonVisible ? COLORS.mainColor : COLORS.greyColor}
              width={undefined}
              height={35}
            />
          </LocationResetBtn>
        )}
        {isLoading ? (
          <Loading />
        ) : !isActiveSearch ? (
          <>
            <SearchControlContainer>
              <CircleButton>
                <IconChevronLeft
                  width={16}
                  height={16}
                  color={COLORS.secondaryColor}
                />
              </CircleButton>

              <CircleButton onClick={activeSearchHandler}>
                <IconSearch
                  width={16}
                  height={16}
                  color={COLORS.secondaryColor}
                />
              </CircleButton>
            </SearchControlContainer>
          </>
        ) : (
          <>
            <SearchContainer>
              <SearchControlContainer>
                <TransparentButton>
                  <IconChevronLeft
                    width={16}
                    height={16}
                    color={COLORS.secondaryColor}
                  />
                </TransparentButton>

                <p>검색</p>

                <TransparentButton onClick={activeSearchHandler}>
                  <IconX width={16} height={16} color={COLORS.secondaryColor} />
                </TransparentButton>
              </SearchControlContainer>
              <SearchContentsContainer>
                <StyledSelect
                  options={DUMMY_SEOUL_OPTIONS}
                  placeholder={"지역선택"}
                  styles={{
                    width: "78px",
                    height: "22px",
                    color: COLORS.secondaryColor,
                    backgroundColor: COLORS.whiteColor,
                    border: false,
                    borderRadius: "12px",
                  }}
                  onChangeHandler={(e: any) => {
                    setSelectedLocation(e.value);
                  }}
                />
                <SelectedLocationBanner>
                  {selectedLocation ? selectedLocation : "지역 선택"}
                </SelectedLocationBanner>
              </SearchContentsContainer>
            </SearchContainer>
          </>
        )}
      </MapContainer>
      <SlideBottomMenu $isOpen={isOpenMenu}>
        <ToggleButton
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
          }}
        />

        {isOpenMenu && !isViewDesc ? (
          <StoreInformationList>
            {/*Store Card 더미 데이터 리스트 렌더링 */}
            {DUMMY_LIST.map((store: Store) => (
              <StoreCard
                key={store.id}
                store={store}
                isViewDesc={isViewDesc}
                setIsViewDesc={setIsViewDesc}
                clickedStore={clickedStore}
                setClickedStore={setClickedStore}
              />
            ))}
          </StoreInformationList>
        ) : (
          clickedStore && (
            <StoreDescription
              store={clickedStore}
              isViewDesc={isViewDesc}
              setIsViewDesc={setIsViewDesc}
            />
          )
        )}
      </SlideBottomMenu>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LocationResetBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: fixed;
  z-index: 1;
  bottom: 60px;
  right: 20px;
  padding: 0;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const StyledNaverMap = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const SearchControlContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 16px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 20px;
  width: calc(100% - 40px);
  height: 32px;

  & > p {
    text-align: center;
    font-family: "Pretendard";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const TransparentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;

  all: unset;
  cursor: pointer;
`;

const CircleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border: 1px solid ${COLORS.greyColor};
  border-radius: 50%;
  background-color: ${COLORS.whiteColor};

  cursor: pointer;
`;

const SearchContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  padding: 28px 20px;
  width: calc(100% - 40px);

  background-color: ${COLORS.whiteColor};
  font-family: "Pretendard";
`;

const SearchContentsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 44px;
  padding: 4px 8px;
  width: calc(100% - 28px);
  border-radius: 16px;
  background-color: ${COLORS.lightGreyColor};

  & > input {
    border: none;
    background-color: ${COLORS.lightGreyColor};

    &::placeholder {
      font-size: 12px;
      font-weight: 700;
      color: ${COLORS.greyColor};
    }
  }
`;

const SelectedLocationBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${COLORS.whiteColor};

  font-size: 12px;
`;

const SlideBottomMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: ${(props) => (props.$isOpen ? "568px" : "100px")};

  border-radius: 16px 16px 0px 0px;
  background-color: ${COLORS.whiteColor};

  transition: height 0.3s ease, transform 0.3s ease;
`;

const ToggleButton = styled.button`
  margin-top: 8px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  width: 54px;
  height: 4px;

  border: none;
  border-radius: 2px;
  background-color: ${COLORS.greyColor};
  cursor: pointer;
`;

const StoreInformationList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: row wrap;
  gap: 28px;
  margin: 40px 0px;
  width: 100%;
  overflow-y: auto;
  width: 100%;
`;

export default MapComponent;
