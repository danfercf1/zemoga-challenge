interface CreatePortfolio {
	body: {
		information: string;
		image: string;
		title: string;
		description: string;
		twitterId: string;
	};
}

export default CreatePortfolio;
