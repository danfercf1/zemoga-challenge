import { APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import portfolioService from '../../services';

export const getPortfolios = async (): Promise<APIGatewayProxyResult> => {
	try {
		const portfolios = await portfolioService.getAllPortfolios();

		return {
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
