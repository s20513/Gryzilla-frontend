import { useState, useEffect } from "react";

export const useLocalStorage = (name, defaultValue) => {
	const [value, setValue] = useState(() => {
		const savedSortType = localStorage.getItem(name);
		return savedSortType || defaultValue;
	});

	useEffect(() => {
		if (value == null) localStorage.removeItem(name);
		else localStorage.setItem(name, value);
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;
