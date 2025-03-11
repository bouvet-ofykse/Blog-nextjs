import {ImageAnalysisResult} from "@/lib/image-analysis-result";
import styles from './image-analysis-results.module.css';

interface ImageAnalysisResultBoxProps {
    result: ImageAnalysisResult;
}


export default function ImageAnalysisResultBox({result}: ImageAnalysisResultBoxProps) {


    return (
        <div className={styles.results}>
            <h2>Results</h2>
            <h4>Model version</h4>
            {result.modelVersion}
            <h4>Caption {`(confidence: ${result.captionResult.confidence.toFixed(4)})`}:</h4>
            {result.captionResult.text}
            <h4>Tags</h4>

            <ul>
                {result.tagsResult.values.map((value) => {
                    return (
                        <li key={value.name}>
                            <strong>{value.name}</strong> {`(confidence: ${value.confidence.toFixed(4)})`}
                        </li>
                    )
                })}
            </ul>

        </div>

    );
}