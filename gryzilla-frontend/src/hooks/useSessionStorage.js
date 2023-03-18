import { useState, useEffect } from "react";

export const useSessionStorage = (name, defaultValue) => {
	const [value, setValue] = useState(() => {
		const savedSortType = sessionStorage.getItem(name);
		return savedSortType || defaultValue;
	});

	useEffect(() => {
		if (value == null) sessionStorage.removeItem(name);
		else sessionStorage.setItem(name, value);
	}, [value]);

	return [value, setValue];
};

export default useSessionStorage;
