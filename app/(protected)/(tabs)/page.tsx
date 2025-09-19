"use client";
import Spacer from "@/components/Spacer";
import { Ionicons } from "@expo/vector-icons";
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

export default function Home() {
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

	const [reminderFocused, setReminderFocused] = useState(true);
	return (
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
								<Text style={styles.title}>Reminders</Text>
							</View>

							<Spacer space={20} />
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Text style={styles.subtitle}>Active care reminders</Text>
								<View style={{ width: 15 }} />
								<Text style={[styles.subtitleItalic, { fontSize: 14 }]}>
									set for your plant
								</Text>
							</View>
							<Spacer space={20} />
							<View style={styles.reminders}>
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
							<View style={styles.reminders}>
								<Text
									style={{
										fontFamily: "UrbanistMedium",
										fontSize: 16,
										color: "#444600",
										fontStyle: "italic",
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
											<View
												style={{
													alignItems: "center",
													justifyContent: "center",
													marginRight: 3,
												}}
											>
												<Ionicons name="add" size={15} />
											</View>
										</View>
									))}
								</View>
							</View>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>

			<View style={styles.CancelTabBar}>
				<View style={[styles.btn, { backgroundColor: "#E6C5C5", width: 58 }]}>
					<Image
						source={require("../../../assets/images/icons/Calque_1.png")}
						style={{ height: 25, width: 15 }}
					/>
				</View>

				<View
					style={[
						styles.btn,
						{ backgroundColor: "#fff", paddingHorizontal: 40 },
					]}
				>
					<Text style={styles.txtBar}>Save</Text>
				</View>
			</View>

			<View />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ecebe0",
		paddingHorizontal: 20,
	},
	viewtitle: {
		paddingVertical: 30,
		borderBottomWidth: 1,
		borderColor: "#DAD7BE",
	},

	title: {
		fontSize: 23,
		color: "#444600",
		textAlign: "center",
		fontFamily: "UrbanistSemiBold",
	},
	CancelTabBar: {
		flexDirection: "row",
		height: 100,
		backgroundColor: "#4d5813",
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		height: 58,
		borderRadius: 29,
		elevation: 5,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 25,
		marginHorizontal: 5,
	},
	txtBar: {
		fontSize: 20,
		color: "#444600",
		fontFamily: "UrbanistSemiBold",
	},
	subtitle: {
		fontSize: 16,
		fontFamily: "UrbanistSemiBold",
		color: "#444600",
	},
	subtitleItalic: {
		fontSize: 12,
		fontFamily: "UrbanistItalic",
		color: "#4446008e",
	},
	reminders: {
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
