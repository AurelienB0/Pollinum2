import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AuthRoutesLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#6adf1cff",
				tabBarInactiveTintColor: "#a6b890ff",
				tabBarStyle: {
					backgroundColor: "#687554ff",
					elevation: 0,
					height: 70,
				},
			}}
		>
			<Tabs.Screen
				name="interiorPlants"
				options={{
					title: "Interior",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="listePlants"
				options={{
					title: "My plants",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="leaf" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="addPlante"
				options={{
					title: "Add",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="add" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="page"
				options={{
					title: "test",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="flask" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Profile",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="person" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
