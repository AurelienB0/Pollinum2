"use client";

import { View, Text } from "react-native";
import React from "react";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { useAuth } from "@clerk/clerk-expo"; // <-- use the Expo version
import { Redirect, Stack } from "expo-router";

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
			<Stack screenOptions={{ headerShown: false }} />
		</ProtectedLayout>
	);
}
