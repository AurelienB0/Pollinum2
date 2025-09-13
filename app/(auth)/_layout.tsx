import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
	const { isLoaded, userId } = useAuth();

	if (!userId) {
		return <Redirect href="/signup" />;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
