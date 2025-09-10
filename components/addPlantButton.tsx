import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "expo-router";

type Schedule = {
	value: string | null;
	unit: string;
	timer: string;
	schedule: string;
	last_care: null;
};

type Props = {
	species: string;
	name: string;
	moreInfo: string;
	water: Schedule;
	fog: Schedule;
	sun: Schedule;
	shade: Schedule;
	error: string | null;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const AddPlantButton = ({
	species,
	moreInfo,
	name,
	water,
	fog,
	sun,
	shade,
	error,
	setError,
}: Props) => {
	const router = useRouter();
	const { supabase } = useSupabase();
	const { userId } = useAuth();
	const [Loading, setLoading] = useState(false);

	async function sendData() {
		setError(null);
		//Checks
		if (
			water.value !== null &&
			(water.value === "" || parseInt(water.value) < 1)
		) {
			setError("Enter valid water quantity");
			return;
		}
		if (fog.value !== null && (fog.value === "" || parseInt(fog.value) < 1)) {
			setError("Enter valid fog quantity");
			return;
		}
		if (sun.value !== null && (sun.value === "" || parseInt(sun.value) < 1)) {
			setError("Enter valid sun duration");
			return;
		}
		if (
			shade.value !== null &&
			(shade.value === "" || parseInt(shade.value) < 1)
		) {
			setError("Enter valid shade duration");
			return;
		}

		if (water.timer === "" || parseInt(water.timer) < 1) {
			setError("Enter valid water remind time");
			return;
		}
		if (fog.timer === "" || parseInt(fog.timer) < 1) {
			setError("Enter valid fog remind time");
			return;
		}
		if (sun.timer === "" || parseInt(sun.timer) < 1) {
			setError("Enter valid sun remind time");
			return;
		}
		if (shade.timer === "" || parseInt(shade.timer) < 1) {
			setError("Enter valid shade remind time");
			return;
		}

		if (!supabase) {
			setError("Server error");
			return;
		}

		if (error === null) {
			setLoading(true);
			const { data, error } = await supabase.from("plants").insert([
				{
					user_id: userId,
					moreInfo: moreInfo,
					species: species,
					name: name,
					water: water.value ? water : null,
					fog: fog.value ? fog : null,
					sun: sun.value ? sun : null,
					shade: shade.value ? shade : null,
				},
			]);
			setLoading(false);
			setError(error ? error.toString() : null); // necessaire pr postgress
			router.replace("/(protected)/(tabs)/listPlants");

			console.log("plant sent");
		}
	}

	return (
		<View style={styles.overlay} pointerEvents="box-none">
			<TouchableOpacity onPress={sendData}>
				<View style={styles.btn}>
					{Loading ? <ActivityIndicator /> : <Text>AddPlantButton</Text>}
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default AddPlantButton;

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		bottom: 20,
		left: "5%",
		right: "5%",
		alignItems: "center",
	},
	btn: {
		padding: 10,
		borderRadius: 15,
		height: 70,
		width: 350,
		backgroundColor: "#285d42ff",
		justifyContent: "center",
		alignItems: "center",
	},
});
