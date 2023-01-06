import React from "react";
import { useState } from "react";

import { AiFillWarning, AiOutlinePicture } from "react-icons/ai"
import { BsTypeBold, BsTypeItalic } from "react-icons/bs"
import { GrBlockQuote } from "react-icons/gr"
import { MdFormatListBulleted, MdEmojiEmotions } from "react-icons/md"
import { FiAlertCircle } from "react-icons/fi"

export default function PostInput() {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocusIn = () => {
        setIsFocused(true);
        console.log("focus in")
        
    };

    const handleBlur = () => {
        setIsFocused(false);
        console.log("blur")
    };

    return (
        <div className="content-wrapper">
            <div className="content-container">
                <textarea onBlur={handleBlur} placeholder="Napisz nowy post..." onFocus={handleFocusIn} class="form-control content-input" id="exampleFormControlTextarea1" rows={isFocused ? "6" : "1"}></textarea>
                
                {isFocused && 
                    <div className="widget-box">
                        <button type="button" className="btn btn-outline-primary input-action-button"><BsTypeBold/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><BsTypeItalic/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><GrBlockQuote/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><FiAlertCircle/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><MdFormatListBulleted/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><MdEmojiEmotions/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><AiOutlinePicture/></button>
                        <span style={{flex: 1}}></span>
                        <button type="button" className="btn btn-outline-danger action-button">Anuluj <AiFillWarning/></button>
                        <button type="button" className="btn btn-outline-success action-button">Wyślij <AiFillWarning/></button>
                    </div>}
            </div>
        </div>
    );
}