"use client";
import { allImages } from "@/assets/images/plantsImports";
import Spacer from "@/components/Spacer";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { Dropdown } from "react-native-element-dropdown";

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

	const [moreInfo, setMoreInfo] = useState("");
	const [name, setName] = useState(plante);
	const [error, setError] = useState<string | null>(null);

	const inputRef = useRef<TextInput>(null);
	const remTime = [
		{ value: "Day", label: "Day" },
		{ value: "Week", label: "Week" },
		{ value: "Month", label: "Month" },
		{ value: "Year", label: "Year" },
	];
	const Days = [
		{ value: "Monday", label: "Monday" },
		{ value: "Tuesday", label: "Tuesday" },
		{ value: "Wednesday", label: "Wednesday" },
		{ value: "Thursday", label: "Thursday" },
		{ value: "Friday", label: "Friday" },
		{ value: "Saturday", label: "Saturday" },
		{ value: "Sunday", label: "Sunday" },
	];
	const Schedueles = [{ value: "18h", label: "18h" }];
	const inputList = [
		{ remName: "Picking", color: "#FF98DB" },
		{ remName: "Friends", color: "#BCE287" },
		{ remName: "Weeding", color: "#C7C16C" },
		{ remName: "Repot", color: "#FF7E8B" },
		{ remName: "Soil", color: "#FF906B" },
		{ remName: "Haze", color: "#92EBE0" },
		{ remName: "Prune", color: "#ECB874" },
		{ remName: "Shadow", color: "#99A0F5" },
	];

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

	const [reminderFocused, setReminderFocused] = useState(false);
	return (
		<>
			{!reminderFocused && (
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
										allImages[plante]
											? allImages[plante]
											: allImages["marguerite"]
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
									<Text style={styles.paragraphe}>
										Your Pilea peperomioides needs to be exposed to the sun and
										get water every two days. Otherwise she’s good in a plant
										pot with a bit of shadow in a slightly fermented soil.
									</Text>
									<Spacer space={20} />
									<Text style={styles.subtitle}>Reminders</Text>
									<Spacer space={20} />
									<View style={styles.reminders}>
										<Text style={styles.remtxt}>
											No reminders set for this plant yet.
										</Text>
										<Pressable onPress={() => setReminderFocused(true)}>
											<Text style={styles.remlink}>Set reminders</Text>
										</Pressable>
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
						<Pressable
							onPress={() => setReminderFocused(true)}
							style={[styles.btn, { backgroundColor: "#C8C97F" }]}
						>
							<Text style={styles.txtBar}>Set reminders</Text>
						</Pressable>
						<Pressable style={[styles.btn, { backgroundColor: "#fff" }]}>
							<Text style={styles.txtBar}>Add</Text>
						</Pressable>
					</View>
				</>
			)}

			{/* Reminders Modal */}

			{reminderFocused && (
				<>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={{ flex: 1 }}
						keyboardVerticalOffset={30}
					>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
								<View style={styles.container}>
									<View style={styles.viewtitle}>
										<Text style={styles.titleModal}>Reminders</Text>
									</View>

									<Spacer space={30} />
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Text style={styles.subtitle}>Active care reminders</Text>
										<View style={{ width: 15 }} />
										<Text style={[styles.subtitleItalic, { fontSize: 14 }]}>
											set for your plant
										</Text>
									</View>
									<Spacer space={20} />
									<View style={styles.remindersModal}>
										<View style={styles.cardRow}>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
												}}
											>
												<View style={styles.round}>
													<Ionicons
														name="water-outline"
														color={"#063244ff"}
														size={22}
													/>
												</View>
												<Text style={styles.remName}>Water</Text>
											</View>

											<Text style={styles.subtitleItalic}>
												next reminder in x days
											</Text>

											<View style={styles.trash}>
												<Ionicons
													name="trash-bin-outline"
													color={"#063244ff"}
													size={15}
												/>
											</View>
										</View>

										<Spacer space={15} />

										<View style={styles.cardRow}>
											<View style={{ flexDirection: "row" }}>
												<Pressable
													style={styles.remEvery}
													onPress={() => {
														inputRef.current?.focus();
													}}
												>
													<Text style={styles.remEveryTxt}>Every X</Text>
												</Pressable>
												<Dropdown
													style={styles.dropdown1}
													value={remTime[1]}
													data={remTime}
													valueField="value"
													labelField="label"
													onChange={() => {}}
													itemTextStyle={styles.remEveryTxt}
													selectedTextStyle={styles.remEveryTxt}
													placeholderStyle={styles.remEveryTxt}
												/>
											</View>
											<Dropdown
												style={styles.otherDropdown}
												value={Days[0]}
												data={Days}
												valueField="value"
												labelField="label"
												onChange={() => {}}
												itemTextStyle={styles.remEveryTxt}
												selectedTextStyle={styles.remEveryTxt}
												placeholderStyle={styles.remEveryTxt}
											/>
											<Dropdown
												style={[styles.otherDropdown, { width: 70 }]}
												value={Schedueles[0]}
												data={Schedueles}
												valueField="value"
												labelField="label"
												onChange={() => {}}
												itemTextStyle={styles.remEveryTxt}
												selectedTextStyle={styles.remEveryTxt}
												placeholderStyle={styles.remEveryTxt}
											/>
										</View>
									</View>
									<Spacer space={10} />

									{/* Add care reminders */}
									<View style={styles.remindersModal}>
										<Text
											style={{
												fontFamily: "UrbanistMediumItalic",
												fontSize: 16,
												color: "#444600",
											}}
										>
											Add care reminders
										</Text>
										<Spacer space={20} />
										<View
											style={{
												flexDirection: "row",
												flexWrap: "wrap",
												width: "100%",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											{inputList.map((item, index) => (
												<View
													key={index}
													style={{
														padding: 10,
														height: 56,
														borderRadius: 28,
														backgroundColor: "#fff",
														flexDirection: "row",
														margin: 5,
														alignItems: "center",
													}}
												>
													<View
														style={{
															height: 36,
															width: 36,
															backgroundColor: item.color,
															borderRadius: 18,
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														<Ionicons name="bag-add-outline" size={20} />
													</View>
													<Text
														style={{
															paddingHorizontal: 10,
															fontFamily: "UrbanistMedium",
															color: "#444600",
															includeFontPadding: false,
															fontSize: 14,
														}}
													>
														{item.remName}
													</Text>

													<Ionicons name="add" size={15} />
												</View>
											))}
										</View>
									</View>
								</View>
							</ScrollView>
						</TouchableWithoutFeedback>
					</KeyboardAvoidingView>

					<View style={[styles.CancelTabBar, { justifyContent: "center" }]}>
						<Pressable
							onPress={() => setReminderFocused(false)}
							style={[
								styles.btn,
								{
									width: 200,
									marginHorizontal: 5,
									backgroundColor: "#fff",
									paddingHorizontal: 40,
								},
							]}
						>
							<Text style={styles.txtBar}>Save</Text>
						</Pressable>
					</View>
				</>
			)}
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
		includeFontPadding: false,
		fontFamily: "UrbanistSemiBold",
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
		fontFamily: "UrbanistSemiBold",
	},
	paragraphe: {
		fontSize: 14,
		padding: 10,
		paddingVertical: 25,
		color: "#444600",
		textAlign: "center",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: "#DAD7BE",
		fontFamily: "UrbanistItalic",
	},
	subtitle: {
		fontSize: 16,
		color: "#444600",
		fontFamily: "UrbanistSemiBold",
	},
	reminders: {
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#fff",
		backgroundColor: "#efeee7",
		flexDirection: "row",
	},
	remtxt: {
		fontSize: 12,
		color: "#4446008f",
		fontFamily: "UrbanistItalic",
	},
	remlink: {
		fontSize: 12,
		color: "#0084b88c",
		fontFamily: "UrbanistItalic",
		marginLeft: 10,
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
		fontFamily: "UrbanistRegular",
	},

	viewtitle: {
		paddingVertical: 30,
		borderBottomWidth: 1,
		borderColor: "#DAD7BE",
	},

	titleModal: {
		fontSize: 23,
		color: "#444600",
		textAlign: "center",
		fontFamily: "UrbanistSemiBold",
	},
	subtitleItalic: {
		fontSize: 12,
		fontFamily: "UrbanistItalic",
		color: "#4446008e",
	},
	remindersModal: {
		padding: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#fff",
		backgroundColor: "#efeee7",
	},
	cardRow: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
	},
	round: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#4FCDFF",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 15,
		//spacer hori
	},
	trash: {
		width: 30,
		height: 30,
		borderRadius: 5,
		backgroundColor: "#ffffffff",
		alignItems: "center",
		justifyContent: "center",
	},
	remName: {
		fontSize: 14,
		color: "#444600ff",
		fontFamily: "UrbanistMedium",
		includeFontPadding: false,
	},
	remEvery: {
		height: 36,
		paddingVertical: 10,
		paddingRight: 5,
		paddingLeft: 15,
		borderTopLeftRadius: 18,
		borderBottomLeftRadius: 18,
		backgroundColor: "#fff",
		alignItems: "center",
		borderRightWidth: 1,
		borderColor: "#DAD7BE",
	},
	remEveryTxt: {
		fontSize: 14,
		color: "#444600ff",
		includeFontPadding: false,
		fontFamily: "UrbanistMedium",
		fontStyle: "italic",
		textAlign: "center",
	},
	dropdown1: {
		height: 36,
		width: 65,
		paddingVertical: 10,
		paddingLeft: 5,
		borderTopRightRadius: 18,
		borderBottomRightRadius: 18,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	otherDropdown: {
		height: 36,
		width: 110,
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderRadius: 18,
		backgroundColor: "#fff",
		alignItems: "center",
	},
});
