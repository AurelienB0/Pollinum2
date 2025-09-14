"use client";
import { allImages } from "@/assets/images/plantsImports";
import Spacer from "@/components/Spacer";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

type ReminderData = {
	value: string | null;
	unit: string;
	timer: string;
	schedule: string;
	hasUnit: boolean;
	last_care: null;
};

export default function P() {
	const router = useRouter();
	const params = useLocalSearchParams();

	const plante = Array.isArray(params.plante)
		? params.plante[0]
		: params.plante ?? "";
	const inputRef = useRef<TextInput>(null);

	const [moreInfo, setMoreInfo] = useState("");
	const [name, setName] = useState(plante);
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
		<>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
				keyboardVerticalOffset={30}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<Image
							style={styles.img}
							source={
								allImages[plante] ? allImages[plante] : allImages["marguerite"]
							}
						/>
						<View style={styles.container}>
							<View style={styles.header}>
								<TextInput
									ref={inputRef}
									style={styles.title}
									value={name}
									onChangeText={setName}
									selectTextOnFocus={true}
								/>

								<Pressable
									style={styles.change}
									onPress={() => {
										inputRef.current?.focus();
									}}
								>
									<Ionicons name="pencil-sharp" size={20} />
								</Pressable>
							</View>
							<Text style={styles.paragraphe}>Lore Ipsum</Text>
							<Spacer space={20} />
							<Text style={styles.subtitle}>Reminders</Text>
							<Spacer space={20} />
							<View style={styles.reminders}>
								<Text style={styles.remtxt}>
									No reminders set for this plant yet.
								</Text>
								<Link href="/page" style={styles.remlink}>
									Set reminders
								</Link>
							</View>
							<Spacer space={25} />
							{/* <Text style={styles.subtitle}>Custom</Text>
				<Spacer space={20} />
				<View
					style={[styles.reminders, { elevation: 3, shadowColor: "#E063E3" }]}
				></View> */}
							<Text style={styles.subtitle}>Additional info</Text>
							<Spacer space={20} />
							<View style={styles.reminders}>
								<TextInput
									placeholder="Add extra infos"
									multiline
									numberOfLines={4}
									maxLength={170}
									onChangeText={setMoreInfo}
									value={moreInfo}
									style={styles.textInput}
								/>
							</View>

							{/* 
			<Text>Name:</Text>
			<TextInput
				placeholder="facultative"
				clearButtonMode="always"
				value={name}
				onChangeText={setName}
			/>

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
			{/* Error 
			<View style={!error && { height: 0 }}>
				<View style={{ height: 20, alignContent: "center" }}>
					<Text>{error}</Text>
				</View>
			</View>
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

				{/* More Info Input 
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
			/> */}
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			<View style={styles.CancelTabBar}>
				<Pressable
					style={[styles.btn, { backgroundColor: "#E6C5C5", width: 58 }]}
					onPress={() => {
						router.back();
					}}
				>
					<Image
						source={require("../../../assets/images/icons/Calque_1.png")}
						style={{ height: 25, width: 15 }}
					/>
				</Pressable>
				<View style={[styles.btn, { backgroundColor: "#C8C97F" }]}>
					<Text style={styles.txtBar}>Set reminders</Text>
				</View>
				<View style={[styles.btn, { backgroundColor: "#fff" }]}>
					<Text style={styles.txtBar}>Add</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	img: {
		height: 250,
		width: "100%",
		resizeMode: "cover",
	},
	container: {
		flex: 1,
		backgroundColor: "#ecebe0",
		paddingHorizontal: 20,
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingVertical: 15,
	},
	title: {
		width: "90%",
		fontSize: 23,
		color: "#444600",
		fontWeight: "600",
		includeFontPadding: false,
		marginVertical: -10, //against default padding
	},
	change: {
		elevation: 12,
		shadowColor: "#E063E3",
		borderRadius: 20,
		width: 30,
		height: 30,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#fff",
		backgroundColor: "#efeee7",
	},
	CancelTabBar: {
		flexDirection: "row",
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: 100,
		backgroundColor: "#4d5813",
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	btn: {
		height: 58,
		borderRadius: 29,
		elevation: 5,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 25,
	},
	txtBar: {
		fontSize: 20,
		color: "#444600",
		fontWeight: "600",
	},
	paragraphe: {
		fontSize: 14,
		padding: 10,
		paddingVertical: 25,
		color: "#444600",
		textAlign: "center",
		fontStyle: "italic",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: "#DAD7BE",
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "700",
		color: "#444600",
	},
	reminders: {
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#fff",
		backgroundColor: "#efeee7",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	remtxt: {
		fontSize: 12,
		color: "#4446008f",
		fontStyle: "italic",
	},
	remlink: {
		fontSize: 12,
		color: "#0084b88c",
		fontStyle: "italic",
	},
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
		includeFontPadding: false,
		flex: 1,
		textAlignVertical: "top",
		fontSize: 14,
		paddingHorizontal: 15,
		color: "#444600ff",
	},
});
