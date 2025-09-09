import {
	ActivityIndicator,
	Image,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { allImages } from "@/assets/images/plantsImports";
import { View, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Reminder, { ReminderDetail } from "@/components/reminder";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSupabase } from "@/providers/SupabaseProvider";

const plantModal = ({ item }: { item: any }) => {
	// ================================================================================
	type ReminderData = {
		value: string | null;
		unit: string;
		timer: string;
		last_care: Date | null;
		schedule: string;
		hasUnit: boolean;
	};
	const [moreInfo, setMoreInfo] = useState(item.moreInfo);
	const [name, setName] = useState(item.name);
	const [error, setError] = useState<string | null>(null);

	const [showPicker, setShowPicker] = useState("");
	const [Loading, setLoading] = useState(false);
	const { supabase } = useSupabase();

	const [reminders, setReminders] = useState<Record<string, ReminderData>>({
		water: item.water
			? JSON.parse(item.water)
			: {
					value: null,
					unit: "mL",
					timer: "1",
					schedule: "Morning 8:00",
					hasUnit: true,
					last_care: null,
			  },
		fog: item.fog
			? JSON.parse(item.fog)
			: {
					value: null,
					unit: "mL",
					timer: "1",
					schedule: "Morning 8:00",
					hasUnit: true,
					last_care: null,
			  },
		sun: item.sun
			? JSON.parse(item.sun)
			: {
					value: null,
					unit: "",
					timer: "1",
					schedule: "Morning 8:00",
					hasUnit: false,
					last_care: null,
			  },
		shade: item.shade
			? JSON.parse(item.shade)
			: {
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

	const sendChanges = async () => {
		// checks
		if (
			reminders.water.value !== null &&
			(reminders.water.value === "" || parseInt(reminders.water.value) < 1)
		) {
			setError("Enter valid water quantity");
			return;
		}
		if (
			reminders.fog.value !== null &&
			(reminders.fog.value === "" || parseInt(reminders.fog.value) < 1)
		) {
			setError("Enter valid fog quantity");
			return;
		}
		if (
			reminders.sun.value !== null &&
			(reminders.sun.value === "" || parseInt(reminders.sun.value) < 1)
		) {
			setError("Enter valid sun duration");
			return;
		}
		if (
			reminders.shade.value !== null &&
			(reminders.shade.value === "" || parseInt(reminders.shade.value) < 1)
		) {
			setError("Enter valid shade duration");
			return;
		}

		if (reminders.water.timer === "" || parseInt(reminders.water.timer) < 1) {
			setError("Enter valid water remind time");
			return;
		}
		if (reminders.fog.timer === "" || parseInt(reminders.fog.timer) < 1) {
			setError("Enter valid fog remind time");
			return;
		}
		if (reminders.sun.timer === "" || parseInt(reminders.sun.timer) < 1) {
			setError("Enter valid sun remind time");
			return;
		}
		if (reminders.shade.timer === "" || parseInt(reminders.shade.timer) < 1) {
			setError("Enter valid shade remind time");
			return;
		}

		if (!supabase) {
			setError("Server error");
			return;
		}

		if (error === null) {
			setLoading(true);
			const { data, error } = await supabase
				.from("plants")
				.update([
					{
						user_id: item.user_id,
						moreInfo: moreInfo,
						species: item.species,
						name: name,
						water: reminders.water.value ? reminders.water : null,
						fog: reminders.fog.value ? reminders.fog : null,
						sun: reminders.sun.value ? reminders.sun : null,
						shade: reminders.shade.value ? reminders.shade : null,
					},
				])
				.eq("id", item.id);
			setLoading(false);
			setShowModal(false);
		}
	};
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<Modal animationType="slide" transparent={true} visible={showModal}>
				<View style={styles.modalBg}>
					<View style={styles.modal}>
						<Text>Make changes</Text>
						<View style={styles.header}>
							<Pressable
								style={styles.back}
								onPress={() => setShowModal(false)}
							>
								<Ionicons name="arrow-back" size={50} />
							</Pressable>
							<Text style={{ alignSelf: "center" }}> Modify</Text>
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
												onChange={(item) =>
													updateReminder(key, "unit", item.value)
												}
											/>
										)}
										<Pressable
											onPress={() => setShowPicker(key)}
											style={{ height: 100, width: 100 }}
										>
											<Text>
												Last:{" "}
												{r.last_care
													? new Date(r.last_care).toDateString()
													: "not watered yet !"}
											</Text>
										</Pressable>

										{showPicker === key && (
											<DateTimePicker
												value={item.last_care ?? new Date()}
												onChange={({ type }, selectedDate) => {
													if (selectedDate && type == "set")
														updateReminder(key, "last_care", selectedDate);
													setShowPicker("");
												}}
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
						</ScrollView>
						<Pressable style={styles.changesBtn} onPress={sendChanges}>
							{Loading ? <ActivityIndicator /> : <Text>Save changes</Text>}
						</Pressable>
					</View>
				</View>
			</Modal>

			<TouchableOpacity
				activeOpacity={0.5}
				style={styles.card}
				onPress={() => {
					setShowModal(true);
				}}
			>
				<Image
					style={styles.img}
					source={allImages[item.species] ?? allImages["marguerite"]}
				/>
				<View style={styles.textBox}>
					<Text style={styles.cardText}>
						Plant : {item.species}
						{item.name && `\nName : ${item.name}`}
						{Object.entries(reminders).map(([key, r]) => {
							return (
								r.value !== null && (
									<Text key={key}>
										{"\n"}Last {key} :
										{r.last_care
											? new Date(r.last_care).toDateString()
											: "no date yet"}
									</Text>
								)
							);
						})}
					</Text>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default plantModal;

const styles = StyleSheet.create({
	card: {
		borderWidth: 2,
		borderRadius: 5,
		margin: 15,
		padding: 10,
		flexDirection: "row",
	},
	modalBg: {
		backgroundColor: "#79797988",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modal: {
		backgroundColor: "#9faf84ff",
		height: "90%",
		width: "90%",
		borderRadius: 12,
		alignItems: "center",
	},
	cardText: {},
	img: {
		height: 100,
		width: 100,
	},
	textBox: { flex: 1, backgroundColor: "#9cd0bcff" },
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
		margin: 0,
		height: 50,
		width: 60,
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
	changesBtn: {
		width: 370,
		backgroundColor: "#385842ff",
		alignSelf: "flex-end",
	},
});
