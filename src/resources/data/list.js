import Resources from "__src/resources";
const {Res, Color} = Resources;

const listings = [
	{
  	name: "Similar Listings",
  	boldname: false,
  	showAddToFav: true,
  	listings: [
  	  {
  	  	id: 1,
				photo: Res.get("item_A_1"),
				type: "BOAT RIDE",
				name: "Sail past Japan's largest port with a certified skipper",
				address: "Tokyo, Japan",
				price: 60,
				priceType: "per person",
				categoryCode: 29,
				color: Color.gray04,
  	  },
  	  {
  	  	id: 2,
				photo: Res.get("item_A_2"),
				type: "CHEESE TASTING",
				name: "Funny cheesemonger takes you on a Tour de Fromage",
				address: "Paris, France",
				price: 70,
				priceType: "per person",
				categoryCode: 4,
				color: Color.darkOrange,
			},
  	  {
  	  	id: 3,
				photo: Res.get("item_A_3"),
				type: "BIKE RIDE",
				name: "Cycling, \"KFC\" & Drinking for your Seoul",
				address: "Seoul, South Korea",
				price: 47,
				priceType: "per person",
				categoryCode: 30,
				color: Color.black,
  	  },
  	  {
  	  	id: 4,
				photo: Res.get("item_A_4"),
				type: "BIKE RIDE",
				name: "Cycle through side streets with a local",
				address: "Amsterdam, Netherlands",
				price: 57,
				priceType: "per person",
				categoryCode: 70,
				color: Color.brown01,
  	  },
  	  {
  	  	id: 5,
				photo: Res.get("item_A_5"),
				type: "SURFING",
				name: "Surf Bondi's waves, then eat & drink like a local",
				address: "Sydney, Australia",
				price: 61,
				priceType: "per person",
				categoryCode: 66,
				color: Color.blue,
  	  },
  	  {
  	  	id: 6,
				photo: Res.get("item_A_6"),
				type: "DRAWING CLASS",
				name: "A drawing/walking tour in Montmartre",
				address: "Paris, France",
				price: 55,
				priceType: "per person",
				categoryCode: 15,
				color: Color.brown02,
  	  },
  	],
	},
];

const listings2 = [
	{
  	name: "Similar Listings",
  	boldname: false,
  	showAddToFav: true,
  	listings: [
  	  {
  	  	id: 1,
				photo: Res.get("item_B_1"),
				type: "BOAT RIDE",
				name: "Sail past Japan's largest port with a certified skipper",
				address: "Tokyo, Japan",
				price: 60,
				priceType: "per person",
				categoryCode: 29,
				color: Color.gray04,
  	  },
  	  {
  	  	id: 2,
				photo: Res.get("item_B_2"),
				type: "CHEESE TASTING",
				name: "Funny cheesemonger takes you on a Tour de Fromage",
				address: "Paris, France",
				price: 70,
				priceType: "per person",
				categoryCode: 4,
				color: Color.darkOrange,
			},
  	  {
  	  	id: 3,
				photo: Res.get("item_B_3"),
				type: "BIKE RIDE",
				name: "Cycling, \"KFC\" & Drinking for your Seoul",
				address: "Seoul, South Korea",
				price: 47,
				priceType: "per person",
				categoryCode: 30,
				color: Color.black,
  	  },
  	  {
  	  	id: 4,
				photo: Res.get("item_B_4"),
				type: "BIKE RIDE",
				name: "Cycle through side streets with a local",
				address: "Amsterdam, Netherlands",
				price: 57,
				priceType: "per person",
				categoryCode: 70,
				color: Color.brown01,
  	  },
  	  {
  	  	id: 5,
				photo: Res.get("item_B_5"),
				type: "SURFING",
				name: "Surf Bondi's waves, then eat & drink like a local",
				address: "Sydney, Australia",
				price: 61,
				priceType: "per person",
				categoryCode: 66,
				color: Color.blue,
  	  },
  	  {
  	  	id: 6,
				photo: Res.get("item_B_6"),
				type: "DRAWING CLASS",
				name: "A drawing/walking tour in Montmartre",
				address: "Paris, France",
				price: 55,
				priceType: "per person",
				categoryCode: 15,
				color: Color.brown02,
  	  },
  	],
	},
];

const listings3 = [
	{
  	name: "Similar Listings",
  	boldname: false,
  	showAddToFav: true,
  	listings: [
  	  {
  	  	id: 1,
				photo: Res.get("home_image_1"),
				type: "BOAT RIDE",
				name: "Sail past Japan's largest port with a certified skipper",
				address: "Tokyo, Japan",
				price: 60,
				priceType: "per person",
				categoryCode: 29,
				color: Color.gray04,
  	  },
  	  {
  	  	id: 2,
				photo: Res.get("home_image_2"),
				type: "CHEESE TASTING",
				name: "Funny cheesemonger takes you on a Tour de Fromage",
				address: "Paris, France",
				price: 70,
				priceType: "per person",
				categoryCode: 4,
				color: Color.darkOrange,
			},
  	  {
  	  	id: 3,
				photo: Res.get("home_image_3"),
				type: "BIKE RIDE",
				name: "Cycling, \"KFC\" & Drinking for your Seoul",
				address: "Seoul, South Korea",
				price: 47,
				priceType: "per person",
				categoryCode: 30,
				color: Color.black,
  	  },
  	],
	},
];

const service = [
	{
  	showAddToFav: true,
  	listings: [
  	  {
  	  	id: 1,
				photo: Res.get("unified_logo"),
				name: "Unified Services",
			
  	  }, {
  	  	id: 2,
				photo: Res.get("official_store_logo"),
				name: "Official Stores",
			}, {
  	  	id: 3,
				photo: Res.get("bentanayan_logo"),
				name: "",
  	  }, {
  	  	id: 4,
				photo: Res.get("phillands_logo"),
				name: "",
  	  }, {
  	  	id: 5,
				photo: Res.get("automobile_logo"),
				name: "Automobile",
  	  },
  	],
	},
];

export default {listings, listings2, listings3, service};
