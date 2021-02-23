var SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

exports.handler = async (event, context) => {
	let id = event.queryStringParameters.id;

	var spotifyApi = new SpotifyWebApi({
		clientId: process.env.ClientID,
		clientSecret: process.env.ClientSecret,
	});
	let data;
	try {
		let credentials = await spotifyApi.clientCredentialsGrant();
		spotifyApi.setAccessToken(credentials.body["access_token"]);

		data = (await spotifyApi.getAlbum(id, {})).body;
	} catch (err) {
		console.log("Something went wrong when retrieving an access token", err);
	}

	return {
		statusCode: 200,
		body: JSON.stringify(data),
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "GET, POST",
		},
	};
};
