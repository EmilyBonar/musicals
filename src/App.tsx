import React, { useEffect, useState } from "react";
import { musicals, Musical } from "./musicals";

function App() {
	const musicalData = useFetchMusicals(musicals);
	console.log(musicalData);
	return (
		<div className="grid p-4 lg:p-24 place-items-center">
			<div className="flex flex-wrap justify-center gap-4">
				{musicalData.map((musical) => {
					let tracklist = musical.data.tracks.items.map((track) => {
						return {
							title: track.name,
							link: track.external_urls.spotify,
							length: track.duration_ms,
						};
					});
					return (
						<MusicalCard
							title={musical.info.title}
							image={musical.data.images[0].url}
							tracklist={tracklist}
							composers={musical.info.composers}
							premiered={musical.info.premiered}
						/>
					);
				})}
			</div>
		</div>
	);
}

interface AllMusicalData {
	info: Musical;
	data: SpotifyApi.AlbumObjectFull;
}

function useFetchMusicals(musicals: Musical[]) {
	const [musicalData, setMusicalData] = useState<AllMusicalData[]>([]);

	useEffect(() => {
		setMusicalData([]);
		musicals.forEach((musical) => fetchMusicalData(musical));
	}, [musicals]);

	const fetchMusicalData = async (musical: Musical) => {
		const response = await fetch(
			`/.netlify/functions/getMusical?id=${musical.spotifyID}`,
		);
		const data = await response.json();
		setMusicalData((musicalData) => [
			...musicalData,
			{ info: musical, data: data },
		]);
	};
	return musicalData;
}

function MusicalCard(props: {
	title: string;
	image: string;
	tracklist: { title: string; link: string; length: number }[];
	composers: string[];
	premiered: Date;
}) {
	const [flipped, setFlipped] = useState(false);
	return (
		<div
			className={`flex flex-col overflow-hidden border-gray-800 rounded shadow-lg cursor-pointer w-80 h-80 ${
				flipped ? "hover:border-0" : "hover:border-2"
			}`}
		>
			<div className="w-full h-0">
				<img
					className="object-cover object-center w-full"
					src={props.image}
					onClick={() => setFlipped(!flipped)}
				/>
			</div>
			{flipped && (
				<div
					className="h-full p-2 overflow-x-hidden overflow-y-auto bg-white cursor-auto bg-opacity-90"
					onClick={() => setFlipped(!flipped)}
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
			)}
		</div>
	);
}

function TrackItem(props: {
	track: { title: string; link: string; length: number };
}) {
	return (
		<div className="inline-flex flex-row justify-between w-full">
			<a className="cursor-pointer" href={props.track.link} target="_blank">
				{props.track.title}
			</a>
			<p className="text-right">
				{Math.floor(props.track.length / 1000 / 60)}:
				{Math.floor((props.track.length / 1000) % 60)
					.toString()
					.padStart(2, "0")}
			</p>
		</div>
	);
}

export default App;
