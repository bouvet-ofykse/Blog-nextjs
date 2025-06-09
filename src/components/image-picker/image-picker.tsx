// import {useRef, useState} from "react";
// import Image from "next/image";
// import {uploadImage} from "@/lib/cloudinary";
// import {analyzeImageFromUrl} from "@/actions/images";
// import {ImageAnalysisResult} from "@/lib/image-analysis-result";
// import ImageAnalysisResultBox from "@/components/image-picker/image-analysis-results";
// import styles from './image-picker.module.css';
//
//
// export default function ImagePicker() {
//     const [pickedImage, setPickedImage] = useState<string | undefined>();
//     const [imageUrl, setImageUrl] = useState<string | undefined>();
//     const [analysisResults, setAnalysisResults] = useState<ImageAnalysisResult>();
//
//     const imageInput = useRef(null);
//
//     async function saveImage(file) {
//         try {
//             const uploadResult = await uploadImage(file);
//             setImageUrl(uploadResult);
//         } catch (error) {
//             console.error('Uploading the image to cloud failed..', error);
//         }
//     }
//
//     async function handleAnalyseImage() {
//         console.log('Starting image analysis...');
//         const res = await analyzeImageFromUrl(imageUrl);
//         setAnalysisResults(res);
//         console.log(res);
//     }
//
//     function handleImageChange(event) {
//         const file = event.target.files[0];
//         if (!file) {
//             setPickedImage(undefined);
//             return;
//         }
//
//         const fileReader = new FileReader();
//         fileReader.onload = () => {
//             setPickedImage(fileReader.result);
//         }
//         fileReader.readAsDataURL(file);
//         setAnalysisResults(undefined);
//         saveImage(file);
//     }
//
//     function handlePickImageClick() {
//         if (imageInput.current !== null) {
//             imageInput.current.click();
//         }
//     }
//
//     return (
//         <main className={styles.main}>
//             <div>
//                 <label htmlFor='image'></label>
//                 {!pickedImage && <div className={styles.placeholder}><span>No image picked yet..</span></div>}
//                 {pickedImage && <Image src={pickedImage} alt='Image uploaded by the user' height={400} width={400}/>}
//                 <div>
//                     <input name='image' type='file' accept="image/png, image/jpg" hidden={true} ref={imageInput}
//                            onChange={handleImageChange}/>
//                 </div>
//                 <p>
//                     <button type='button' onClick={handlePickImageClick} className=''>
//                         Choose an image
//                     </button>
//                 </p>
//                 <p>
//                     {imageUrl && analysisResults === undefined &&
//                         <button type='button' onClick={handleAnalyseImage} className=''>Start analysis</button>}
//                 </p>
//             </div>
//             <div>
//                 {analysisResults && <ImageAnalysisResultBox result={analysisResults}/>}
//             </div>
//         </main>
//
//     );
// }