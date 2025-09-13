import { usePlants } from "@/providers/PlantProvider";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useSession } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";

export default function LoadPlantsData() {
	const { plants, setPlants } = usePlants();
	const { supabase } = useSupabase();
	const { session } = useSession();
	const [isLoaded, setLoading] = useState(false);
	const [error, setError] = useState<string | null>("");

	const loadPlants = useCallback(async () => {
		{
			/*
		if (!session || !supabase) {
			return; // Don't fetch if dependencies aren't ready
		}
		setLoading(true);
		setError(null);
		const { data, error: dbError } = await supabase.from("plants").select();
		A REMETTTRE APRES JUSTE PR DEV
		if (dbError) {
			console.error(dbError);
			setError("Failed to fetch plants.");
		} else if (data) {
			setPlants(data);
		}*/
		}
		setLoading(false);
	}, [session, supabase, setPlants]);

	useEffect(() => {
		loadPlants();
	}, [loadPlants]);
	return {
		plants, // The data
		isLoaded, // The loading state
		error, // The error state
		loadPlants, // The function to manually reload the data
	};
}
