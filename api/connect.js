import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config({path: '../.env'})

const URI = process.env.URI_DATABASE;

const client = new MongoClient(URI);

export const db = client.db('storereact');

