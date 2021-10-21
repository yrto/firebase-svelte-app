import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { productModel } from './models/product';
import axios from 'axios';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

// interface searchResquest {
// 	name: string;
// }

const rawgApiUrl = 'https://api.rawg.io/api/games';
const rawgApiKey = 'e7ae7551dcff43e1b8c743bccfee618a';

export const helloWorld = functions.https.onRequest((request, response) => {
	functions.logger.info('Hello logs!', { structuredData: true });
	response.send('Hello from Firebase!');
});

export const newProduct = functions.https.onRequest(async (request, response) => {
	// functions.logger.info('Hello logs!', { structuredData: true });
	const product: productModel = {
		name: 'test',
		description: 'test desc',
		price: 12.9,
		stock: 10
	};
	await admin.firestore().collection('products').add(product);
	response.send('Hello from Firestore!');
});

export const getGamesGames = functions.https.onRequest((request, response) => {
	functions.logger.info('Hello logs!', { structuredData: true });
	response.send('Hello from Firebase!');
});

interface gameInfo {
	slug: string;
	name: string;
}

interface rawGamesResponse {
	count: number;
	results: gameInfo[];
}

export const getGames = functions.https.onRequest(async (request, response) => {
	try {
		const pageSize = 10;
		const page = request.body.page;
		const gameName = request.body.name;
		const excludeStores = '9'; // 9 = itch.io
		const url = `${rawgApiUrl}?key=${rawgApiKey}&page_size=${pageSize}&page=${page}&search=${gameName}&exclude_stores=${excludeStores}&search_precise=true`;
		const res = await axios.get<rawGamesResponse>(url);
		const pages = Math.ceil(res.data.count / pageSize);
		const results = res.data.results.map(
			(game: gameInfo): gameInfo => ({
				slug: game.slug,
				name: game.name
			})
		);
		response.send({
			gameName,
			pages,
			results
		});
	} catch (error) {
		response.send(error);
	}
});

// functions.logger.info('Hello logs!', { structuredData: true });
// await admin.firestore().collection('products').add(product);
