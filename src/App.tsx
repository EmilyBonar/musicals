import React, { useEffect, useState } from "react";
import { musicals, Musical } from "./musicals";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import MusicalCard from "./components/MusicalCard";

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

export default App;
