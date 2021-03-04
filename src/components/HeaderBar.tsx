export default function HeaderBar(props: {
	onSortChange: Function;
	onSearch: Function;
}) {
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
