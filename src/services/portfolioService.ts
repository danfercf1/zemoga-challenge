import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Portfolio } from '../models';

class PortfolioService {
	constructor(private readonly docClient: DocumentClient, private readonly tableName: string) {}

	async getAllPortfolios(): Promise<Portfolio[]> {
		const result = await this.docClient
			.scan({
				TableName: this.tableName,
			})
			.promise();

		return result.Items as Portfolio[];
	}

	async getPortfolio(id: string): Promise<Portfolio> {
		const result = await this.docClient
			.get({
				TableName: this.tableName,
				Key: { id },
			})
			.promise();

		return result.Item as Portfolio;
	}

	async createPortfolio(Portfolio: Portfolio): Promise<Portfolio> {
		await this.docClient
			.put({
				TableName: this.tableName,
				Item: Portfolio,
			})
			.promise();

		return Portfolio;
	}

	async deletePortfolio(id: string) {
		return this.docClient
			.delete({
				TableName: this.tableName,
				Key: { id },
			})
			.promise();
	}
}

export default PortfolioService;
