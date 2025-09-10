import { Button, FlatList, StyleSheet, Text } from "react-native";
import PlantModal from "@/components/plantModal";
import usePlantsData from "@/hooks/usePlantsData";

export default function ListPlants() {
	const { plants, isLoaded, error, loadPlants } = usePlantsData();

	return (
		<>
			<Button onPress={loadPlants} title="reload" />
			<Text>{plants.length}</Text>
			<FlatList
				data={plants}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					return <PlantModal item={item} />;
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 2,
		borderRadius: 5,
		margin: 15,
		padding: 10,
		flexDirection: "row",
	},
	cardText: {},
	img: {
		height: 100,
		width: 100,
	},
});
