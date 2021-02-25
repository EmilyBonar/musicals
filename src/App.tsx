import React, { useEffect, useState } from "react";
import { musicals, Musical } from "./musicals";

function App() {
	const musicalData = useFetchMusicals(musicals);
	const [sortType, setSortType] = useState<
		"descending" | "ascending" | "random"
	>("descending");
	const descendingSort = (a: AllMusicalData, b: AllMusicalData) =>
		b.info.premiered.getTime() - a.info.premiered.getTime();
	const ascendingSort = (a: AllMusicalData, b: AllMusicalData) =>
		a.info.premiered.getTime() - b.info.premiered.getTime();
	const randomSort = (a: AllMusicalData, b: AllMusicalData) =>
		0.5 - Math.random();

	return (
		<>
			<HeaderBar
				onChange={(value: "ascending" | "descending" | "random") => {
					setSortType(value);
				}}
			/>
			<div className="grid p-4 lg:p-24 place-items-center">
				<div className="flex flex-wrap justify-center gap-4">
					{[...musicalData]
						.sort(
							sortType === "ascending"
								? ascendingSort
								: sortType === "descending"
								? descendingSort
								: randomSort,
						)
						.map((musical) => {
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
		</>
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

function HeaderBar(props: { onChange: Function }) {
	return (
		<header className="flex justify-between w-full p-2 bg-black bg-opacity-80">
			<p className="text-3xl font-extrabold tracking-wide text-white">
				MusicalsFYI
			</p>
			<select
				name="sort"
				id=""
				onChange={(e) => props.onChange(e.target.value)}
			>
				<option value="descending" selected>
					Date, descending
				</option>
				<option value="ascending">Date, ascending</option>
				<option value="random">Random</option>
			</select>
		</header>
	);
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
	tracklist: { title: string; link: string; length: number }[];
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

function TrackItem(props: {
	track: { title: string; link: string; length: number };
}) {
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

export default App;
