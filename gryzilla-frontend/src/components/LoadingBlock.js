import { Profiler, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post from "../pages/posts/Post";
import axios from "axios";
import useFetchPhoto from "../hooks/useFetchPhoto";
import useAxios from "../hooks/useAxios";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";

export default function LoadingBlock({ blocksNum, topSize, bottomLines, hrLine }) {
	const n = blocksNum;

	return [...Array(n)].map((element, index) => {
		return (
			<div key={index} className="content-container">
				<SkeletonTheme key={index} baseColor="#131927" highlightColor="#353a50">
					<Skeleton height={topSize} />
					{hrLine && <hr className="hr-line" />}
					<Skeleton count={bottomLines} />
				</SkeletonTheme>
			</div>
		);
	});
}
