import {analyzeImageFromUrl} from "@/actions/images";


export default async function ImageAnalysisPage() {


    function handleAnalyseClick() {
        await analyzeImageFromUrl();
    }



    return (
        <>
            <h1>Bildeanalyse</h1>
            <p>
                <button onClick={handleAnalyseClick}>Analyser</button>
            </p>
        </>
    );
}