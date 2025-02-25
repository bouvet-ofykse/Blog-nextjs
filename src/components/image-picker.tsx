// import { useRef, useState } from "react";
// import Image from "next/image";
// import { uploadImage } from "@/lib/cloudinary";
//
//
//
// export default function ImagePicker() {
//
//     const [pickedImage, setPickedImage] = useState();
//     const [imageUrl, setImageUrl] = useState();
//
//     let uploadResult: string;
//     const imageInput = useRef(null);
//
//     async function saveImage(file)
//     {
//         try {
//             uploadResult = await uploadImage(file);
//             setImageUrl(uploadResult);
//
//         } catch (error) {
//             throw new Error('Uploading the image to cloud failed..', error)
//         }
//     }
//
//     async function handleAnalyseImage() {
//
//         // TODO: Handle analyse image
//         console.log('Starting image analysis...')
//         const res = await analyzeImageFromUrl(imageUrl);
//         console.log(res)
//     }
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
//     function handleImageChange(event) {
//
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
//         saveImage(file);
//
//     }
//
//     function handlePickImageClick() {
//         imageInput.current.click();
//     }
//
//     return (
//         <div className='picker'>
//             <label htmlFor='image'></label>
//             <div className='mb-6'>
//                 {!pickedImage && <p>No image picked yet..</p>}
//                 {pickedImage && <Image src={pickedImage} alt='Image uploaded by the user' height={400} width={400} />}
//             </div>
//             <div>
//                 <input name='image' type='file' accept="image/png image/jpg" className='hidden' ref={imageInput} onChange={handleImageChange} />
//             </div>
//             <p>
//                 <button type='button' onClick={handlePickImageClick} className='bg-stone-800 rounded p-2 '>Choose an
//                     image
//                 </button>
//             </p>
//             <p>
//                 {imageUrl && <button type='button' onClick={handleAnalyseImage} className='bg-stone-800 rounded p-2 ' >Analyse image</button>}
//             </p>
//
//             <div>Results:</div>
//
//         </div>
//
//     );
// }