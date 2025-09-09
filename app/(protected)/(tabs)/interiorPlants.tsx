import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import Plant from "../../../components/plant";
import listePlants from "./listePlants";

const interiorPlants = () => {
	const screenHeight = Dimensions.get("window").height - 70;
	const originalWidth = 1198;
	const originalHeight = 285;
	const scaleFactor = screenHeight / originalHeight;
	const plants_pos = [
		{ id: 1, X: 0.1, Y: 0.6, imgsrc: "plant1" },
		{ id: 2, X: 0.2, Y: 0.2, imgsrc: "plant1" },
	];

	return (
		<ScrollView horizontal={true} style={{ flex: 1 }}>
			{/* background */}
			<Image
				source={require("../../../assets/images/testScroll.png")}
				resizeMode="contain"
				style={{
					width: originalWidth * scaleFactor,
					height: screenHeight,
				}}
			/>
			{/* Les plantes */}
			{plants_pos.map((plant) => (
				<Plant key={plant.id} X={plant.X} Y={plant.Y} imgsrc={plant.imgsrc} />
			))}
			{/* <Plant X={0.1} Y={0.6} imgsrc="plant1" />
			<Plant X={0.215} Y={0.18} imgsrc="plant2" /> */}
		</ScrollView>
	);
};

export default interiorPlants;
