import {
	FlatList,
	Pressable,
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { allImages } from "@/assets/images/plantsImports";
import allObjects from "../../../assets/allPlantsObject";
import Tags from "@/components/tags";

const select = () => {
	const router = useRouter();
	const [inputList, setInputList] = useState<typeof allObjects>([]);
	const [searchBarValue, setSearchBarValue] = useState("");
	const [tag, setTag] = useState<"Flowering plant" | "Culinary" | "Succulents & Cacti" | "null">(
		"null"
	);

	//change the inputlist in regards to the tags and the change in the search bar
	function updateSearch(Textquery: string) {
		setSearchBarValue(Textquery);

		const tmp = allObjects.filter((item) =>
			item.name.toLowerCase().startsWith(Textquery.trim().toLowerCase())
		);
		const tmp2 = tmp.filter((item) => tag === "null" || item.category === tag);
		const EMPTY_ITEM = { name: "__empty__", category: "__empty__" };
		setInputList(tmp2.length % 2 === 0 ? tmp2 : [...tmp2, EMPTY_ITEM]);
	}

	useEffect(() => updateSearch(searchBarValue), [tag]);

	return (
		<View style={{ flex: 1 }}>
			<Pressable
				onPress={() => {
					router.replace("/(tabs)/interiorPlants");
				}}
			>
				<Ionicons name="arrow-back" size={50} />
			</Pressable>
			<TextInput
				placeholder="Search"
				clearButtonMode="always"
				value={searchBarValue}
				onChangeText={(query) => updateSearch(query)}
			/>
			<Tags tag={tag} setTag={setTag} />
			<View style={{ flex: 1 }}>
				<FlatList
					data={inputList}
					numColumns={2}
					columnWrapperStyle={styles.row}
					contentContainerStyle={styles.list}
					renderItem={({ item }) => {
						if (item.name !== "__empty__") {
							return (
								<TouchableOpacity
									activeOpacity={0.5}
									onPress={() => {
										router.push(`./${item.name}`);
									}}
									style={styles.card}
								>
									<Image
										style={styles.img}
										source={allImages[item.name] ? allImages[item.name] : allImages["marguerite"]}
									/>
									<Text style={styles.cardText}>{item.name}</Text>
								</TouchableOpacity>
							);
						} else {
							return <View style={[styles.card, { backgroundColor: "transparent" }]} />;
						}
					}}
					keyExtractor={(item) => item.name}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		padding: 10,
		//paddingBottom: 100,
	},
	row: {
		gap: 10,
	},
	card: {
		flex: 1,
		backgroundColor: "#523c3cff",
		padding: 20,
		borderRadius: 15,
		alignItems: "center",
		marginBottom: 10,
	},
	cardText: {
		color: "#fff",
		fontSize: 16,
		position: "absolute",
		bottom: "10%",
		left: "10%",
	},
	img: {
		height: 150,
		width: 150,
		resizeMode: "contain",
	},
});

export default select;
