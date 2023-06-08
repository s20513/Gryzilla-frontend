import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AvatarChangeContext = createContext(null);

export const AvatarChangeProvider = ({ children }) => {
	const [avatar, setAvatar] = useState(null);

	return (
		<AvatarChangeContext.Provider value={{ avatar, setAvatar }}>
			{children}
		</AvatarChangeContext.Provider>
	);
};

export const useVatarChange = () => {
	return useContext(AvatarChangeContext);
};
