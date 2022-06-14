import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import portfolioService from '../../services';

export const getPortfolio = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	try {
		const id: string = event.pathParameters.portfolioId;
		const portfolio = await portfolioService.getPortfolio(id);

		return {
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
