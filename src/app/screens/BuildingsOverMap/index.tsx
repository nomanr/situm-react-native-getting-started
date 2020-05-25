import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import MapView, { Overlay } from "react-native-maps";
import SitumPlugin from "react-native-situm-plugin";

import styles from "./styles";

export const BuildingsOverMap = (props: {
  componentId: string;
  building: any;
}) => {
  const [building, setBuilding] = useState<any>(props.building);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [step, setStep] = useState<String>();
  const [mapImage, setMapImage] = useState<String>();
  const [bounds, setBounds] = useState<any>();
  const [mapRegion, setMapRegion] = useState<any>({
    latitude: building.center.latitude,
    longitude: building.center.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const getFloorsFromBuilding = () => {
    setIsLoading(true);
    setStep("fetchFloorsFromBuilding");
    SitumPlugin.fetchFloorsFromBuilding(
      building,
      (floors: any) => {
        setIsLoading(false);

        if (floors.length > 0) {
          setBounds([
            [
              building.bounds.northEast.latitude,
              building.bounds.southWest.longitude,
            ],
            [
              building.bounds.southWest.latitude,
              building.bounds.northEast.longitude,
            ],
          ]);
          setMapImage(floors[0].mapUrl);
          // getMapFromFloor(floors[0]);
        } else {
          console.log("No floors found!");
        }
      },
      (error: string) => {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  const getMapFromFloor = (floor: any) => {
    setIsLoading(true);
    setStep("fetchMapFromFloor");
    SitumPlugin.fetchMapFromFloor(
      floor,
      (map: any) => {
        setIsLoading(false);
        setMapImage("data:image/png;base64," + map);
      },
      (error: string) => {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    getFloorsFromBuilding();
  }, [props.componentId]);
  return (
    <View style={styles.container}>
      <MapView style={{ width: "100%", height: "100%" }} region={mapRegion}>
        {mapImage != undefined && (
          <Overlay image={mapImage} bounds={bounds} zIndex={1000} />
        )}
      </MapView>

      {isLoading && (
        <View style={{ position: "absolute" }}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
    </View>
  );
};
