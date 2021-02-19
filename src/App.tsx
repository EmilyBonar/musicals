import React from "react";

function App() {
	return (
		<div className="grid w-screen h-screen bg-blue-100 place-items-center">
			<div className="flex flex-wrap justify-center w-3/4 gap-4 h-3/4">
				<MusicalCard
					title="Hamilton"
					image="https://austin.broadway.com/wp-content/uploads/2018/08/001_Show_Keyart_HAM-671x1065.jpg"
					tracklist={[]}
				/>
				<MusicalCard
					title="Hamilton"
					image="https://austin.broadway.com/wp-content/uploads/2018/08/001_Show_Keyart_HAM-671x1065.jpg"
					tracklist={[]}
				/>
				<MusicalCard
					title="Hamilton"
					image="https://austin.broadway.com/wp-content/uploads/2018/08/001_Show_Keyart_HAM-671x1065.jpg"
					tracklist={[]}
				/>
			</div>
		</div>
	);
}

function MusicalCard(props: {
	title: string;
	image: string;
	tracklist: string[];
}) {
	return (
		<div className="w-40 h-64 overflow-hidden bg-gray-100 rounded shadow">
			<img
				className="object-cover object-center w-full h-3/4"
				src={props.image}
			/>
			<div className="p-2">
				<h1 className="text-lg font-semibold">{props.title}</h1>
			</div>
		</div>
	);
}

export default App;
