export interface Musical {
	title: string;
	composers: string[];
	premiered: Date;
	spotifyID: string;
}

export const musicals: Musical[] = [
	{
		title: "Hamilton",
		composers: ["Lin Manuel Miranda"],
		premiered: new Date("January 20, 2015"),
		spotifyID: "1kCHru7uhxBUdzkm4gzRQc",
	},
	{
		title: "Six",
		composers: ["Toby Marlow", "Lucy Moss"],
		premiered: new Date("2017"),
		spotifyID: "5jTDaLFNQovRyjNcWe4cZh",
	},
	{
		title: "Matilda",
		composers: ["Tim Minchin"],
		premiered: new Date("November 9, 2010"),
		spotifyID: "4TMFJM8OsgA2RwwYySNhmU",
	},
	{
		title: "The Book of Mormon",
		composers: ["Trey Parker", "Robert Lopez", "Matt Stone"],
		premiered: new Date("March 24, 2011"),
		spotifyID: "5hk2UWDW3bm8tOmTLFeVMI",
	},
	{
		title: "Dear Evan Hansen",
		composers: ["Benj Pasek", "Justin Paul"],
		premiered: new Date("July 10, 2015"),
		spotifyID: "0LhDyJXelg31FKLW5GDcKi",
	},
	{
		title: "Legally Blonde",
		composers: ["Nell Benjamin", "Laurence O'Keefe"],
		premiered: new Date("January 23, 2007"),
		spotifyID: "15PeS1lN9gmoYmJMY60DxA",
	},
	{
		title: "Heathers",
		composers: ["Laurence O'Keefe", "Kevin Murphy"],
		premiered: new Date("2009"),
		spotifyID: "6EIxlDI9fMtooJ1H3toRFO",
	},
	{
		title: "Groundhog Day",
		composers: ["Tim Minchin"],
		premiered: new Date("August 16, 2016"),
		spotifyID: "0nv740XsW6ONByj7LLg9Xl",
	},
	{
		title: "Be More Chill",
		composers: ["Joe Iconis"],
		premiered: new Date("May 30, 2015"),
		spotifyID: "6emT6Wf0qivQ0Hyx0gruyr",
	},
	{
		title: "Come From Away",
		composers: ["Irene Sankoff", "David Hein"],
		premiered: new Date("2013"),
		spotifyID: "6SisHkIpxo4JN5kRcBEv9Z",
	},
	{
		title: "Waitress",
		composers: ["Sara Bareilles"],
		premiered: new Date("August 19, 2015"),
		spotifyID: "1E1tdqqLmyi03P0TJhGuw8",
	},
	{
		title: "Mean Girls",
		composers: ["Jeff Richmond", "Nell Benjamin"],
		premiered: new Date("October 31, 2017"),
		spotifyID: "6m7n9JuAOMcy8X3ntO0Ktf",
	},
	{
		title: "Made in Dagenham",
		composers: ["David Arnold", "Richard Thomas"],
		premiered: new Date("November 5, 2014"),
		spotifyID: "4z2Tn4fgI7Gus7qe0W8JcH",
	},
	{
		title: "RENT",
		composers: ["Jonathan Larson"],
		premiered: new Date("January 25, 1996"),
		spotifyID: "7JR7tGOAvqFSpVmDlCzHIJ",
	},
	{
		title: "Avenue Q",
		composers: ["Robert Lopez", "Jeff Marx"],
		premiered: new Date("2003"),
		spotifyID: "4Ok0WpQf9ucxEbd0wJV5Cx",
	},
	{
		title: "A Year with Frog and Toad",
		composers: ["Robert Reale", "Willie Reale"],
		premiered: new Date("2002"),
		spotifyID: "3ro3pvqmDCqk324ZzfHwEJ",
	},
	{
		title: "Caroline, Or Change",
		composers: ["Jeanine Tesori", "Tony Kushner"],
		premiered: new Date("November 30, 2003"),
		spotifyID: "4xCBLHCoWZqUuqXB7dSdq9",
	},
	{
		title: "Hadestown",
		composers: ["Anaïs Mitchell"],
		premiered: new Date("2016"),
		spotifyID: "1J1yxODbNlqKbwRqJxYJUP",
	},
	{
		title: "Falsettos",
		composers: ["William Finn"],
		premiered: new Date("April 29, 1992"),
		spotifyID: "4mCM4pXPU1JSsTNNEslE4v",
	},
	{
		title: "A Strange Loop",
		composers: ["Michael R. Jackson"],
		premiered: new Date("May 3, 2019"),
		spotifyID: "7vlAmEdZEOVdRUsB4fgrvC",
	},
];

export default musicals;
