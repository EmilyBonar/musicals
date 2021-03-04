import React, { useState } from "react";

interface TrackDetails {
	title: string;
	link: string;
	length: number;
}

export default function MusicalCard(props: {
	title: string;
	image: string;
	tracklist: TrackDetails[];
	composers: string[];
	premiered: Date;
}) {
	const [flipped, setFlipped] = useState(false);
	let tilt = ["hover:rotate-1", "hover:-rotate-1"][
		Math.floor(Math.random() * 2)
	];
	return (
		<div
			className={`flex flex-col overflow-hidden border-gray-800 rounded-lg shadow-lg cursor-pointer w-80 h-80 m-2 transform transition-transform ${
				flipped ? "hover:border-0 duration-75" : `hover:border-2 ${tilt}`
			}`}
		>
			<div className="h-0 " onClick={() => setFlipped(!flipped)}>
				<img
					className="object-cover object-center w-full h-80"
					src={props.image}
				/>
			</div>
			{flipped && (
				<CardOverlay
					onClick={() => setFlipped(!flipped)}
					title={props.title}
					premiered={props.premiered}
					tracklist={props.tracklist}
					composers={props.composers}
				/>
			)}
		</div>
	);
}

function CardOverlay(props: {
	onClick: Function;
	title: string;
	premiered: Date;
	tracklist: TrackDetails[];
	composers: string[];
}) {
	return (
		<div
			className="h-full p-2 overflow-x-hidden overflow-y-auto bg-white cursor-auto bg-opacity-90"
			onClick={() => props.onClick()}
		>
			<h1 className="text-2xl font-semibold text-center">
				{props.title} ({props.premiered.getFullYear()})
			</h1>
			<h2 className="text-lg text-center">{props.composers.join(", ")}</h2>
			<ol className="pl-6 list-decimal">
				{props.tracklist.map((track, index) => (
					<li key={index} className="">
						<TrackItem track={track} />
					</li>
				))}
			</ol>
		</div>
	);
}

function TrackItem(props: { track: TrackDetails }) {
	let timestamp =
		Math.floor(props.track.length / 1000 / 60) +
		":" +
		Math.floor((props.track.length / 1000) % 60)
			.toString()
			.padStart(2, "0");
	return (
		<div className="inline-flex flex-row justify-between w-full">
			<a className="cursor-pointer" href={props.track.link} target="_blank">
				{props.track.title}
			</a>
			<p className="text-right">{timestamp}</p>
		</div>
	);
}
