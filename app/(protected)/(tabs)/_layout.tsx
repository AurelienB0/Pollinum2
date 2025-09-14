import { TabBar } from "@/components/tabBar";
import { Tabs } from "expo-router";
export default function AuthRoutesLayout() {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{ headerShown: false }}
		>
			<Tabs.Screen
				name="interiorPlants"
				options={{
					title: "Interior",
				}}
			/>
			<Tabs.Screen
				name="addPlante"
				options={{
					title: "Add",
				}}
			/>
			<Tabs.Screen
				name="listPlants"
				options={{
					title: "Myplants",
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: "settings",
				}}
			/>
			<Tabs.Screen
				name="page"
				options={{
					title: "page",
				}}
			/>
		</Tabs>
	);
}
