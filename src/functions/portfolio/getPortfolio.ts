import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import portfolioService from '../../services';

export const getPortfolio = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	try {
		const id: string = event.pathParameters.portfolioId;
		const portfolio = await portfolioService.getPortfolio(id);
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
			body: JSON.stringify(portfolio),
		};
	} catch (err) {
		return {
			statusCode: 400,
			body: JSON.stringify(err),
		};
	}
};
