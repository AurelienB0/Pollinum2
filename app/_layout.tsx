import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import InitialLayout from "@/components/initialLayout";
import SupabaseProvider from "@/providers/SupabaseProvider";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
export default function RootLayoutNav() {
	return (
		<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
					<InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkProvider>
	);
}
