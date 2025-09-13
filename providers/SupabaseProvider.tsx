"use client";

import { useSession } from "@clerk/clerk-expo";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type SupabaseContext = {
	supabase: SupabaseClient | null;
	isLoaded: boolean;
};

const Context = createContext<SupabaseContext>({
	supabase: null,
	isLoaded: false,
});

type Props = {
	children: React.ReactNode;
};

export default function SupabaseProvider({ children }: Props) {
	const { session } = useSession();
	const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const initSupa = async () => {
			if (!session) return;

			const token = await session.getToken();
			const client = createClient(
				process.env.EXPO_PUBLIC_SUPABASE_URL!,
				process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
				{ accessToken: () => session?.getToken() }
			);

			setSupabase(client);
			setIsLoaded(true);
		};
		initSupa();
	}, [session]);

	return (
		<Context.Provider value={{ supabase, isLoaded }}>
			{/* {!isLoaded ? (
				<View style={{ flex: 1, margin: 20 }}>
					<Text>Loading....</Text>
				</View>
			) : (
				children
			)} */}
			{children}
		</Context.Provider>
	);
}

export const useSupabase = () => {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error("useSupabase must be used within a SupabaseProvider");
	}
	return {
		supabase: context.supabase,
		isLoaded: context.isLoaded,
	};
};
