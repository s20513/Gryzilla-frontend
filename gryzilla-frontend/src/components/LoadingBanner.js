import { Profiler, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post from '../pages/posts/Post';
import axios from "axios";
import useFetchPhoto from "../hooks/useFetchPhoto";
import useAxios from "../hooks/useAxios";

export default function LoadingBanner(props) {

    const loading = props.loading;
    const error = props.error;
    const loadingText = props.children;

    return (
        <>
            {loading && 
                <div className="loading-block">
                    {loadingText}
                </div>}

            {error && 
                <div className="error-loading">
                    {error}
                </div>}
        </>
    );
}