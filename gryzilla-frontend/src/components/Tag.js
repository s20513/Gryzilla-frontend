import React from "react";
import { useState } from 'react';

import { render } from "react-dom";
//import { COUNTRIES } from './countries';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from "axios";

import "../Styles/Tag.css"

// const suggestions = COUNTRIES.map( country => {
//     return {
//         id: country,
//         text: country
//     };
// });
//const suggestions = [{id: "poland", text: "poland"}, {id: "niemcy", text: "niemcy"}];

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tag () {
    // const [tags, setTags] = React.useState([
    //     { id: 'Thailand', text: 'Thailand' },
    //     { id: 'India', text: 'India' },
    //     { id: 'Vietnam', text: 'Vietnam' },
    //     { id: 'Turkey', text: 'Turkey' }
    //   ]);
    const [tags, setTags] = useState([]);

    const [suggestions, setSuggestions] = useState([]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
      };


      const handleAddition = tag => {
        setTags([...tags, tag]);
      };

      const handleInputChange = async tag => {
        console.log(tag);
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
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
      };

      const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
      };


      return (
          <div>
            <ReactTags
               inputFieldPosition="inline"
              tags={tags}
              suggestions={suggestions}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              handleInputChange={handleInputChange}
              autocomplete
              minQueryLength={1}
              
            />
          </div>
      );
}

