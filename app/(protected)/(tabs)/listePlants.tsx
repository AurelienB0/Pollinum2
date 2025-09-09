import { useEffect, useState } from "react";
import { useUser, useSession } from "@clerk/clerk-expo";
import { Button, FlatList, StyleSheet, Text } from "react-native";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "expo-router";

import PlantModal from "@/components/plantModal";

export default function listePlants() {
	const [plants, setPlants] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const { supabase } = useSupabase();
	const { user } = useUser();
	const { session } = useSession();

	async function loadPlants() {
		if (!session || !supabase) {
			console.log("session or supabase error");
			return;
		}
		setLoading(true);
		const { data, error } = await supabase.from("plants").select();
		if (error) console.log(error);
		setLoading(false);
		if (data) setPlants(data);
	}

	useEffect(() => {
		if (!user) return;
		loadPlants();
	}, [user]);

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
