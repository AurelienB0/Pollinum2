import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	tag: string;
	setTag: React.Dispatch<
		React.SetStateAction<
			"Flowering plant" | "Culinary" | "Succulents & Cacti" | "null"
		>
	>;
};
type tagProps = {
	name: "Flowering plant" | "Culinary" | "Succulents & Cacti" | "null";
	tag: string;
	setTag: React.Dispatch<
		React.SetStateAction<
			"Flowering plant" | "Culinary" | "Succulents & Cacti" | "null"
		>
	>;
};

const ToggleTag = ({ name, tag, setTag }: tagProps) => {
	return (
		<Pressable
			onPress={() => {
				tag === name ? setTag("null") : setTag(name);
			}}
		>
			<View
				style={
					tag === name
						? [styles.idle, { backgroundColor: "#c8c97fbb" }]
						: styles.idle
				}
			>
				<Text style={{ fontSize: 12 }}>{name}</Text>
			</View>
		</Pressable>
	);
};

const Tags = ({ tag, setTag }: Props) => {
	return (
		<View style={{ flexDirection: "row" }}>
			<ToggleTag name="Culinary" tag={tag} setTag={setTag} />
			<ToggleTag name="Flowering plant" tag={tag} setTag={setTag} />
			<ToggleTag name="Succulents & Cacti" tag={tag} setTag={setTag} />
		</View>
	);
};

export default Tags;

const styles = StyleSheet.create({
	idle: {
		backgroundColor: "#c8c97f50",
		padding: 5,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#c8c97fff",
		margin: 10,
	},
});
