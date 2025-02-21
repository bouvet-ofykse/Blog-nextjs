'use server';

import createClient from '@azure-rest/ai-vision-image-analysis';
import {AzureKeyCredential} from "@azure/core-auth";


const endpoint = process.env.VISION_ENDPOINT;
const key = process.env.VISION_KEY;

console.log('endpoint', endpoint);
console.log('key', key);


const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = [
    'Caption',
    'DenseCaptions',
    'Tags',
    'Read'
];

type Tag = {
    name: string,
    confidence: number,
}

export async function analyzeImageFromUrl(imageUrl) {

    // Simulerer bare en request mot azure
    // const result = await client.path('/imageanalysis:analyze').post({
    //     body: {
    //         url: imageUrl
    //     },
    //     queryParameters: {
    //         features: features,
    //         language: 'en'
    //     },
    //     contentType: 'application/json'
    // });
    //
    // const iaResult = result.body;

    // if(iaResult.tagsResult) {
    //     console.log('Tags:', iaResult.tagsResult);
    //     console.log('Caption:', iaResult.captionResult);
    //     console.log('RES:', iaResult);
    //     return iaResult.tagsResult;
    // }

    // if (iaResult.captionResult) {
    //     console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
    // }
    // if (iaResult.readResult) {
    //     iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
    // }

    return setTimeout(() => {
        console.log('Simulerer bare en request mot azure');
        return 'Dette er bare testdata';
    }, 2000)
}