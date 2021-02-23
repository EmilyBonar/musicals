interface Musical {
	title: string;
	composer: string[];
	premiered: Date;
	spotifyID: string;
}

export const musicals: Musical[] = [
	{
		title: "Hamilton",
		composer: ["Lin Manuel Miranda"],
		premiered: new Date("January 20, 2015"),
		spotifyID: "1kCHru7uhxBUdzkm4gzRQc",
	},
	{
		title: "Six",
		composer: ["Toby Marlow", "Lucy Moss"],
		premiered: new Date("2017"),
		spotifyID: "5jTDaLFNQovRyjNcWe4cZh",
	},
];

export default musicals;
