import createDynamoDBClient from '../db';
import PortfolioService from './portfolioService';

const { TABLE } = process.env;

const portfolioService = new PortfolioService(createDynamoDBClient(), TABLE);

export default portfolioService;
