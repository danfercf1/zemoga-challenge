import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as uuid from 'uuid';
import 'source-map-support/register';
import CreatePortfolio from '../../dtos/createPortfolio';
import portfolioService from '../../services';

export const createPortfolio = async (event: APIGatewayEvent & CreatePortfolio): Promise<APIGatewayProxyResult> => {
	const { information, image, title, description, twitterId } = JSON.parse(event.body);
	const newPortfolio = {
		id: uuid.v4(),
		information,
		image,
		title,
		description,
		twitterId,
		active: true,
		createdAt: new Date().toISOString(),
	};
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
		'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
		'X-Requested-With': '*',
	};
	const portfolio = await portfolioService.createPortfolio(newPortfolio);

	return {
		headers,
		statusCode: 201,
		body: JSON.stringify(portfolio),
	};
};
