import { APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import portfolioService from '../../services';

export const getPortfolios = async (): Promise<APIGatewayProxyResult> => {
	try {
		const portfolios = await portfolioService.getAllPortfolios();
		const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
			'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
			'X-Requested-With': '*',
		};

		return {
			headers,
			statusCode: 200,
			body: JSON.stringify(portfolios),
		};
	} catch (err) {
		return {
			statusCode: 400,
			body: JSON.stringify(err),
		};
	}
};
