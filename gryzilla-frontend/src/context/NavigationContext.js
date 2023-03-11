import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import jwt_decode from "jwt-decode";

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
	const [showInput, setShowInput] = useState(false);

	return (
		<NavigationContext.Provider value={{ showInput, setShowInput }}>
			{children}
		</NavigationContext.Provider>
	);
};

export const useNavigation = () => {
	return useContext(NavigationContext);
};
