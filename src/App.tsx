import React, { useEffect, useState } from "react";
import musicals from "./musicals";

function App() {
	const [musicalsList, setMusicalsList] = useState<JSX.Element[]>([]);
	useEffect(() => {
		setMusicalsList(
			musicals.map((musical) => {
				return (
					<MusicalCard
						title={musical.title}
						image="https://austin.broadway.com/wp-content/uploads/2018/08/001_Show_Keyart_HAM-671x1065.jpg"
						tracklist={["test"]}
					/>
				);
			}),
		);
	}, []);
	console.log(musicalsList);
	return (
		<div
			className="grid w-screen h-screen bg-center bg-cover place-items-center"
			style={{
				backgroundImage:
					"url(https://unsplash.com/photos/m3th3rIQ9-w/download?force=true&w=1920)",
			}}
		>
			<div className="flex flex-wrap justify-center w-3/4 gap-4 h-3/4">
				{musicalsList}
			</div>
		</div>
	);
}

function MusicalCard(props: {
	title: string;
	image: string;
	tracklist: string[];
}) {
	const [flipped, setFlipped] = useState(false);
	return (
		<div className="flex flex-col w-64 overflow-hidden bg-gray-100 rounded shadow h-96">
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
					<h1 className="text-xl font-semibold text-center">{props.title}</h1>
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
