// "use client";  // 클라이언트 컴포넌트로 설정

// import React, { useEffect, useState, useRef  } from "react";
// import { DefaultLayout } from "@/app/components/layout";
// import { styled } from "styled-components";
// import axiosInstance from "@/public/network/axios";

// interface GeoData {
//   type: string;
//   coordinates: number[];
// }

// interface LocationData {
//   address: string;
//   placeName: string;
//   geoData: GeoData;
// }

// interface PopStoreData {
//   id: string;
//   title: string;
//   location: LocationData,
//   startDate: string;
//   endDate: string;
//   openTime: string[];
//   event: string[];
// }



// const MapTestPage: React.FC = () => {
  
//   const [kakao,setKakao] = useState();
//   const [mapInstance, setMapInstance] = useState();
//   const [userLocation, setUserLocation] = useState<number[]>();
//   const [isExpanded, setIsExpanded] = useState(false); // 접었다 펴는 상태 관리
//   const [popupStore, setPopupStore] = useState<PopStoreData[]>();

//   //
//   const coffeeMarkersRef = useRef([]); // 커피숍 마커를 저장하는 ref
//   const storeMarkersRef = useRef([]); // 편의점 마커를 저장하는 ref
//   const [selectedCategory, setSelectedCategory] = useState('coffee');
//   const handleCategoryClick = (category:string) => {
//     setSelectedCategory(category);
//     changeMarker(category);
//   };
//   const changeMarker = (type:string) => {
//     setSelectedCategory(type);

//     // 선택된 카테고리에 따라 마커를 설정합니다
//     if (type === 'coffee') {
//       setCoffeeMarkers(mapInstance);  // 커피숍 마커를 지도에 표시
//       setStoreMarkers(null);  // 편의점 마커를 지도에서 제거
//     } else if (type === 'store') {
//       setCoffeeMarkers(null);
//       setStoreMarkers(mapInstance);
//     }
//   };
//   // 커피숍 마커들을 지도에 표시하는 함수
//   const setCoffeeMarkers = (map:any) => {
//     const markers = coffeeMarkersRef.current;
//     markers.forEach((marker:any) => marker.setMap(map));
//   };
//   // 편의점 마커들의 지도에 표시하는 함수
//   const setStoreMarkers = (map:any) => {
//     const markers = storeMarkersRef.current;
//     markers.forEach((marker:any) => marker.setMap(map));
//   };

//   // 마커 이미지를 생성하는 유틸리티 함수
//   const createMarkerImage = (src, size, options) => {
//     return new kakao.maps.MarkerImage(src, size, options);
//   };

//   // 마커를 생성하는 유틸리티 함수
//   const createMarker = (position, image) => {
//     return new kakao.maps.Marker({
//       position: position,
//       image: image,
//     });
//   };

//   const createCoffeeMarkers = (map) => {
//     const coffeePositions = [
//       new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
//       new kakao.maps.LatLng(37.499427948430814, 127.02794423197847),
//       new kakao.maps.LatLng(37.498553760499505, 127.02882598822454),
//       new kakao.maps.LatLng(37.497625593121384, 127.02935713582038),
//       new kakao.maps.LatLng(37.49646391248451, 127.02675574250912),
//       new kakao.maps.LatLng(37.49629291770947, 127.02587362608637),
//       new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)
//     ];

//     const markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';

//     coffeePositions.forEach((position) => {
//       const imageSize = new kakao.maps.Size(22, 26);
//       const imageOptions = {
//         spriteOrigin: new kakao.maps.Point(10, 0),
//         spriteSize: new kakao.maps.Size(36, 98),
//       };

//       // 마커 이미지와 마커 생성
//       const markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions);
//       const marker = createMarker(position, markerImage);

//       // 마커 배열에 추가
//       coffeeMarkersRef.current.push(marker);
//     });
//   };

//   // 편의점 마커들을 생성하고 배열에 추가하는 함수
//   const createStoreMarkers = () => {
//     const storePositions = [
//       new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
//       new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
//       new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
//       new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
//       new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
//       new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
//       new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
//     ];

//     const markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';

