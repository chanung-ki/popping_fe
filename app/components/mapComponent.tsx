import { COLORS } from "@/public/styles/colors";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconUser } from "./icons";
import { Loading } from "./loading";
import { IconChevronLeft, IconSearch, IconX } from "./icons";
import StyledSelect from "./styledSelect";
import StoreCard from "./popup-map/StoreCard";
import axiosInstance from "@/public/network/axios";
import { PopupStoreSimpleData, PopupStoreDataType } from "@/public/utils/types";
import Image from "next/image";
import { formatDate, MARKER } from "@/public/utils/function";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { user } from "@/public/utils/types";
import StoreCardList from "./popup-map/StoreCardList";
import Back from "./back";
import { DefaultLayout, Spacer } from "./layout";

interface FoodAndCafe {
  title: string;
  bestMenu: string[];
  gradePoint: number;
  loadAddr: string;
  numberAddr: string;
  telNumber: string;
  option: "food" | "cafe";
  charTag: string[];
  tags: string[];
  geoData: {
    type: string;
    coordinates: number[];
  };
}

declare global {
  interface Window {
    naver: any;
  }
}

const MapComponent: React.FC = () => {
  const router = useRouter();

  const userData: user = useSelector((state: any) => state.poppingUser.user);
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
  const [subwayLocation, setSubwayLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 팝업 스토어 목록
  const [storeList, setStoreList] = useState<PopupStoreSimpleData[]>([]);
  // 검색 영역 활성화
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);
  // 선택된 지역
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  // 하단 메뉴 오픈 여부
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  // 하단 메뉴 리스트 스토어 클릭 여부
  const [clickedStore, setClickedStore] = useState<PopupStoreDataType | null>(
    null
  );
  // 스토어 좋아요 여부
  const [isLikedStore, setIsLikedStore] = useState<boolean>(false);
  // 스토어 상세보기 여부
  const [isViewDesc, setIsViewDesc] = useState<boolean>(false);
  // 선택된 카페 or 맛집
  const [selectedCategory, setSelectedCategory] = useState<string>();
  // 스토어 마커 리스트
  const [storeMarkerList, setStoreMarkerList] = useState<naver.maps.Marker[]>(
    []
  );
  // 카페 마커 리스트
  const [cafeMarkerList, setCafeMarkerList] = useState<naver.maps.Marker[]>([]);
  // 푸드 마커 리스트
  const [foodMarkerList, setFoodMarkerList] = useState<naver.maps.Marker[]>([]);

  //지도 ref
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const locationResetRef = useRef<HTMLDivElement>(null);
  const infowindowRef = useRef<any>(null);

  // 마커 디자인 (food and cafe)
  const MARKER_FOOD_CAFE = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="41" viewBox="0 0 28 41" fill="none">
  <g clip-path="url(#clip0_1111_2)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0037 0C6.27056 0 0 6.32055 0 14.1154C0 23.188 14.0037 40.3276 14.0037 40.3276C14.0037 40.3276 28.0075 23.188 28.0075 14.1154C28 6.32055 21.7369 0 14.0037 0ZM14.0037 19.1507C11.2435 19.1507 9.0008 16.8977 9.0008 14.1078C9.0008 11.318 11.236 9.06501 14.0037 9.06501C16.7715 9.06501 19.0067 11.318 19.0067 14.1078C19.0067 16.8977 16.7715 19.1507 14.0037 19.1507Z" fill="#F43529"/>
    <path d="M19.9574 10.7912C19.5334 12.1558 19.7684 13.6397 20.5933 14.8065C21.6146 16.2506 20.5966 18.2479 18.8281 18.2709C17.3992 18.2895 16.0605 18.9715 15.206 20.1167C14.148 21.5341 11.9339 21.1837 11.3659 19.5086C10.9071 18.1555 9.84463 17.093 8.49149 16.6341C6.81648 16.0657 6.46567 13.852 7.88341 12.794C9.02829 11.9394 9.71061 10.6003 9.72917 9.1718C9.75182 7.40321 11.7491 6.38564 13.1935 7.40655C14.3603 8.23145 15.8441 8.46644 17.2088 8.04249C18.8979 7.51755 20.483 9.10275 19.9581 10.7919L19.9574 10.7912Z" fill="white"/>
    <path d="M17.0739 9.54188L15.5266 9.95655C14.7946 10.1526 14.5496 11.0677 15.0852 11.6038L16.2179 12.7364C16.7536 13.2721 17.6687 13.0271 17.865 12.295L18.2797 10.7477C18.4757 10.0156 17.806 9.34586 17.0739 9.54188Z" fill="#F43529"/>
  </g>
  <defs>
    <clipPath id="clip0_1111_2">
      <rect width="28" height="40.32" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

  const DUMMY_FOOD_CAFE_LIST: FoodAndCafe[] = [
    {
      title: "성수 명당",
      bestMenu: ["술집", " 요리주점"],
      gradePoint: 4,
      loadAddr: "서울특별시 성동구 연무장19길 10",
      numberAddr: "서울특별시 성동구 성수동2가 275-71",
      telNumber: "0507-1493-3227",
      option: "food",
      charTag: ["깔끔한", "예약", "저녁식사", "반려동물동반", "예약가능"],
      tags: ["술모임", "데이트"],
      geoData: {
        type: "Point",
        coordinates: [127.0625821, 37.5411099],
      },
    },
    {
      title: "테니",
      bestMenu: ["커피", " 베이커리카페"],
      gradePoint: 4,
      loadAddr: "서울특별시 성동구 뚝섬로17가길 55",
      numberAddr: "서울특별시 성동구 성수동2가 271-7",
      telNumber: "0507-1341-3094",
      option: "cafe",
      charTag: [
        "깔끔한",
        "유럽",
        "아침식사",
        "점심식사",
        "저녁식사",
        "테라스",
        "야외테라스",
        "주차",
        "배달",
      ],
      tags: ["데이트", "식사모임"],
      geoData: {
        type: "Point",
        coordinates: [127.0594637, 37.5411948],
      },
    },
    {
      title: "프롤라",
      bestMenu: ["커피", " 카페"],
      gradePoint: 4,
      loadAddr: "서울특별시 성동구 연무장17길 5",
      numberAddr: "서울특별시 성동구 성수동2가 272-35",
      telNumber: "0507-1354-9616",
      option: "cafe",
      charTag: ["이국적/이색적", "예쁜", "점심식사", "테이크아웃", "배달"],
      tags: ["혼카페", "차모임"],
      geoData: {
        type: "Point",
        coordinates: [127.061905, 37.5428909],
      },
    },
  ];

  // 스토어 마커 추가
  const addStoreMarkers = () => {
    storeList.forEach((store) => {
      const dom_id = store.id;
      const title = store.title;
      const lat = store.location.geoData.coordinates[0];
      const lng = store.location.geoData.coordinates[1];
      addEachStoreMarker(dom_id, title, lat, lng);
    });
  };

  // 카페 마커 추가
  const addCafeMarkers = (list: FoodAndCafe[]) => {
    list.map((place) => {
      if (place.option === selectedCategory) {
        const dom_id = place.title;
        const title = place.title;
        const lat = place.geoData.coordinates[0];
        const lng = place.geoData.coordinates[1];
        addEachCafeMarker(dom_id, title, lat, lng);
      }
    });
  };

  //푸드 마커 추가
  const addFoodMarkers = (list: FoodAndCafe[]) => {
    list.map((place) => {
      if (place.option === selectedCategory) {
        const dom_id = place.title;
        const title = place.title;
        const lat = place.geoData.coordinates[0];
        const lng = place.geoData.coordinates[1];
        addEachFoodMarker(dom_id, title, lat, lng);
      }
    });
  };

  // 스토어 마커를 스토어 마커 리스트에 추가
  const addEachStoreMarker = (
    id: string,
    name: string,
    lat: number,
    lng: number
  ) => {
    try {
      let newMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lng, lat),
        map: mapRef.current,
        title: name,
        icon: {
          content: MARKER,
          anchor: new window.naver.maps.Point(5, 5),
        },
      });

      newMarker.setTitle(name);
      //스토어 마커 리스트에 추가
      setStoreMarkerList([...storeMarkerList, newMarker]);
      // 마커에 이벤트 핸들러 (인포 윈도우)
      newMarker.addListener("click", () => {
        const newInfoWindow: naver.maps.InfoWindow = openInfoWindow(newMarker);

        if (newInfoWindow.getMap()) {
          newInfoWindow.close();
        } else if (mapRef.current !== null) {
          newInfoWindow.open(mapRef.current, newMarker);
        }
      });
    } catch (e) { }
  };

  // 카페 마커를 카페 마커 리스트에 추가
  const addEachCafeMarker = (
    id: string,
    name: string,
    lat: number,
    lng: number
  ) => {
    try {
      let newMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lng, lat),
        map: mapRef.current,
        title: name,
        icon: {
          content: MARKER_FOOD_CAFE,
          anchor: new window.naver.maps.Point(5, 5),
        },
      });

      newMarker.setTitle(name);
      //스토어 마커 리스트에 추가
      setCafeMarkerList([...cafeMarkerList, newMarker]);
      // 마커에 이벤트 핸들러 (인포 윈도우)
    } catch (e) { }
  };

  //푸드 마커를 푸드 마커 리스트에 추가
  const addEachFoodMarker = (
    id: string,
    name: string,
    lat: number,
    lng: number
  ) => {
    try {
      let newMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lng, lat),
        map: mapRef.current,
        title: name,
        icon: {
          content: MARKER_FOOD_CAFE,
          anchor: new window.naver.maps.Point(5, 5),
        },
      });

      newMarker.setTitle(name);
      //스토어 마커 리스트에 추가
      setFoodMarkerList([...foodMarkerList, newMarker]);
      // 마커에 이벤트 핸들러 (인포 윈도우)
    } catch (e) { }
  };

  const removeMarker = (type: string) => {
    if (type === "cafe") {
      foodMarkerList.forEach((marker) => {
        marker.setMap(null);
      });
      setFoodMarkerList([]);
    } else if (type === "food") {
      cafeMarkerList.forEach((marker) => {
        marker.setMap(null);
      });
      setCafeMarkerList([]);
    }
  };

  // 스토어 마커 클릭시 인포윈도우를 엽니다. (카페 / 맛집 미구현)
  const openInfoWindow = (marker: naver.maps.Marker) => {
    const storeInfo: PopupStoreSimpleData | undefined = storeList.find(
      (store) => {
        return store.title === marker.getTitle();
      }
    );
    const newInfoWindow: naver.maps.InfoWindow =
      new window.naver.maps.InfoWindow({
        backgroundColor: "transparent",
        borderWidth: 0,
        maxWidth: 175,
        anchorSize: new window.naver.maps.Size(14, 12),
      });

    //img src에는 더미 데이터가 삽입되어 있습니다. 실데이터로 변경하여 주시기 바랍니다.

    if (storeInfo) {
      newInfoWindow.setContent(`
        <div style="width: 175px; height: 161px; border-radius: 16px; background-color: #ffffff; display: flex; align-items: center; justify-content: center;">
          <div 
            style="display: flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer;" 
            onclick="window.location.href='/popup-map/${storeInfo.id}';"
          >
            <div style="width: 72px; height: 72px; display: flex; justify-content: center; align-items: center; border-radius: 8px; overflow: hidden;">
              <img
                src=${`data:image/webp;base64,${storeInfo.image}`}
                style="width: 100%; height: 100%; object-fit: cover;"
              />              
          </div>
          <div
            style="text-align: center; font-family: Pretendard; font-size: 14px; font-style: normal; font-weight: 600;
              line-height: normal;
            "
          >
            ${marker.getTitle()}
          </div>
    
          <div
            style="
              width: 112px;
              text-align: center;
              font-family: Pretendard;
              font-size: 10px;
              font-style: normal;
              font-weight: 500;
              line-height: normal
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            "
          >
            ${storeInfo.description[0]}
          </div>
        </div>
      `);
    } else {
      alert("스토어 정보 취득에 실패하였습니다.");
    }

    return newInfoWindow;
  };

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!selectedLocation) {
        alert("검색할 지역을 선택해주세요.");
      } else {
        router.push(
          `/popup-map/map-search-result?search=${e.currentTarget.value}&location=${selectedLocation}`
        );
      }
    }
  };

  const changeMarker = (markerType: string) => {
    setSelectedCategory(markerType);
  };

  useEffect(() => {
    if (selectedCategory === "cafe") {
      const markerToCafe = DUMMY_FOOD_CAFE_LIST.filter((item) => {
        item.option === "cafe";
      });
      addCafeMarkers(markerToCafe);
      removeMarker("cafe");
    } else if (selectedCategory === "food") {
      const markerToFood = DUMMY_FOOD_CAFE_LIST.filter((item) => {
        item.option === "food";
      });
      addFoodMarkers(markerToFood);
      removeMarker("food");
    }
  }, [selectedCategory]);

  useEffect(() => {
    addStoreMarkers();
  }, [storeList]);

  // 재희형이 말한 기능 구현 보류중...
  // useEffect(() => {
  //   if (clickedStore && isOpenMenu && isViewDesc) {
  //     const clickedStoreMarker: naver.maps.Marker | undefined =
  //       storeMarkerList.find(
  //         (marker) => marker.getTitle() === clickedStore.title
  //       );
  //     clickedStoreMarker && openInfoWindow(clickedStoreMarker);
  //   }
  // }, [isOpenMenu, clickedStore, isViewDesc]);

  const popupStoreAPI = async (selectedLocation: string | null = null) => {
    var APIurl = "";

    if (selectedLocation) {
      const district = selectedLocation.split(" ")[1];
      APIurl = `/api/maps/off-popups?district=${district}`;
    } else {
      APIurl = `/api/maps/off-popups`;
    }

    await axiosInstance
      .get(APIurl)
      .then((response: any) => {
        setStoreList(response.data.popupStores);
      })
      .catch((error: any) => {
        console.error("There was an error making the GET request!", error);
      });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const hotPlace = url.searchParams.get("hotPlace");
    if (hotPlace === "true") {
      const storedData = sessionStorage.getItem("popupStores");
      setStoreList(JSON.parse(storedData!));
    } else {
      sessionStorage.removeItem("popupStores");
      sessionStorage.removeItem("subwayCoor");
      popupStoreAPI();
    }

    if (navigator.geolocation) {
      const subwayCoor = sessionStorage.getItem("subwayCoor");

      if (subwayCoor) {
        const coords = JSON.parse(subwayCoor);
        setSubwayLocation({ lat: coords[1], lng: coords[0] });
      }

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
          setIsLoading(false); // 위치를 가져오지 못하더라
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
        // 이하 사용자 위치 마커 (마커 디자인 바꿀지?)
        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            userLocation.lat,
            userLocation.lng
          ),
          map: mapRef.current,
          icon: {
            content: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <circle cx="10" cy="10" r="10" fill="#27B1FF"/>
  <circle cx="10" cy="10" r="5" fill="white"/>
</svg>`,
            anchor: new window.naver.maps.Point(5, 5),
          },
        });
        addStoreMarkers();
      } else {
        // 위치가 업데이트될 때마다 마커 위치를 업데이트합니다.
        markerRef.current.setPosition(
          new window.naver.maps.LatLng(userLocation.lat, userLocation.lng)
        );
      }
    }
  }, [userLocation]);

  useEffect(() => {
    if (mapRef.current && locationResetRef.current && userLocation) {
      const mapHeight = isOpenMenu
        ? "calc(30dvh + 40px)"
        : "calc(100dvh)";
      const mapButtom = isOpenMenu
        ? "calc(70% + 40px)"
        : "80px";
      mapRef.current.getElement().style.height = mapHeight;
      locationResetRef.current.style.setProperty('bottom', mapButtom);


      if (subwayLocation) {
        var newCenter = new window.naver.maps.LatLng(
          subwayLocation.lat,
          subwayLocation.lng
        );
      } else {
        var newCenter = new window.naver.maps.LatLng(
          userLocation.lat,
          userLocation.lng
        );
      }

      // 지도 높이 변경 후 중심 조정
      window.naver.maps.Event.trigger(mapRef.current, "resize");
      mapRef.current.setCenter(newCenter);
    }
  }, [isOpenMenu, userLocation, locationResetRef]);

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
    <DefaultLayout top={0} right={0} left={0} bottom={0}>
      <MapContainer>
        <StyledNaverMap id="map" style={{ width: "100%", height: '100dvh' }} />
        {!isLoading && (
          <LocationResetBtn onClick={handleLocationButtonClick} ref={locationResetRef}>
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
            <ControlContainer>
              <div style={{ marginLeft: 20 }}>
                <Back />
              </div>
              <div onClick={activeSearchHandler} style={{ marginRight: 20 }}>
                <IconSearch
                  width={16}
                  height={16}
                  color={COLORS.secondaryColor}
                />
              </div>
            </ControlContainer>
          </>
        ) : (
          <>
            <SearchContainer>
              <SearchControlContainer>
                <div style={{ marginLeft: 20 }}>
                  <Back />
                </div>
                <p>검색</p>
                <TransparentButton onClick={activeSearchHandler} style={{ marginRight: 20 }}>
                  <IconX width={16} height={16} color={COLORS.secondaryColor} />
                </TransparentButton>
              </SearchControlContainer>

              <SearchContentsContainer>
                <StyledSelect
                  options={DUMMY_SEOUL_OPTIONS}
                  placeholder={"지역선택"}
                  styles={{
                    color: COLORS.secondaryColor,
                    backgroundColor: COLORS.whiteColor,
                    border: false,
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                  onChangeHandler={(e: any) => {
                    popupStoreAPI(e.value);
                    setSelectedLocation(e.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요."
                  onKeyDown={searchHandler}
                />
              </SearchContentsContainer>
            </SearchContainer>
          </>
        )}
      </MapContainer>

      {/* TODO slide button menu (디자인의 변경 할 예정) */}
      <SlideBottomMenu $isOpen={isOpenMenu}>
        <ToggleButton
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
          }}
        />
        {isOpenMenu && !isViewDesc && (
          <StoreInformationList>
            <StoreCardList storeList={storeList} isPopper={userData.isPopper} />
          </StoreInformationList>
        )}
      </SlideBottomMenu>
    </DefaultLayout>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100dvh;
  position: relative;
`;

const LocationResetBtn = styled.div`
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: absolute;
  z-index: 1;
  bottom: 80px;
  right: 20px;
  padding: 0;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const StyledNaverMap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const ControlContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
`;

const SearchControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;

  margin-top: 16px;

  & > p {
    text-align: center;
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

const SearchContainer = styled.div`
  position: fixed;
  max-width: 600px;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 12px;
  background-color: ${COLORS.whiteColor};
  padding-bottom: 12px;
`;

const SearchContentsContainer = styled.div`
  width: calc(100% - 40px);

  display: flex;
  align-items: center;
  gap: 8px;

  & > input {
    border: none;
    background-color: ${COLORS.lightGreyColor};
    width: 100%;
    outline: none;
    padding: 8px 16px;
    border-radius: 16px;

    &::placeholder {
      font-size: 12px;
      font-weight: 500;
      color: ${COLORS.greyColor};
    }
  }
`;

const SlideBottomMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  z-index: 101;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  max-width: 600px;
  height: ${(props) => (props.$isOpen ? "70dvh" : "40px")};

  border-radius: 16px 16px 0px 0px;
  background-color: ${COLORS.whiteColor};

  transition: height 0.3s ease, transform 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
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
  outline: none;
`;

const StoreInformationList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: row wrap;
  gap: 28px;
  margin-top: 40px;
  overflow-y: auto;
  width: 100%;
  padding-bottom: 40px;
`;

export default MapComponent;
