import React from "react";

function App() {
	return (
		<div className="flex w-screen h-screen gap-4 bg-blue-100">
			<MusicalCard />
			<MusicalCard />
			<MusicalCard />
		</div>
	);
}

function MusicalCard() {
	return <div className="bg-gray-100">Hello</div>;
}

export default App;
