import fetch from "node-fetch";
var SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

exports.handler = async (event, context) => {
	let id = event.queryStringParameters.id;
	let headers;

	var spotifyApi = new SpotifyWebApi({
		clientId: process.env.ClientID,
		clientSecret: process.env.ClientSecret,
	});
	let playlist = await spotifyApi
		.clientCredentialsGrant()
		.then(
			function (data) {
				// Save the access token so that it's used in future calls
				spotifyApi.setAccessToken(data.body["access_token"]);
				headers = {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
				};
			},
			function (err) {
				console.log(
					"Something went wrong when retrieving an access token",
					err.message,
				);
			},
		)
		.then(() => {
			return getPlaylist(headers, id);
		});
	let ids = [];
	playlist.map((song) => {
		ids.push(song.track.id);
	});
	let features = await getAudioFeatures(headers, ids);
	return {
		statusCode: 200,
		body: JSON.stringify({ playlist: playlist, features: features }),
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
		},
	};
};

function getPlaylist(headers, id) {
	return fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?market=US`, {
		headers: headers,
	})
		.then((response) => response.json())
		.then((jsonData) => {
			return jsonData.items;
		});
}

function getAudioFeatures(headers, ids) {
	const id = ids.join("%2C");
	return fetch(`https://api.spotify.com/v1/audio-features?ids=${id}`, {
		headers: headers,
	})
		.then((response) => response.json())
		.then((jsonData) => {
			return jsonData.audio_features;
		});
}
