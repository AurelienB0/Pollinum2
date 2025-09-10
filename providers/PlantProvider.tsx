import React, { createContext, useContext, useState } from "react";

type p = {
	plants: null | any;
	setPlants: any;
};
const Context = createContext<p>({
	plants: null,
	setPlants: null,
});

export default function PlantProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [plants, setPlants] = useState<any[]>([]);

	return (
		<Context.Provider value={{ plants, setPlants }}>
			{children}
		</Context.Provider>
	);
}

export const usePlants = () => {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error("usePlants must be used within a PlantProvider");
	}
	return {
		plants: context.plants,
		setPlants: context.setPlants,
	};
};
