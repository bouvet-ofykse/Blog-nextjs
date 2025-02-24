// 'use client';
//
// import Form from "next/form";
// import ImagePicker from "@/components/image-picker";
// import {useEffect, useState} from "react";
// import {analyzeImageFromUrl} from "@/actions/images";
//
//
// export default function ImageAnalysisPage() {
//
//
//     const [analysis, setAnalysis] = useState(undefined)
//
//
//     async function handleAnalyseClick() {
//
//         await analyzeImageFromUrl().then(result => {
//             console.log('result', result);
//             setAnalysis(result);
//             console.log('result', result);
//             return result;
//         })
//
//     }
//
//     return (
//         <>
//             <h1 className='text-3xl mb-3'>
//                 Image analysis
//             </h1>
//             <p>Upload an image to analyze</p>
//
//             <div className='my-6'>
//                 <ImagePicker />
//             </div>
//             <p>
//             </p>
//             <ul>
//                 {!analysis && <p>No data retrieved yet..</p>}
//                 {/*{analysis && analysis.map(a => (*/}
//                 {/*    <li key={a.name}>{a.name}: {a.confidence}</li>*/}
//                 {/*    ))*/}
//                 {/*}*/}
//             </ul>
//         </>
//     );
// }