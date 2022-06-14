import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TwitterApi } from 'twitter-api-v2';
import 'source-map-support/register';

export const getTweets = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	const twitterId: string = event.pathParameters.twitterId;
	const twitterClient = new TwitterApi({
		appKey: process.env.TWITTER_CONSUMER_KEY,
		appSecret: process.env.TWITTER_CONSUMER_SECRET,
		accessToken: process.env.TWITTER_ACCESS_TOKEN,
		accessSecret: process.env.TWITTER_ACCESS_SECRET,
	});
	const roClient = twitterClient.readOnly;
	try {
		const userTimeline = await roClient.v1.userTimelineByUsername(twitterId, { count: 5 });

		return {
			statusCode: 200,
			body: JSON.stringify({ userTimeline: userTimeline.tweets }),
		};
	} catch (err) {
		return {
			statusCode: 400,
			body: JSON.stringify(err),
		};
	}
};
