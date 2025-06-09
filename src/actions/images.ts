// 'use server';

// import createClient from '@azure-rest/ai-vision-image-analysis';
// import {AzureKeyCredential} from "@azure/core-auth";
// import {ImageAnalysisResult} from "@/lib/image-analysis-result";
//
//
// const endpoint: string | undefined = process.env.VISION_ENDPOINT;
// const key: string | undefined = process.env.VISION_KEY;
//
// if (endpoint === undefined || key === undefined) {
//     throw new Error('Missing VISION_ENDPOINT or VISION_KEY environment variable');
// }
//
// const credential = new AzureKeyCredential(key);
// const client = createClient(endpoint, credential);
//
// const features = [
//     'Caption',
//     // 'DenseCaptions',
//     'Tags',
//     'Objects',
//     'People',
//     // 'Read'
// ];

// export async function analyzeImageFromUrl(imageUrl: string): Promise<ImageAnalysisResult>  {
//     const result = await client.path('/imageanalysis:analyze').post({
//         body: {
//             url: imageUrl
//         },
//         queryParameters: {
//             features: features,
//             language: 'en',
//         },
//         contentType: 'application/json'
//     });
//
//     if ('modelVersion' in result.body) {
//         const iaResult: ImageAnalysisResult = result.body;
//         console.dir(iaResult, { depth: null });
//
//         if (iaResult !== undefined) {
//             return iaResult;
//         }
//     }
//
//     return {} as ImageAnalysisResult;
// }
