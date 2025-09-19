import { allImages } from "@/assets/images/plantsImports";
import Spacer from "@/components/Spacer";
import Tags from "@/components/tags";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import allObjects from "../../../assets/allPlantsObject";

const screenWidth = Dimensions.get("window").width;

const Page = () => {
	const screenWidth = Dimensions.get("window").width;
	const router = useRouter();
	const [inputList, setInputList] = useState<typeof allObjects>([]);
	const [searchBarValue, setSearchBarValue] = useState("");
	const [tag, setTag] = useState<
		"Flowering plant" | "Culinary" | "Succulents & Cacti" | "null"
	>("null");

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
		<View style={styles.container}>
			<View style={styles.viewtitle}>
				<Pressable
					onPress={() => {
						router.replace("/interiorPlants");
					}}
				>
					<Ionicons name="arrow-back" style={styles.icon} size={30} />
				</Pressable>
				<Text style={styles.title}>What's your plant ?</Text>
				<View style={{ width: 30 }} />
			</View>
			<Spacer space={20} />
			<View style={styles.search}>
				<Ionicons name="search" size={22} />
				<TextInput
					placeholder="Search by name"
					clearButtonMode="always"
					value={searchBarValue}
					style={styles.txtsearch}
					onChangeText={(query) => updateSearch(query)}
				/>
			</View>
			<Tags tag={tag} setTag={setTag} />
			<Spacer space={10} />

			<FlatList
				data={inputList}
				numColumns={2}
				columnWrapperStyle={{ gap: screenWidth * 0.02 }}
				renderItem={({ item }) => {
					if (item.name !== "__empty__") {
						return (
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => {
									router.push(`./${item.name}`);
								}}
							>
								<View style={styles.card}>
									<Image
										style={styles.img}
										source={
											allImages[item.name]
												? allImages[item.name]
												: allImages["marguerite"]
										}
									/>
									<View style={styles.viewTxt}>
										<Text style={styles.cardText}>{item.name}</Text>
									</View>
								</View>
								<View style={styles.border}></View>
							</TouchableOpacity>
						);
					} else {
						return <View />;
					}
				}}
				keyExtractor={(item) => item.name}
			/>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ecebe0",
		paddingHorizontal: screenWidth * 0.04,
	},
	title: {
		textAlign: "center",
		fontSize: 23,
		fontWeight: "500",
		color: "#444600",
		flex: 1,
		fontFamily: "UrbanistSemiBold",
	},
	icon: {
		width: 30,
	},
	viewtitle: {
		paddingVertical: 30,
		borderBottomWidth: 1,
		borderColor: "#DAD7BE",
		flexDirection: "row",
	},
	search: {
		padding: 10,
		flexDirection: "row",
		backgroundColor: "#ffffff75",
		height: 38,
		borderRadius: 5,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#DAD7BE",
		elevation: 3,
	},
	txtsearch: {
		paddingLeft: 10,
		color: "#2a2b03a6",
		includeFontPadding: false,
		fontFamily: "UrbanistRegular",
		fontSize: 12,
	},
	card: {
		width: screenWidth * 0.45,
		height: 170,
		backgroundColor: "#DFDFBE",
		justifyContent: "center",
		borderRadius: 5,
		marginBottom: 10,
	},
	img: {
		width: screenWidth * 0.45,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		height: 140,
		resizeMode: "cover",
	},
	viewTxt: {
		borderColor: "#C8C97F",
		borderTopWidth: 1,
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
	},
	cardText: {
		color: "#444600",
		fontSize: 14,
		textAlign: "center",
		fontWeight: "300",
		fontFamily: "UrbanistRegular",
	},
	border: {
		position: "absolute",
		borderWidth: 2,
		width: screenWidth * 0.45,
		height: 170,
		borderRadius: 5,
		borderColor: "#C8C97F",
	},
});
