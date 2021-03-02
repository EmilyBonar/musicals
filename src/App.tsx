import React, { useEffect, useState } from "react";
import { musicals, Musical } from "./musicals";

function App() {
	const musicalData = useFetchMusicals(musicals);
	const [sortType, setSortType] = useState<
		"descending" | "ascending" | "random"
	>("descending");
	const [searchText, setSearchText] = useState("");

	const descendingSort = (a: AllMusicalData, b: AllMusicalData) =>
		b.info.premiered.getTime() - a.info.premiered.getTime();
	const ascendingSort = (a: AllMusicalData, b: AllMusicalData) =>
		a.info.premiered.getTime() - b.info.premiered.getTime();
	const randomSort = (a: AllMusicalData, b: AllMusicalData) =>
		0.5 - Math.random();

	return (
		<>
			<HeaderBar
				onSortChange={(value: "ascending" | "descending" | "random") => {
					setSortType(value);
				}}
				onSearch={(value: string) => setSearchText(value)}
			/>
			<div className="grid min-h-screen p-4 lg:px-24 lg:py-12 place-items-center">
				<div className="flex flex-wrap justify-center">
					{[...musicalData]
						.filter(
							(musical) =>
								musical.info.title
									.toLowerCase()
									.includes(searchText.toLowerCase()) ||
								musical.info.composers.some((person) =>
									person.toLowerCase().includes(searchText.toLowerCase()),
								),
						)
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
			<FooterBar />
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
		fetchMusicalData(musicals);
	}, [musicals]);

	const fetchMusicalData = async (musicals: Musical[]) => {
		let ids = musicals.map((musical) => musical.spotifyID);
		const response = await fetch(`/.netlify/functions/getMusicals?id=${ids}`);
		const data: SpotifyApi.AlbumObjectFull[] = await response.json();
		console.log(data);

		setMusicalData(
			musicals.map((musicalInfo) => {
				return {
					info: musicalInfo,
					data: data.find((album) => album.id == musicalInfo.spotifyID),
				} as AllMusicalData;
			}),
		);
	};
	return musicalData;
}

function HeaderBar(props: { onSortChange: Function; onSearch: Function }) {
	return (
		<header className="flex justify-between w-full gap-2 p-2 bg-black bg-opacity-90">
			<p className="flex self-center text-xl font-extrabold tracking-wide text-white md:text-3xl">
				Musicals
				<span className="text-transparent bg-clip-text from-red-500 to-blue-500 bg-gradient-to-br">
					FYI
				</span>
			</p>
			<input
				className="w-1/2 max-w-3xl p-4 py-2 text-gray-100 bg-gray-900 rounded-full outline-none focus:ring-2 ring-gray-500"
				placeholder="Search"
				onChange={(e) => props.onSearch(e.target.value)}
			></input>
			<select
				name="sort"
				className="p-1 text-gray-100 bg-gray-900 rounded"
				onChange={(e) => props.onSortChange(e.target.value)}
			>
				<option value="descending" selected>
					Date ↓
				</option>
				<option value="ascending">Date ↑</option>
				<option value="random">Random</option>
			</select>
		</header>
	);
}

function FooterBar() {
	return (
		<footer className="flex justify-center w-full p-2 bg-black bg-opacity-90">
			<form name="suggestions" method="post">
				<input
					className="p-2 m-1 text-gray-200 bg-gray-900 rounded outline-none focus:ring-2 ring-gray-500"
					placeholder="Suggest a new musical"
					name="title"
					minLength={1}
					maxLength={100}
					required={true}
				></input>
				<input type="hidden" name="form-name" value="suggestions" />
				<button className="p-2 m-1 text-gray-200 bg-gray-900 rounded">
					Submit
				</button>
			</form>
		</footer>
	);
}

interface TrackDetails {
	title: string;
	link: string;
	length: number;
}

function MusicalCard(props: {
	title: string;
	image: string;
	tracklist: TrackDetails[];
	composers: string[];
	premiered: Date;
}) {
	const [flipped, setFlipped] = useState(false);
	return (
		<div
			className={`flex flex-col overflow-hidden border-gray-800 rounded shadow-lg cursor-pointer w-80 h-80 m-2 ${
				flipped ? "hover:border-0" : "hover:border-2"
			}`}
		>
			<div className="h-0 ">
				<img
					className="object-center w-80 h-80"
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

export default App;
