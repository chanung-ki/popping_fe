import { COLORS } from '@/public/styles/colors';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IconUser } from './icons';
import { Loading } from './loading';
import { fadeIn } from '@/public/utils/keyframe';

declare global {
  interface Window {
    naver: any;
  }
}

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>();
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false); // 버튼 가시성 상태
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태

  const mapRef = useRef<any>(null); // 지도 객체를 저장하기 위한 ref
  const markerRef = useRef<any>(null); // 마커 객체를 저장하기 위한 ref

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          setIsButtonVisible(false); // 초기화 시 버튼 숨김
          setIsLoading(false); // 위치를 성공적으로 가져오면 로딩 상태 해제
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false); // 위치를 가져오지 못하더라도 로딩 상태 해제
        }
      );
    } else {
      setIsLoading(false); // Geolocation을 지원하지 않는 경우 로딩 상태 해제
    }
  }, []);

  useEffect(() => {
    if (userLocation && window.naver) {
      if (!mapRef.current) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
          zoom: 15,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          mapTypeControl: false,
          logoControlOptions: {
            position: naver.maps.Position.BOTTOM_LEFT
          },
        };
        mapRef.current = new window.naver.maps.Map('map', mapOptions);

        // 지도 이동 시 버튼을 보이게 하는 이벤트 추가
        window.naver.maps.Event.addListener(mapRef.current, 'idle', () => {
          const center = mapRef.current.getCenter();
          const distance = Math.sqrt(
            Math.pow(center.lat() - userLocation.lat, 2) + Math.pow(center.lng() - userLocation.lng, 2)
          );
          if (distance > 0.001) { // 사용자가 위치에서 벗어났다고 판단할 거리
            setIsButtonVisible(true);
          } else {
            setIsButtonVisible(false);
          }
        });
      }

      if (!markerRef.current) {
        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
          map: mapRef.current,
          icon: {
            content: `<div style="background-color: ${COLORS.mainColor}; padding: 5px; border-radius: 50%; width: 10px; height: 10px; display: flex; justify-content: center; align-items: center;">
                    </div>`,
            anchor: new window.naver.maps.Point(5, 5), // 마커의 중심점을 설정
          },
        });
      } else {
        markerRef.current.setPosition(new window.naver.maps.LatLng(userLocation.lat, userLocation.lng));
      }
    }
  }, [userLocation]);

  const handleLocationButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          if (mapRef.current) {
            const newCenter = new window.naver.maps.LatLng(lat, lng);
            mapRef.current.setCenter(newCenter);
            mapRef.current.setZoom(15);
            setIsButtonVisible(false); // 버튼 숨김
            setIsLoading(false); // 위치를 가져오지 못하더라도 로딩 상태 해제
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false); // 위치를 가져오지 못하더라도 로딩 상태 해제
        }
      );
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isButtonVisible && (
        <LocationResetBtn onClick={handleLocationButtonClick}>
          <IconUser color={COLORS.mainColor} width={undefined} height={30} />
        </LocationResetBtn>
      )}
      {isLoading ? <Loading /> : <div id="map" style={{ width: '100%', height: '100%' }} />}
    </div>
  );
};


const LocationResetBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;

  position: fixed;
  z-index: 1;
  
  bottom: 20px;
  right: 20px;
  padding: 0;

  // 버튼이 보일 때 서서히 나타나도록 애니메이션 추가
  animation: ${fadeIn} 0.5s ease-in-out;
`;


export default MapComponent;
