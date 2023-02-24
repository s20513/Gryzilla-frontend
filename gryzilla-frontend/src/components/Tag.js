import React, { useEffect } from "react";
import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from "axios";

import "../assets/Tag.css"

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tag (props) {
    const parentTags = props.tagsState;
    const setParentTags = props.onTagStateChange;

    //const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const handleDelete = i => {
        setParentTags(parentTags.filter((tag, index) => index !== i));
      };

      const handleAddition = tag => {
        setParentTags([...parentTags, tag]);
      };

      const handleInputChange = async tag => {
        //console.log(tag);
        setSuggestions([]);
        try {
            const response = await axios.get(`/tags/${tag}`);
            const result = response.data.map( tag => {
                return {
                    id: tag.id.toString(),
                    text: tag.name
                }
            })
            setSuggestions(result);
            //setError(null);
        } catch(err) {
            //setError(err.message);
            //setData(null);
        } finally {
            //setLoading(false);
        }
      }

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
}

