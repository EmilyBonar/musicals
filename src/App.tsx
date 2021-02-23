import React, { useEffect, useState } from "react";
import { musicals, Musical } from "./musicals";

function App() {
	const musicalData = useFetchMusicals(musicals);
	console.log(musicalData);
	return (
		<div
			className="grid p-24 place-items-center"
			style={{
				backgroundImage:
					"url(https://unsplash.com/photos/m3th3rIQ9-w/download?force=true&w=1920)",
			}}
		>
			<div className="flex flex-wrap justify-center gap-4">
				{musicalData.map((musical) => {
					let tracklist = musical.data.tracks.items.map((track) => track.name);
					return (
						<MusicalCard
							title={musical.info.title}
							image={musical.data.images[0].url}
							tracklist={tracklist}
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
	console.log(musicalData);
	return musicalData;
}

function MusicalCard(props: {
	title: string;
	image: string;
	tracklist: string[];
}) {
	const [flipped, setFlipped] = useState(false);
	return (
		<div className="flex flex-col overflow-hidden bg-gray-100 rounded shadow w-80 h-80">
			<div className="w-full h-0">
				<img
					className="object-cover object-center w-full"
					src={props.image}
					onClick={() => setFlipped(!flipped)}
				/>
			</div>
			{flipped && (
				<div
					className="h-full p-2 overflow-x-hidden overflow-y-auto bg-white bg-opacity-80"
					onClick={() => setFlipped(!flipped)}
				>
					<h1 className="text-2xl font-semibold text-center">{props.title}</h1>
					<ol className="list-decimal list-inside">
						{props.tracklist.map((track) => (
							<li>{track}</li>
						))}
					</ol>
				</div>
			)}
		</div>
	);
}

export default App;
