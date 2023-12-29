import { GoogleVertexAIMultimodalEmbeddings } from "langchain/experimental/multimodal_embeddings/googlevertexai";
import {
    AstraDBVectorStore
} from "@langchain/community/vectorstores/astradb";

const descriptionsVectorStore = await AstraDBVectorStore.fromExistingIndex(new GoogleVertexAIMultimodalEmbeddings(), {
    token: process.env.ASTRA_DB_APPLICATION_TOKEN as string,
    endpoint: process.env.ASTRA_DB_API_ENDPOINT as string,
    collection: "product_catalog_descriptions" ?? "product_catalog_descriptions",
    collectionOptions: {
        vector: {
            dimension: 1408,
            metric: "cosine",
        },
    },
});
const imagesVectorStore = await AstraDBVectorStore.fromExistingIndex(new GoogleVertexAIMultimodalEmbeddings(), {
    token: process.env.ASTRA_DB_APPLICATION_TOKEN as string,
    endpoint: process.env.ASTRA_DB_API_ENDPOINT as string,
    collection: "product_catalog_images" ?? "product_catalog_images",
    collectionOptions: {
        vector: {
            dimension: 1408,
            metric: "cosine",
        },
    },
});

const embeddings = new GoogleVertexAIMultimodalEmbeddings();

export async function getSearchProductsByText(query: string, filter: Record<string, any>, limit: number) {
    const vectorQuery: number[] = await embeddings.embedQuery(query);
    const results = await descriptionsVectorStore.similaritySearch(
        query,
        limit,
        filter
    );
    
    const formattedResults = results.map(item => {
        const metadata = item.metadata;
        return {
            ...metadata, // Spread the metadata properties
            _id: metadata.sku // Add the _id property with sku value
        };
    });
    return formattedResults;
}

export async function getSearchProductsByImage(base64EncodedImage: string, filter: Record<string, any>, limit: number) {
    const cleanBase64 = base64EncodedImage.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(cleanBase64, 'base64');
    const vectorQuery: number[] = await embeddings.embedImageQuery(imageBuffer);
    const results = await imagesVectorStore.similaritySearchVectorWithScore(
        vectorQuery,
        limit,
        filter
    );
    
    const formattedResults = results.map(item => {
        const metadata = item[0].metadata;
        return {
            ...metadata, // Spread the metadata properties
            _id: metadata.sku // Add the _id property with sku value
        };
    });
    return formattedResults;
}

export async function getFeaturedProducts(pastSearches: string[]) {
    var all_results: any[] = [];
    var document_list = [];
    var ids: any[] = [];
    for (var index in pastSearches) {
        const results = await descriptionsVectorStore.similaritySearchWithScore(pastSearches[index], 10);
        all_results = all_results.concat(results);
    }
    all_results.sort((a, b) => b[1] - a[1]);
    for (var result in all_results) {
        var doc = all_results[result][0].metadata;
        if (!ids.includes(doc["sku"])) {
            doc["_id"] = doc["sku"];
            document_list.push(doc);
            ids.push(doc["sku"]);
        }
    }
    return document_list;
}
