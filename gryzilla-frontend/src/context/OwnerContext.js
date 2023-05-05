import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import jwt_decode from "jwt-decode";

const NavbarContext = createContext(null);

export const NavbarProvider = ({ allow }) => {
	const [showInput, setShowInput] = useState(false);

	return (
		<NavbarContext.Provider value={{ showInput, setShowInput }}>
			{children}
		</NavbarContext.Provider>
	);
};

