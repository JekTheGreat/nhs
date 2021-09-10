
export const month = [
	{name: "January", value: "01"},
	{name: "February", value: "02"},
	{name: "March", value: "03"},
	{name: "April", value: "04"},
	{name: "May", value: "05"},
	{name: "June", value: "06"},
	{name: "July", value: "07"},
	{name: "August", value: "08"},
	{name: "September", value: "09"},
	{name: "October", value: "10"},
	{name: "November", value: "11"},
	{name: "December", value: "12"},
];
export const day = [
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
	"11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
	"21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31",
];
export const year = [
	"2018", "2017", "2016", "2015", "2014", "2013",
	"2012", "2011", "2010", "2009", "2008", "2007",
	"2006", "2005", "2004", "2003", "2002", "2001",
	"2000", "1999", "1998", "1997", "1996", "1995",
	"1994", "1993", "1992", "1991", "1990", "1989",
	"1988", "1987", "1986", "1985", "1984", "1983",
	"1982", "1981", "1980", "1979", "1978", "1977",
	"1976", "1975", "1974", "1973", "1972", "1971",
	"1970", "1969", "1968", "1967", "1966", "1965",
	"1964", "1963", "1962", "1961", "1960", "1959",
];
export const billspayments = [
	{
	  nodeId: 1,
	  currencyCode: "Utilities",
	  children: [
			{
		  nodeId: 1,
		  description: "Batangas Electric Cooperative II",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "bookId",
			  name: "Book ID",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "billMonth",
			  name: "Billing Month",
			  default: "ENABLED",
			  type: "DATE",
					},
					{
			  key: "mobileNo",
			  name: "Mobile Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 2,
		  description: "Cignal TV",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 3,
		  description: "Easytrip",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 4,
		  description: "Manila Water Co.",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 5,
		  description: "Maynilad Water",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
	  ],
	},
	{
	  nodeId: 2,
	  currencyCode: "Telcom",
	  children: [
			{
		  nodeId: 1,
		  description: "Bayan Tel/ICC",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "bookId",
			  name: "Book ID",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "billMonth",
			  name: "Billing Month",
			  default: "ENABLED",
			  type: "DATE",
					},
					{
			  key: "mobileNo",
			  name: "Mobile Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 2,
		  description: "Eastern Telecom",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 3,
		  description: "Globe Telecom Handyphone",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 4,
		  description: "Innove",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
			{
		  nodeId: 5,
		  description: "PLDT",
		  default: "ENABLED",
		  children: [
					{
			  key: "acctNo",
			  name: "Account Number",
			  default: "ENABLED",
			  type: "TEXT",
					},
					{
			  key: "subsciberName",
			  name: "Subscriber Name",
			  default: "ENABLED",
			  type: "TEXT",
					},
		  ],
			},
	  ],
	},
];
export const remittancesend_data = [
	{
	  nodeId: "1",
	  description: "ECash to ECash",
	  icon: "ecash",
	}, {
	  nodeId: "2",
	  description: "Convert to Load Fund",
	  icon: "padala_btn",
	}, {
	  nodeId: "3",
	  description: "E-Cash Padala",
	  icon: "padala_btn",
	}, {
	  nodeId: "4",
	  description: "Smartmoney",
	  icon: "ecash_to_smartmoney",
	}, {
	  nodeId: "5",
	  description: "Credit to Bank",
	  icon: "credittobank_btn",
	}, {
	  nodeId: "6",
	  description: "Cebuana",
	  icon: "cebuana_btn",
	}, {
	  nodeId: "7",
	  description: "GCash",
	  icon: "ecash_to_gcash",
	}, {
	  nodeId: "8",
	  description: "Forex Rate",
	  icon: "padala_btn",
	}, {
	  nodeId: "9",
	  description: "Conversion",
	  icon: "padala_btn",
	}, {
	  nodeId: "10",
	  description: "Western Union",
	  icon: "western_btn",
	},
];
export const fundrequest_data = [
	{
	  nodeId: 1,
	  description: "Bank Deposit",
	  name: "Aas",
	},
	{
	  nodeId: 2,
	  description: "Credit Debit",
	  name: "RJ",
	},
	{
	  nodeId: 3,
	  description: "Ecash to Dragonpay",
	  name: "JK",
	},
];
export const Category = [
	{
		headerName: "Home",
		ACCESS: true,
	}, {
		headerName: "Loading",
		ACCESS: true,
		items: [{
			title: "E-Loading",
			airtime_loading: "1",
		}, {
			title: "International",
			intl_airtime_loading: "1",
		}],
	}, {
		headerName: "Remittance",
		remittance: "1",
		items: [{
			title: "Send",
		}, {
			title: "Payout",
		}],
	}, {
		headerName: "Bills Payment",
		billspayment: "1",
		items: [
			{
				title: "Utilities",
			}, {
				title: "Telecom",
			}, {
				title: "Airlines",
			}, {
				title: "Credit Cards",
			}, {
				title: "Government",
			}, {
				title: "Insurance",
			}, {
				title: "Schools",
			}, {
				title: "Other",
			}, {
				title: "E-Cash Top up",
			}],
	}, {
		headerName: "Ticketing",
		online_booking: "1",
		items: [{
			title: "Search Flight",
		}, {
			title: "Booking Transactions",
		}, {
			title: "Markup",
		}],
	}, {
		headerName: "Network",
		networking: "1",
		items: [
			{
				title: "Genealogy",
			}, {
				title: "Referrals",
			}, {
				title: "Points",
			}, {
				title: "Downlines",
			}, {
				title: "Network Income",
			}],
	}, {
		headerName: "Online Shop",
		online_shop: "1",
		items: [
			{
				title: "Buy Codes",
			}, {
				title: "Upgrade Account",
			}, {
				title: "MLM Shop",
			}],
	}, {
		headerName: "Insurance",
		insurance: "1",
		items: [{
			title: "Personal Accident",
		}, {
			title: "Compulsory Third Party Liability",
		}],
	}, {
		headerName: "Reports",
		ACCESS: true,
		items: [{
			title: "General Report",
		}, {
			title: "Loading",
		}],
	},
];