//     storePositions.forEach((position) => {
//       const imageSize = new kakao.maps.Size(22, 26);
//       const imageOptions = {
//         spriteOrigin: new kakao.maps.Point(10, 36),
//         spriteSize: new kakao.maps.Size(36, 98),
//       };

//       // 마커 이미지와 마커 생성
//       const markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions);
//       const marker = createMarker(position, markerImage);

//       // 마커 배열에 추가
//       storeMarkersRef.current.push(marker);
//     });
//   };



//   const popupStoreAPI = async () =>{

//     await axiosInstance.get(`/api/maps/stores`)
//     .then((response:any) => {
//       setPopupStore(response.data.popupStores)
//     })
//     .catch((error:any) => {
//       console.error('There was an error making the GET request!', error);
//     });
//   }

//   // 현재 위치 가져오기
//   const getUserLocation = () =>{
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([latitude, longitude]);
//           // 위도는 37.43422636425472, 경도는 127.12936571882061
//         },
//         (error) => {
//           console.error('Error getting location', error);
//         },
//         // {
//         //   enableHighAccuracy: true,
//         //   timeout: 5000,
//         //   maximumAge: 0,
//         // }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };

//   useEffect(()=>{
//     getUserLocation();
//     popupStoreAPI();
//   },[]);

//   useEffect(()=>{
//     if (userLocation){
//       const script = document.createElement('script');
//       script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=ac2db24dbfbd7f14b74f515ed599011d&autoload=false';
//       script.async = true;
//       document.body.appendChild(script);
  
//       script.onload = () => {
//         const kakao = (window as any).kakao;
//         setKakao(kakao)
  
//         kakao.maps.load(() => {
//           const container = document.getElementById('map');
//           const options = {
//             center: new kakao.maps.LatLng(userLocation[0], userLocation[1]),
//             level: 3,
//           };
//           const mapInstance = new kakao.maps.Map(container, options);

//           setMapInstance(mapInstance)

//           // 커피숍 마커 생성
//           createCoffeeMarkers(mapInstance);
//           // 편의점 마커 생성
//           createStoreMarkers();

//           const marker = new kakao.maps.Marker({
//             position: new kakao.maps.LatLng(userLocation[0], userLocation[1]),
//           });
//           marker.setMap(mapInstance);
  
//           return () => {
//             document.body.removeChild(script);
//           };
//         });
//       };
//     }
//   },[userLocation]);

//   return (
//     <DefaultLayout top="16px" right="20px" bottom="32px" left="20px">
//       <Container>
//         <KakaoMap id="map"></KakaoMap>
//         <div className="category">
//           <ul>
//             <li 
//               id="coffeeMenu" 
//               className={selectedCategory === 'coffee' ? 'menu_selected' : ''} 
//               onClick={() => handleCategoryClick('coffee')}
//             >
//               <span className="ico_comm ico_coffee"></span>
//               커피숍
//             </li>
//             <li 
//               id="storeMenu" 
//               className={selectedCategory === 'store' ? 'menu_selected' : ''} 
//               onClick={() => handleCategoryClick('store')}
//             >
//               <span className="ico_comm ico_store"></span>
//               편의점
//             </li>
//           </ul>
//         </div>


//         <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
//           {isExpanded ? '접기' : '펼치기'}
//         </ToggleButton>
//         <ExpandableDiv isExpanded={isExpanded}>
//           <p>여기에 추가적인 내용을 넣을 수 있습니다.</p>
//         </ExpandableDiv>
//       </Container>
//     </DefaultLayout>
//   );
// };

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
// `;

// const KakaoMap = styled.div`
//   flex: 1;
//   width: 100%;
// `;

// const ToggleButton = styled.button`
//   margin-top: 10px;
//   padding: 10px;
//   cursor: pointer;
// `;

// const ExpandableDiv = styled.div<{ isExpanded: boolean }>`
//   overflow: hidden;
//   height: ${({ isExpanded }) => (isExpanded ? '700px' : '0')};
//   transition: height 0.3s ease;
//   background-color: #ffffff;
//   padding: ${({ isExpanded }) => (isExpanded ? '10px' : '0')};
//   overflow-y: auto;
// `;

// export default MapTestPage;

