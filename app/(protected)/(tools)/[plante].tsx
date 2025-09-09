"use client";
import { useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Reminder, { ReminderDetail } from "@/components/reminder";
import { Dropdown } from "react-native-element-dropdown";
import AddPlantButton from "@/components/addPlantButton";

type ReminderData = {
	value: string | null;
	unit: string;
	timer: string;
	schedule: string;
	hasUnit: boolean;
	last_care: null;
};

export default function Home() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const plante = Array.isArray(params.plante)
		? params.plante[0]
		: params.plante ?? "";

	const [moreInfo, setMoreInfo] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);

	const [reminders, setReminders] = useState<Record<string, ReminderData>>({
		water: {
			value: null,
			unit: "mL",
			timer: "1",
			schedule: "Morning 8:00",
			hasUnit: true,
			last_care: null,
		},
		fog: {
			value: null,
			unit: "mL",
			timer: "1",
			schedule: "Morning 8:00",
			hasUnit: true,
			last_care: null,
		},
		sun: {
			value: null,
			unit: "",
			timer: "1",
			schedule: "Morning 8:00",
			hasUnit: false,
			last_care: null,
		},
		shade: {
			value: null,
			unit: "",
			timer: "1",
			schedule: "Morning 8:00",
			hasUnit: false,
			last_care: null,
		},
	});

	const updateReminder = (
		key: string,
		field: keyof ReminderData,
		newValue: any
	) => {
		setReminders((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				[field]: newValue,
			},
		}));
	};

	const local_data = [
		{ value: "mL", label: "mL" },
		{ value: "L", label: "L" },
	];

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Pressable style={styles.back} onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={50} />
				</Pressable>
				<Text style={{ alignSelf: "center" }}>{plante}</Text>
			</View>

			{/* Name Input */}
			<Text>Name:</Text>
			<TextInput
				placeholder="facultative"
				clearButtonMode="always"
				value={name}
				onChangeText={setName}
			/>

			{/* Reminder Selection */}
			<Text>Select reminders:</Text>
			<View style={styles.reminderBox}>
				{Object.keys(reminders).map((key) => (
					<Reminder
						key={key}
						reminder={reminders[key].value}
						setReminder={(val) => updateReminder(key, "value", val)}
					>
						<Text>{key}</Text>
					</Reminder>
				))}
			</View>
			{/* Error */}
			<View style={!error && { height: 0 }}>
				<View style={{ height: 20, alignContent: "center" }}>
					<Text>{error}</Text>
				</View>
			</View>
			{/* Reminder Details */}
			<ScrollView>
				{Object.entries(reminders).map(([key, r]) =>
					r.value !== null ? (
						<ReminderDetail
							key={key}
							name={key}
							modeIsTime={!["sun", "shade"].includes(key)}
							state={r.value}
							setState={(val) => updateReminder(key, "value", val)}
							remindTime={r.timer}
							setReminderTime={(val) => updateReminder(key, "timer", val)}
							schedule={r.schedule}
							setSchedule={(val) => updateReminder(key, "schedule", val)}
						>
							{r.hasUnit && (
								<Dropdown
									style={styles.dropdown}
									value={r.unit}
									data={local_data}
									valueField="value"
									labelField="label"
									onChange={(item) => updateReminder(key, "unit", item.value)}
								/>
							)}
						</ReminderDetail>
					) : null
				)}

				{/* More Info Input */}
				<TextInput
					placeholder="Add extra infos"
					multiline
					numberOfLines={4}
					maxLength={160}
					onChangeText={setMoreInfo}
					value={moreInfo}
					style={styles.textInput}
				/>
				<View style={{ paddingBottom: 150 }} />
			</ScrollView>

			{/* Save Button */}
			<AddPlantButton
				species={plante}
				name={name}
				moreInfo={moreInfo}
				water={reminders.water}
				fog={reminders.fog}
				sun={reminders.sun}
				shade={reminders.shade}
				error={error}
				setError={setError}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: { alignItems: "center", flexDirection: "row" },
	back: { alignSelf: "flex-end", justifyContent: "flex-end" },
	reminderBox: {
		flexDirection: "row",
		height: 100,
		width: "90%",
		alignSelf: "center",
	},
	dropdown: {
		margin: 5,
		height: 50,
		width: 70,
		backgroundColor: "#EEEEEE",
		borderRadius: 22,
		paddingHorizontal: 8,
	},
	textInput: {
		padding: 10,
		borderWidth: 2,
		borderRadius: 15,
		height: 100,
		textAlignVertical: "top",
	},
});
