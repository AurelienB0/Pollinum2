import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const { colors } = useTheme();
	const { buildHref } = useLinkBuilder();
	const [HomeFocused, setHomeFocused] = useState(true);

	return (
		<View style={styles.view}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;
				const isFocused = state.index === index;
				let renderLabel: React.ReactNode;
				if (typeof label === "function") {
					renderLabel = label({
						focused: isFocused,
						color: isFocused ? colors.primary : colors.text,
						position: "below-icon",
						children: route.name,
					});
				} else {
					renderLabel = label;
				}

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};
				switch (renderLabel) {
					case "Exterior":
						return;
					case "Interior":
						return (
							<View style={[styles.layout, { flex: 2 }]} key={route.key}>
								<View style={styles.InteJardin} key={route.key}>
									<PlatformPressable
										href={buildHref(route.name, route.params)}
										accessibilityState={isFocused ? { selected: true } : {}}
										accessibilityLabel={options.tabBarAccessibilityLabel}
										testID={options.tabBarButtonTestID}
										onPress={() => {
											setHomeFocused(true);
											onPress();
										}}
										onLongPress={onLongPress}
									>
										<View
											style={
												HomeFocused
													? [
															styles.unfocused,
															{ backgroundColor: "#fff", borderRadius: 25 },
													  ]
													: styles.unfocused
											}
										>
											<Ionicons name="home-outline" size={35} />
										</View>
									</PlatformPressable>
									<PlatformPressable
										href={buildHref(route.name, route.params)}
										accessibilityState={isFocused ? { selected: true } : {}}
										accessibilityLabel={options.tabBarAccessibilityLabel}
										testID={options.tabBarButtonTestID}
										onPress={() => {
											setHomeFocused(false);
											onPress();
										}}
										onLongPress={onLongPress}
									>
										<View
											style={
												!HomeFocused
													? [
															styles.unfocused,
															{ backgroundColor: "#fff", borderRadius: 25 },
													  ]
													: styles.unfocused
											}
										>
											<Ionicons name="leaf-outline" size={35} />
										</View>
									</PlatformPressable>
								</View>
							</View>
						);

					case "Add":
						return (
							<PlatformPressable
								key={route.name}
								href={buildHref(route.name, route.params)}
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarButtonTestID}
								onPress={onPress}
								style={styles.layout}
							>
								<View style={[styles.btn, { backgroundColor: "#E6C5C5" }]}>
									<Ionicons name="add" size={35} color={"#4D1332"} />
								</View>
							</PlatformPressable>
						);
					case "Myplants":
						return (
							<PlatformPressable
								key={route.name}
								href={buildHref(route.name, route.params)}
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarButtonTestID}
								onPress={onPress}
								style={styles.layout}
							>
								<View style={styles.btn}>
									<Ionicons name="list-outline" size={35} color={"#444600"} />
								</View>
							</PlatformPressable>
						);
					case "settings":
						return (
							<PlatformPressable
								key={route.name}
								href={buildHref(route.name, route.params)}
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarButtonTestID}
								onPress={onPress}
								onLongPress={onLongPress}
								style={styles.layout}
							>
								<View style={styles.btn}>
									<Ionicons
										name="settings-outline"
										size={35}
										color={"#444600"}
									/>
								</View>
							</PlatformPressable>
						);
					default:
						return (
							<PlatformPressable
								key={route.name}
								href={buildHref(route.name, route.params)}
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarButtonTestID}
								onPress={onPress}
								onLongPress={onLongPress}
								style={styles.layout}
							>
								<View style={styles.btn}>
									<Ionicons name="cube" size={35} color={"#444600"} />
								</View>
							</PlatformPressable>
						);
				}
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flexDirection: "row",
		height: 100,
		backgroundColor: "#4d5813",
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	InteJardin: {
		backgroundColor: "#F7E6AA",
		height: 58,
		width: 117,
		borderRadius: 29,
		elevation: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	unfocused: {
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	layout: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		height: 58,
		width: 58,
		borderRadius: 29,
		backgroundColor: "#C8C97F",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		elevation: 5,
	},
});
