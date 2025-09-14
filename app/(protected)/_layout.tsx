"use client";

import PlantProvider from "@/providers/PlantProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { useAuth } from "@clerk/clerk-expo"; // <-- use the Expo version
import { Stack } from "expo-router";
import React from "react";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return <SupabaseProvider>{children}</SupabaseProvider>;
}

export default function AppLayout() {
	const { isLoaded, userId } = useAuth();

	// Show loading until Clerk is ready
	// if (!isLoaded) {
	// 	return (
	// 		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
	// 			<Text>Loading...</Text>
	// 		</View>
	// 	);
	// }

	return (
		<ProtectedLayout>
			<PlantProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</PlantProvider>
		</ProtectedLayout>
	);
}
