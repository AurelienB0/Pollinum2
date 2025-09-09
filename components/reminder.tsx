import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import React, { ReactNode } from "react";
import { Dropdown } from "react-native-element-dropdown";

const ActionSchedule = [
	{
		value: "Morning 8:00",
		lable: "Morning 8:00",
	},
	{
		value: "Evening 18:00",
		lable: "Evening 18:00",
	},
];

type Props = {
	reminder: string | null;
	setReminder: React.Dispatch<React.SetStateAction<string | null>>;
	children?: ReactNode;
};

const Reminder = ({ reminder, setReminder, children }: Props) => {
	return (
		<Pressable
			style={[
				styles.reminder,
				reminder === null
					? { backgroundColor: "#bbbdbdff" }
					: { backgroundColor: "#b1faffff" },
			]}
			onPress={() => {
				reminder === null ? setReminder("") : setReminder(null);
			}}
		>
			{children}
		</Pressable>
	);
};

type Props2 = {
	name: string;
	modeIsTime: boolean;
	state: string | null;
	setState: React.Dispatch<React.SetStateAction<string | null>>;
	children?: ReactNode;
	remindTime: string;
	setReminderTime: React.Dispatch<React.SetStateAction<string>>;
	schedule: string;
	setSchedule: React.Dispatch<React.SetStateAction<string>>;
};

export const ReminderDetail = ({
	name,
	modeIsTime,
	state,
	setState,
	remindTime,
	setReminderTime,
	schedule,
	setSchedule,
	children,
}: Props2) => {
	return (
		<View style={{ borderRadius: 10, borderWidth: 1, padding: 5, margin: 0 }}>
			<Text>{name}</Text>
			{modeIsTime && (
				<View style={styles.reminderBox}>
					<Text>quantity : </Text>
					<TextInput
						placeholder="Enter Value"
						inputMode="numeric"
						value={state ?? ""}
						onChangeText={setState}
					/>
					<Text>Unit: : </Text>
					{children}
				</View>
			)}
			{!modeIsTime && (
				<View style={styles.reminderBox}>
					<Text>Duration : </Text>
					<TextInput
						placeholder="Enter Value"
						inputMode="numeric"
						value={state ?? ""}
						onChangeText={setState}
					/>
					<Text>Hours</Text>
					{children}
				</View>
			)}
			<View style={styles.reminderBox}>
				<Text>Remind me every : </Text>
				<TextInput
					placeholder="Enter Value"
					inputMode="numeric"
					value={remindTime ?? ""}
					onChangeText={setReminderTime}
				/>
				<Text>days, at : </Text>
				<Dropdown
					style={styles.dropdown}
					value={schedule}
					data={ActionSchedule}
					valueField="value"
					labelField="lable"
					placeholder="Select schedule"
					searchPlaceholder="Search..."
					onChange={(e) => {
						setSchedule(e.value);
					}}
				/>
			</View>
		</View>
	);
};

export default Reminder;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	header: {
		alignItems: "center",
		flexDirection: "row",
	},
	back: {
		alignSelf: "flex-end",
		justifyContent: "flex-end",
	},
	reminderBox: {
		flexDirection: "row",
		height: 50,
		width: "99%",
		alignSelf: "center",
		alignItems: "center",
	},
	reminder: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	dropdown: {
		margin: 0,
		height: 30,
		width: 120,
		backgroundColor: "#EEEEEE",
		borderRadius: 22,
		paddingHorizontal: 8,
	},
});
