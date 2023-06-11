import React, { useEffect } from "react";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import { forwardRef, useImperativeHandle } from "react";
import "../../assets/Tag.css";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tag = forwardRef((props, _ref) => {
	const initialContent = props.initialContent;

	const [suggestions, setSuggestions] = useState([]);

	const auth = useAuth();

	const [parentTags, setParentTags] = useState(() => {
		if (initialContent == undefined) return [];
		return initialContent.map((tag) => {
			return { id: tag, text: tag };
		});
	});

	// useEffect(()=> {
	// 	console.log(parentTags);
	// },[parentTags])

	useImperativeHandle(_ref, () => ({
		getPostTags: () => {
			if(parentTags.length == 0) return [];
			const tags = parentTags.map((tag) => {
				return tag.text;
			});
			return tags;
		},
	}));

	const handleDelete = (i) => {
		setParentTags(parentTags.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setParentTags([...parentTags, tag]);
	};

	// const [data, error, loading, runRequest, isSuccess] = useAxios({
	// 	method: "GET",
	// 	url: `/tags/${auth.id}`,
	// 	headers: { accept: "*/*" },
	// 	executeOnRender: false,
	// });

	const handleInputChange = async (tag) => {
		//console.log(tag);
		setSuggestions([]);

		const params = {
			method: "GET",
			url: `/tags/${tag}`,
			headers: { accept: "*/*", ...auth.getJwtToken() },
		}

		try {
			const response = await axios.request(params);
			//const response = await axios.get(`/tags/${tag}`, {headers: { accept: "*/*" }});
			const result = response.data.map((tag) => {
				return {
					id: tag.id.toString(),
					text: tag.name,
				};
			});
			setSuggestions(result);
			//setError(null);
		} catch (err) {
			//setError(err.message);
			//setData(null);
		} finally {
			//setLoading(false);
		}
	};

	const handleDrag = (tag, currPos, newPos) => {
		const newTags = parentTags.slice();
		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);
		setParentTags(newTags);
	};

	return (
		<div>
			<ReactTags
				inputFieldPosition="inline"
				placeholder="Wprowadź tag..."
				tags={parentTags}
				suggestions={suggestions}
				delimiters={delimiters}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				handleDrag={handleDrag}
				// handleTagClick={handleTagClick}
				handleInputChange={handleInputChange}
				autocomplete
				minQueryLength={2}
				allowUnique
			/>
		</div>
	);
});

export default Tag;
