"use client";  // 클라이언트 컴포넌트로 설정

import React, { useEffect, useState } from "react";
import { DefaultLayout } from "@/app/components/layout";
import { styled } from "styled-components";
import axiosInstance from "@/public/network/axios";

interface GeoData {
  type: string;
  coordinates: number[];
}

interface LocationData {
  address: string;
  placeName: string;
  geoData: GeoData;
}

interface PopupStoreData {
  id: string;
  title: string;
  location: LocationData,
  startDate: string;
  endDate: string;
  openTime: string[];
  event: string[];
  image: any;
}

interface PlaceData {
  title: string;
  bestMenu: string[];
  gradePoint: number;
  loadAddr: string;
  numberAddr: string;
  telNumber: string;
  option: string;
  charTag: string[];
  tags: string[];
  geoData: GeoData;
}

const MapTestPage: React.FC = () => {

  const [selectedStore, setSelectedStore] = useState<PopupStoreData>();
  const [userLocation, setUserLocation] = useState<number[]>();
  const [isExpanded, setIsExpanded] = useState(false); // 접었다 펴는 상태 관리
  const [popupStore, setPopupStore] = useState<PopupStoreData[]>();
  const [popupCoorData, setPopupCoorData] = useState<any[]>([]);
  const [mapInstance, setMapInstance] = useState<any>();
  const [kakao, setKakao] = useState<any>();
  const [kakaoLoad, setKakaoLoad] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [coffeePosition, setCoffeePosition] = useState<any[]>();
  const [foodPosition, setFoodPosition] = useState<any[]>();

  const popupStoreAPI = async () => {

    await axiosInstance.get(`/api/maps/stores`)
      .then((response: any) => {
        setPopupStore(response.data.popupStores)
      })
      .catch((error: any) => {
        console.error('There was an error making the GET request!', error);
      });
  }

  const placeAPI = async (store: PopupStoreData) => {

    await axiosInstance.get(`/api/maps/surround?popupId=${store.id}&meter=1000`)
      .then((response: any) => {

        var coffeePoList: any[] = [];
        var foodPoList: any[] = [];

        response.data.placeData.map((item: PlaceData) => {
          var position = new kakao.maps.LatLng(item.geoData.coordinates[1], item.geoData.coordinates[0])
          if (item.option === 'food') {
            foodPoList.push(position)
          } else if (item.option === 'cafe') {
            coffeePoList.push(position)
          }
        })
        setCoffeePosition(coffeePoList)
        setFoodPosition(foodPoList)
      })
      .catch((error: any) => {
        console.error('There was an error making the GET request!', error);
      });
  }

  useEffect(() => {
    getUserLocation();
    popupStoreAPI();
  }, []);

  // 현재 위치 가져오기
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location', error);
        },
        {
          enableHighAccuracy: true, // 정확하게 가져오라는 뜻
          timeout: 5000,
          maximumAge: 0, // 쿠키에 저장된 위치는 가져오지 말라는 뜻이었나?
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // 현재 위치 및 카카오맵 생성
  useEffect(() => {
    if (userLocation) {
      const script = document.createElement('script');
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=ac2db24dbfbd7f14b74f515ed599011d&autoload=false';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const kakao = (window as any).kakao;
        setKakao(kakao)
        if (kakao && kakao.maps) {

          kakao.maps.load(() => {
            const container = document.getElementById('map');

            // map 로드시 중심위치
            const options = {
              center: new kakao.maps.LatLng(userLocation[0], userLocation[1]),
              level: 3,
            };
            // map생성
            const mapInstance = new kakao.maps.Map(container, options);

            setMapInstance(mapInstance);
            setKakaoLoad(true);


            // 중심 마커 생성
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(userLocation[0], userLocation[1]),
            });
            marker.setMap(mapInstance);

          });
        } else {
          console.error('Kakao Maps API failed to load');
        }
      };
    }
  }, [userLocation]);

  // 가져온 팝업리스트의 위치값과 인포를 지도에 마커로 표시
  useEffect(() => {
    if (popupCoorData && mapInstance) {

      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      popupCoorData.forEach(coordata => {

        var imageSize = new kakao.maps.Size(24, 35);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        var marker = new kakao.maps.Marker({
          map: mapInstance,
          position: coordata.latlng,
          image: markerImage
        });

        var infowindow = new kakao.maps.InfoWindow({
          content: coordata.content
        });

        (function (marker, infowindow) {
          // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.open(mapInstance, marker);
          });

          // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });
        })(marker, infowindow);

      });
    }
  }, [popupCoorData])

  // 가져온 popupStore list의 위치데이터
  useEffect(() => {
    if (popupStore) {
      // popupStore를 기반으로 popupCoorData 생성
      const coorData = popupStore.map(store => {
        var latitude = store.location.geoData.coordinates[1];
        var longitude = store.location.geoData.coordinates[0];
        return {
          content: `<div style="padding:3px;">${store.title} <a href="https://map.kakao.com/link/to/${store.location.placeName},${latitude},${longitude}" style="color:blue" target="_blank">길찾기</a></div>`,
          latlng: new kakao.maps.LatLng(latitude, longitude)
        };
      });
      setPopupCoorData(coorData);
    }
  }, [popupStore]);

  // 날짜를 YYYY.MM.DD 형식으로 포맷하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const SelectPopup = (store: PopupStoreData) => {
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new kakao.maps.Size(30, 41);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(store.location.geoData.coordinates[1], store.location.geoData.coordinates[0]);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      map: mapInstance // 맵을 설정하여 바로 표시
    });

    // const iwContent = `
    //   <div class="wrap">
    //     <div class="info">
    //       <div class="title">
    //         ${store.title}
    //         <div class="close" onclick="closeOverlay()" title="닫기"></div>
    //       </div>
    //       <div class="body">
    //         <div class="img">
    //           <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
    //         </div>
    //         <div class="desc">
    //           <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
    //           <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
    //           <a href="https://map.kakao.com/link/to/${store.title},${store.location.geoData.coordinates[1]},${store.location.geoData.coordinates[0]}" style="color:blue" target="_blank">길찾기</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // ` ;

    const iwContent = `
      <div style="padding:3px;">
        ${store.title} <a href="https://map.kakao.com/link/to/${store.title},${store.location.geoData.coordinates[1]},${store.location.geoData.coordinates[0]}" style="color:blue" target="_blank">길찾기</a>
      </div>
    `;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    // const infowindow = new kakao.maps.CustomOverlay({
    //     content: iwContent,
    //     position: marker.getPosition(),
    //     map: mapInstance,
    // });
    // infowindow.setMap(mapInstance);

    // 마커 위에 인포윈도우를 표시합니다.
    infowindow.open(mapInstance, marker);

    // 선택한 마커의 위치로 지도의 중심을 이동합니다.
    mapInstance.setCenter(markerPosition);

    setSelectedStore(store);

    placeAPI(store);
  };

  // useEffect(()=>{
  //   placeAPI()
  // },[selectedStore])

  function createMarkerImage(src: any, size: any, options: any) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
  }

  // 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
  function createMarker(position: any, image: any) {
    var marker = new kakao.maps.Marker({
      position: position,
      image: image
    });

    return marker;
  }

  const setCoffeeMarkers = (mapInstance: any) => {
    var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
    var coffeeMarkers: any[] = [];
    coffeePosition!.map((position) => {
      var imageSize = new kakao.maps.Size(22, 26)
      var imageOptions = {
        spriteOrigin: new kakao.maps.Point(10, 0),
        spriteSize: new kakao.maps.Size(36, 98)
      };

      var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
        marker = createMarker(position, markerImage);

      // 생성된 마커를 커피숍 마커 배열에 추가합니다
      coffeeMarkers.push(marker);
    })

    coffeeMarkers.map((item) => {

      item.setMap(mapInstance);
    })
  }

  const setFoodMarkers = (mapInstance: any) => {
    var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
    var storeMarkers: any[] = [];

    foodPosition!.map((position) => {

      var imageSize = new kakao.maps.Size(22, 26)
      var imageOptions = {
        spriteOrigin: new kakao.maps.Point(10, 0),
        spriteSize: new kakao.maps.Size(36, 98)
      };

      var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
        marker = createMarker(position, markerImage);

      // 생성된 마커를 커피숍 마커 배열에 추가합니다
      storeMarkers.push(marker);
    })

    storeMarkers.map((item) => {

      item.setMap(mapInstance);
    })
  }

  const changeMarker = (type: string) => {
    setSelectedCategory(type);

    if (type === 'coffee') {
      setCoffeeMarkers(mapInstance);
      setFoodMarkers(null);

    } else if (type === 'food') {
      setCoffeeMarkers(null);
      setFoodMarkers(mapInstance);
    }
  };

  return (
    <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
      <Container>
        <KakaoMap id="map"></KakaoMap>
        {selectedStore &&
          <CategoryBox className="category">
            <ul>
              <li
                id="coffeeMenu"
                className={selectedCategory === 'coffee' ? 'menu_selected' : ''}
                onClick={() => changeMarker('coffee')}
              >
                <span className="ico_comm ico_coffee"></span>
                커피숍
              </li>
              <li
                id="foodMenu"
                className={selectedCategory === 'food' ? 'menu_selected' : ''}
                onClick={() => changeMarker('food')}
              >
                <span className="ico_comm ico_store"></span>
                맛집
              </li>
            </ul>
          </CategoryBox>
        }        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '접기' : '펼치기'}
        </ToggleButton>
        <ExpandableDiv isExpanded={isExpanded}>
          {selectedStore ? (
            <div>
              <h2>{selectedStore.title}</h2>
              <p>주소: {selectedStore.location.address} {selectedStore.location.placeName}</p>
              <p>이벤트 기간: {formatDate(selectedStore.startDate)} ~ {formatDate(selectedStore.endDate)}</p>
              <p>운영 시간: {selectedStore.openTime.join(", ")}</p>
              <p>이벤트: {selectedStore.event.join(", ")}</p>
              <img src={`data:image/jpeg;base64,${selectedStore.image}`} alt={selectedStore.title} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          ) : (
            popupStore && popupStore.map((store: PopupStoreData) => (
              <StoreContainer onClick={() => { SelectPopup(store) }} key={store.id}>
                <ImgContainer>
                  <img src={`data:image/jpeg;base64,${store.image}`} alt={store.title} />
                </ImgContainer>
                <TextConteiner>
                  <h1>{store.title}</h1>
                  <p>{store.location.address}{store.location.placeName}</p>
                  <p>{formatDate(store.startDate)} ~ {formatDate(store.endDate)}</p>
                </TextConteiner>
              </StoreContainer>
            ))
          )}
        </ExpandableDiv>
      </Container>
    </DefaultLayout>
  );
};

