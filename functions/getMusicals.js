var SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

exports.handler = async (event, context) => {
	let ids = event.queryStringParameters.id.split(",");
	var spotifyApi = new SpotifyWebApi({
		clientId: process.env.ClientID,
		clientSecret: process.env.ClientSecret,
	});
	let responses = [];
	let data;
	try {
		let credentials = await spotifyApi.clientCredentialsGrant();
		spotifyApi.setAccessToken(credentials.body["access_token"]);
		let paginatedIDs = [[]];
		ids.forEach((id) => {
			if (paginatedIDs[paginatedIDs.length - 1].length < 20) {
				paginatedIDs[paginatedIDs.length - 1].push(id);
			} else {
				paginatedIDs.push([id]);
			}
		});

		return Promise.all(
			paginatedIDs.map((page) => spotifyApi.getAlbums(page)),
		).then((res) => {
			data = res.reduce((allData, cur) => [...allData, ...cur.body.albums], []);
			return {
				statusCode: res[0].statusCode,
				body: JSON.stringify(data),
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Methods": "GET, POST",
				},
			};
		});
	} catch (err) {
		console.error("Something went wrong when retrieving an access token", err);
		response = { statusCode: err.statusCode };
		response.body = err.body;
		return {
			statusCode: response.statusCode,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, POST",
			},
		};
	}
};
