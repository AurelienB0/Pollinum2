import InitialLayout from "@/components/initialLayout";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function RootLayoutNav() {
	const CLERK_PUBLISHABLE_KEY = process.env
		.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

	const [fontsLoaded] = useFonts({
		UrbanistMedium: require("../assets/fonts/Urbanist-Medium.ttf"),
		UrbanistRegular: require("../assets/fonts/Urbanist-Regular.ttf"),
		UrbanistItalic: require("../assets/fonts/Urbanist-Italic.ttf"),
		UrbanistSemiBold: require("../assets/fonts/Urbanist-SemiBold.ttf"),
		UrbanistMediumItalic: require("../assets/fonts/Urbanist-MediumItalic.ttf"),
	});

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}
		>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
					<InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkProvider>
	);
}
