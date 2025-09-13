"use client";

import PlantProvider from "@/providers/PlantProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { useAuth } from "@clerk/clerk-expo"; // <-- use the Expo version
import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return <SupabaseProvider>{children}</SupabaseProvider>;
}

export default function AppLayout() {
	const { isLoaded, userId } = useAuth();

	// Show loading until Clerk is ready
	if (!isLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Loading...</Text>
			</View>
		);
	}

	// Redirect if not authenticated
	if (!userId) {
		return <Redirect href="/index" />;
	}

	return (
		<ProtectedLayout>
			<PlantProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</PlantProvider>
		</ProtectedLayout>
	);
}
