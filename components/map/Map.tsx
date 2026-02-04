import { MapView, Marker } from "expo-gaode-map-navigation";
import React from "react";
import { View } from "react-native";

export default function BasicMapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialCameraPosition={{
          target: { latitude: 39.909186, longitude: 116.397411 },
          zoom: 15,
        }}
        style={{ flex: 1 }}
      >
        <Marker position={{ latitude: 39.909186, longitude: 116.397411 }} title="天安门" />
      </MapView>
    </View>
  );
}
