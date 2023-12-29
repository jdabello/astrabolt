import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AstraDB } from "@datastax/astra-db-ts";
import { getFeaturedProducts, getSearchProductsByImage, getSearchProductsByText } from './langchain.js';

// Create Express app with type annotation
const app: Application = express();


// Enable CORS
app.use(cors());

// Parse JSON request bodies with increased limit
app.use(bodyParser.json({ limit: '20mb' }));
// Parse incoming request bodies
app.use(bodyParser.json());

declare global {
  namespace Express {
    interface Request {
      maxHeaderSize: number;
    }
  }
}

app.use((req, res, next) => {
  req.maxHeaderSize = 20 * 1024 * 1024; // Set limit for each request
  next();
});

const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT} = process.env;

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT);

const col_descriptions = await db.collection("product_catalog_descriptions");

function isBase64Image(string: string) {
  const base64ImageRegex = /^data:image\/(png|jpeg|gif|bmp);base64,/;
  return base64ImageRegex.test(string);
}

// ProductsFind endpoint
app.get('/productsFind/:filter', async (req: Request, res: Response) => {
  const fields = { "name": true, "image": true, "price": true, "description": true };
  const parsedFilter: Record<string, any> = JSON.parse(req.params.filter);
  const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 40;
  const document_list = await col_descriptions.find(parsedFilter, { limit: limit, projection: fields }).toArray();
  res.json({ message: document_list });
});

app.post('/productsVectorFind', async (req: Request, res: Response) => {
  const fields = { "name": true, "image": true, "price": true, "description": true };
  const parsedFilter: Record<string, any> = JSON.parse(req.body.filter);
  const limit = req.body.limit ? parseInt(req.body.limit.toString(), 10) : 40;
  const query = req.body.query;
  if (isBase64Image(req.body.query)) {
    const document_list = await getSearchProductsByImage(query,parsedFilter,limit);
    res.json({ message: document_list });
  }else{
    const document_list = await getSearchProductsByText(query,parsedFilter,limit);
    res.json({ message: document_list });
  }
  
});

app.post('/featuredProducts', async (req: Request, res: Response) => {
  const pastSearches:string[]=req.body.pastSearches;
  const response = await getFeaturedProducts(pastSearches);
  res.json({ message: response });
});

// Server port
const port = 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
