import React, { useState } from "react";
import { AllMusicalData } from "../App";

export default function MusicalCard(props: { musical: AllMusicalData }) {
	const [flipped, setFlipped] = useState(false);
	let tilt = ["hover:rotate-1", "hover:-rotate-1"][
		Math.floor(Math.random() * 2)
	];
	return (
		<div
			className={`flex flex-col overflow-hidden border-gray-800 rounded-lg shadow-lg cursor-pointer w-80 h-80 m-2 transform transition-transform hover:scale-105 ${
				flipped ? "hover:border-0 duration-75" : `hover:border-2 ${tilt}`
			}`}
		>
			<div className="h-0 " onClick={() => setFlipped(!flipped)}>
				<img
					className="object-cover object-center w-full h-80"
					src={props.musical.data.images[0].url}
				/>
			</div>
			{flipped && (
				<CardOverlay
					onClick={() => setFlipped(!flipped)}
					musical={props.musical}
				/>
			)}
		</div>
	);
}

function CardOverlay(props: { onClick: Function; musical: AllMusicalData }) {
	return (
		<article
			className="h-full p-2 overflow-x-hidden overflow-y-auto bg-white cursor-auto bg-opacity-90"
			onClick={() => props.onClick()}
		>
			<h2 className="text-2xl font-semibold text-center">
				<a
					href={props.musical.data.external_urls.spotify}
					className="cursor-pointer"
				>
					{props.musical.info.title} (
					{props.musical.info.premiered.getFullYear()})
				</a>
			</h2>
			<h3 className="text-lg text-center">
				{props.musical.info.composers.join(", ")}
			</h3>
			<ol className="pl-6 list-decimal">
				{props.musical.data.tracks.items.map((track, index) => (
					<li key={index} className="">
						<TrackItem track={track} />
					</li>
				))}
			</ol>
		</article>
	);
}

function TrackItem(props: { track: SpotifyApi.TrackObjectSimplified }) {
	let timestamp =
		Math.floor(props.track.duration_ms / 1000 / 60) +
		":" +
		Math.floor((props.track.duration_ms / 1000) % 60)
			.toString()
			.padStart(2, "0");
	return (
		<div className="inline-flex flex-row justify-between w-full">
			<a
				className="cursor-pointer"
				href={props.track.external_urls.spotify}
				target="_blank"
			>
				{props.track.name}
			</a>
			<p className="text-right">{timestamp}</p>
		</div>
	);
}
