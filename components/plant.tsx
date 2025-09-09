import { StyleSheet, Text, Image, Dimensions } from "react-native";
import React from "react";

const screenHeight = Dimensions.get("window").height - 70; // - tabbarheight
const originalWidth = 1198;
const originalHeight = 285;
const scaleFactor = screenHeight / originalHeight;

type plantProps = {
  X: number;
  Y: number;
  imgsrc: string;
};

const images: { [key: string]: any } = {
  plant1: require("../assets/images/react-logo.png"),
  plant2: require("../assets/images/react-logo.png"),
};

const Plant = (props: plantProps) => {
  return (
    <Image
      //
      source={images[props.imgsrc]}
      style={{
        width: 100,
        height: 100,
        left: props.X * scaleFactor * originalWidth - 50, // 50 = plantsize / 2 pr centrer
        top: props.Y * scaleFactor * originalHeight - 50,
        resizeMode: "contain",
        position: "absolute",
      }}
    />
  );
};

export default Plant;

const styles = StyleSheet.create({});
