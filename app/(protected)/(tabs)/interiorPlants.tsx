import { Image, ScrollView, Dimensions } from "react-native";
import React, { useMemo } from "react";
import Plant from "../../../components/plant";
import { usePlants } from "@/providers/PlantProvider";

type Plant = {
	id: number;
	X: number;
	Y: number;
	species: string;
};

const interiorPlants = () => {
	const screenHeight = Dimensions.get("window").height - 70;
	const originalWidth = 1198;
	const originalHeight = 285;
	const scaleFactor = screenHeight / originalHeight;

	const { plants } = usePlants();
	const plants_pos = [
		{ X: 0.1, Y: 0.55 },
		{ X: 0.23, Y: 0.15 },
		{ X: 0.28, Y: 0.75 },
		{ X: 0.37, Y: 0.6 },
		{ X: 0.42, Y: 0.25 },
	];

	const plantsList = useMemo(() => {
		return plants.slice(0, 15).map((p: Plant, i: number) => {
			const pos = plants_pos[i] || { X: 0, Y: 0 };
			return {
				id: i,
				X: pos.X,
				Y: pos.Y,
				species: p.species,
			};
		});
	}, [plants]);

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
			{plantsList &&
				plantsList.map((plant: Plant) => (
					<Plant
						key={plant.id}
						X={plant.X}
						Y={plant.Y}
						species={plant.species}
					/>
				))}
		</ScrollView>
	);
};

export default interiorPlants;