const CategoryBox = styled.div`
  position: absolute;
  overflow: hidden;
  top: 10px;
  left: 10px;
  width: 100px;
  height: 50px;
  z-index: 10;
  border: 1px solid black;
  font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
  font-size: 12px;
  text-align: center;
  background-color: #fff;

  * {
    margin: 0;
    padding: 0;
    color: #000;
  }

  .menu_selected {
    background: #ff5f4a;
    color: #fff;
    border-left: 1px solid #915b2f;
    border-right: 1px solid #915b2f;
    margin: 0 -1px;
  }

  li {
    list-style: none;
    float: left;
    width: 50px;
    height: 45px;
    padding-top: 5px;
    cursor: pointer;
  }

  .ico_comm {
    display: block;
    margin: 0 auto 2px;
    width: 22px;
    height: 26px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png') no-repeat;
  }

  .ico_coffee {
    background-position: -10px 0;
  }

  .ico_store {
    background-position: -10px -36px;
  }

  .ico_carpark {
    background-position: -10px -72px;
  }
`;

const ImgContainer = styled.div`
  flex: 0 0 auto; /* 이미지 컨테이너의 크기 조절 */

  img {
    width: 100%;
    height: 100%;
    max-width: 160px;
  }
`;

const TextConteiner = styled.div`
  flex: 1; /* 텍스트 컨테이너가 남은 공간을 차지하도록 설정 */
  h1{
    font-size: 25px;
    font-weight: 10px
  }
  p{
    margin-top: 10px;
    font-size: 15px;
  }
`;

const StoreContainer = styled.div`
  margin-bottom: 20px;
  display: flex; /* Flexbox 활성화 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 10px; /* 필요에 따라 마진 조절 */
  border: 1px solid #ccc; /* 필요에 따라 테두리 추가 */
  padding: 10px; /* 필요에 따라 패딩 추가 */
  border-radius: 8px; /* 필요에 따라 테두리 반경 추가 */
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95vh;
`;

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

const ToggleButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
`;

const ExpandableDiv = styled.div<{ isExpanded: Boolean }>`
  overflow: hidden;
  height: ${({ isExpanded }) => (isExpanded ? '1000px' : '0px')};
  transition: height 0.3s ease;
  background-color: #ffffff;
  padding: ${({ isExpanded }) => (isExpanded ? '10px' : '0px')};
  overflow-y: auto;
`;

export default MapTestPage;