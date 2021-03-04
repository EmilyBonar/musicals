export default function FooterBar() {
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
