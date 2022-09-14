import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../forms/Button';
import { addProductStart } from '../../redux/Products/products.actions'; 
import Modal from '../Modal';
import FormSelect from '../forms/FormSelect';
import FormInput from '../forms/FormInput';
import TextInput from '../forms/TextInput';
import Upload from '../Upload/Upload';
import getCroppedImg from '../Crop/CropImage';
import Crop from '../Crop';

import deleteFile from '../../firebase/deleteFile';
import { auth } from '../../firebase/utils';
import uploadFileWithProgress from '../../firebase/uploadFileWithProgress';

import { v4 } from 'uuid';
import {TbShirt} from "react-icons/tb";
import {IoCloseOutline, IoImagesOutline} from "react-icons/io5";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import { TbArrowsDiagonal } from "react-icons/tb";
import { BsPlusCircle } from "react-icons/bs";


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

function AddNewProduct({setHideModal, hideModal}) {

    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    // const [productThumbnail, setProductThumbnail] = useState('');
    let productThumbnail = '';
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');

    // const [hideModal, setHideModal] = useState(true);
    const [finishEditing, setFinishEditing] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);     // files selected by user using Upload button
    const [objectUrls, setObjectUrls] = useState([]);           // urls that does not persist (preview urls)

    const [downloadUrls, setDownloadUrls] = useState([]);       // urls of UPLOADED images

    const [imageIndex, setImageIndex] = useState(0)     // image index of preview image
    const [progress, setProgress] = useState(0); 
    const [isLoading, setIsLoading] = useState(false);

    // edit image section
    const [openCrop, setOpenCrop] = useState(false);
    const [showImageDetail, setShowImageDetail] = useState(false)
    // edit data
    const [uploadRotateSize, setUploadRotateSize] = useState([]);
    const [uploadCroppedArea, setUploadCroppedArea] = useState([]);

    // base 64 urls of edited images
    const [dataImageUrls, setDataImageUrls] = useState([]);

    // urls of edited images
    // can be deleted, just replace downloadUrls.
    const [finalImageUrls, setFinalImageUrls] = useState([]);


    const toggleModal = () => {
        setHideModal(!hideModal);
        resetModalState();
        console.log("toggleModal");
    };

    const resetModalState = () =>{
        setObjectUrls([])
        setDownloadUrls([]) 
        setSelectedFiles([])
        setFinishEditing(false);
        setUploadRotateSize([]);
        setUploadCroppedArea([]);
        setDataImageUrls([]);
        setFinalImageUrls([]);
        setIsLoading(false);
    }

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('mens');
        setProductName('');
        // setProductThumbnail('');
        productThumbnail = '';
        setProductPrice(0);
        setProductDescription('');

        resetModalState();
    }

    const configModal = {
        hideModal,
        toggleModal
    };

    const setCroppedPhotoURL = (targetURL, newURL) =>{
        var index = objectUrls.indexOf(targetURL);
        if (index !== -1) {
            objectUrls[index] = newURL;
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const itemID = 'test' + v4();

        const cropImage = async () => {
            for(let i = 0 ; i < selectedFiles.length; i++){  
                // if the image is edited
                if((Object.keys(uploadCroppedArea[i]).length !== 0 || 
                Object.keys(uploadRotateSize[i]).length !== 0)){
                    try {
                        const { file, url } = await getCroppedImg(
                            downloadUrls[i],
                            uploadCroppedArea[i],
                            uploadRotateSize[i],
                            { horizontal: false, vertical: false },
                            uploadRotateSize,
                            uploadCroppedArea,
                            i,
                            false
                        );
                        // this url is in base 64
                        dataImageUrls.push(url);
                    } catch (error) {
                        console.log(error);
                    }
                }   
            }
        };

        const editedImageNameArray = [];
        const editedUrlIndex = [];
        const uploadImage = async(objectType, objectArray, finalArray) => {
            for(let i = 0 ; i < selectedFiles.length; i++){
                const imageName = v4() + '.' + selectedFiles[i].name.split('.').pop();
                console.log(imageName);
                if(objectType === "file" && 
                (Object.keys(uploadCroppedArea[i]).length !== 0 || 
                Object.keys(uploadRotateSize[i]).length !== 0)){
                    editedImageNameArray.push(imageName);
                    editedUrlIndex.push(i);
                    console.log(editedImageNameArray);
                }
                try {
                    const url = await uploadFileWithProgress(
                        objectArray[i],
                        `gallery/${auth.currentUser.uid}/${itemID}`,
                        imageName,
                        setProgress,
                        objectType
                    );
                    finalArray.push(url);
                } catch (error) {
                    console.log(error.message);
                }
            }
        };

        // upload image -> getUrl (downloadUrls[])
        uploadImage("file", selectedFiles, downloadUrls).then(() =>{
            //edit image using that url  -> get dataImageUrls( base 64)
            cropImage().then(() =>{
                console.log("dataImageUrls: ", dataImageUrls)
                // upload edited image -> get url of edited image
                uploadImage("dataURL", dataImageUrls, finalImageUrls).then(() =>{
                    // replaced url if edited at index
                    for(let i = 0; i < editedUrlIndex.length; i++){
                        downloadUrls[editedUrlIndex[i]] = (finalImageUrls[i]);
                    }
                    productThumbnail = downloadUrls[0]
                    // -> delete original image if edited
                    deleteFile(
                        `gallery/${auth.currentUser.uid}/${itemID}`,
                        editedImageNameArray
                    )
                }).then(() =>{
                    dispatch(
                        addProductStart({        
                            productCategory,
                            productName,
                            productThumbnail,
                            productPrice,
                            productDescription,
                            downloadUrls            // product images
                        })
                    );
                }).then(() =>{
                    resetForm();
                })
            })
        })
    };

    const nextClick = () => {
        setImageIndex(imageIndex == objectUrls.length - 1 ? imageIndex : imageIndex + 1)
        console.log(imageIndex);
    }
    const prevClick = () => {
        setImageIndex(imageIndex == 0 ? imageIndex : imageIndex - 1)
        console.log(imageIndex);
    }
    useEffect(() => {
        if (!selectedFiles || selectedFiles.size === 0) {
            return
        }
        setObjectUrls([]);
        // setUploadCroppedArea([]);
        // setUploadRotateSize([]);
        for(let i = 0 ; i < selectedFiles.length; i++){
            const objectUrl = URL.createObjectURL(selectedFiles[i]);
            setObjectUrls((prevState) => [...prevState, objectUrl]);
            uploadCroppedArea.push({});
            uploadRotateSize.push({});
        }
        setImageIndex(0);
        // free memory when ever this component is unmounted
        // return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFiles])
    
    const handleAddButton = () =>{
        document.getElementById('selectFileB').click()
    }

    // this is for add button
    const onSelectFiles = e => {
        console.log("onSelectFiles", e.target.files);
        e.preventDefault();

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFiles([])
            return
        }
        for(let i = 0; i < e.target.files.length; i++){
            selectedFiles.push(e.target.files[i]);
            const objectUrl = URL.createObjectURL(e.target.files[i]);
            setObjectUrls((prevState) => [...prevState, objectUrl]);
        }

        e.target.value = null
    }
    
    // main problem:
    // once the file is edited, there's no way to re-edit the original file unless user starts over. 
    // preview can be edited twice but not the file

    // (editing more than once uploads the wrong edit )
    // preview can be edited twice but not the file
    // (uploadRotation & uploadCroppedArea & imageSrc) are updated from button call

    // we want edit data not to be reset
    return (
        <Modal {...configModal}>

                    <div className={!selectedFiles || selectedFiles.length === 0 ? 'UploadImage' : 'hidden'}>
                        <div className='inner-wrapper'>
                            <TbShirt size={126}/>
                            {/* upload button */}
                            <Upload 
                                setSelectedFiles={setSelectedFiles} 
                                selectedFiles={selectedFiles}
                                downloadUrls={downloadUrls}
                                setDownloadUrls={setDownloadUrls}
                            />
                        </div>
                        <Button className= "btn btn-cancel" onClick={() => toggleModal()}>
                            <IoCloseOutline size={28}/>
                        </Button>
                    </div>

                    <div className= {(selectedFiles && selectedFiles.length > 0) && !finishEditing ? 'editImage' : 'hidden'}>
                        <div className='modal-header'>
                            <Button className= "btn btn-cancel" onClick={() => resetModalState()}>
                                Back
                            </Button>
                            {/* <div>
                                Edit
                            </div> */}
                            <Button className= "btn btn-next" onClick={() => setFinishEditing(true)}>
                                Next
                            </Button>
                            
                        </div> 

                        <div className={selectedFiles && selectedFiles.length > 0 ? 'ImagePreview' : 'hidden'}>
                            {/* <div className='image-number'>{imageIndex+1}/{objectUrls.length}</div> */}
                            <div className="dot-wrap">
                                <div className='dot-inner-wrap'>
                                {objectUrls.map((key, index) =>{
                                    if(objectUrls.length > 1){
                                        return(
                                            <div key ={index} className={index === imageIndex ? "image-dot active" : "image-dot"}>
                                            </div>   
                                        )
                                    }

                                })}
                                </div>
                            </div>
                            {imageIndex !== 0 &&
                            <Button className= "btn btn-image-control-prev" onClick={() => prevClick()}>
                                <IoIosArrowBack />
                            </Button>
                            }
                            {imageIndex !== selectedFiles.length - 1 &&
                            <Button className= "btn btn-image-control-next" onClick={() => nextClick()}>
                                <IoIosArrowForward />
                            </Button>
                            }
                            
                            <Button className= "btn btn-image-control-zoom"  onClick={() => setOpenCrop(!openCrop)}>
                                <TbArrowsDiagonal />
                            </Button>

                            <Button className= {showImageDetail ? "btn btn-image-control-detail active-button" : "btn btn-image-control-detail"} onClick={() => setShowImageDetail(!showImageDetail)}>
                                <IoImagesOutline color={showImageDetail ? "black" : ""}/>
                            </Button>

                            <div className={showImageDetail ? "image-detail-wrap image-detail-active" : "image-detail-wrap"}>
                            {objectUrls.map((key, index) =>{
                                    return(
                                        <div className='image-detail-image-wrap'>
                                            <img src={key} className='image-detail-image' onClick={() => setImageIndex(index)}/>
                                        </div>
                                    )
                                })}
                                        <div className='image-detail-image-wrap add-button' onClick={() => handleAddButton()}>
                                            <BsPlusCircle color="white" size={42}/>
                                            <input type='file' id="selectFileB" multiple onChange={e => onSelectFiles(e)} onBlur={e => onSelectFiles(e)}/>
                                        </div>
                            </div>


                            {(selectedFiles && selectedFiles.length > 0) &&  
                                (openCrop) ? 
                                <Crop 
                                    imageSource={objectUrls[imageIndex]} 
                                    setOpenCrop={setOpenCrop}
                                    setPhotoURL={setCroppedPhotoURL}
                                    uploadRotateSize={uploadRotateSize}
                                    uploadCroppedArea={uploadCroppedArea}
                                    index={imageIndex}
                                />
                                : <img src={objectUrls[imageIndex]} className={"image-preview-main"}/> 
                            }
                        </div>
                    </div>

                    <div className= {selectedFiles && finishEditing ? 'addNewProductForm' : 'hidden'}>
                        <form onSubmit={handleSubmit}>
                            <h2>List an item</h2>

                            <FormSelect className="form-select-category"
                                label="Category"
                                options={[{
                                    value: "mens",
                                    name: "Mens"
                                }, {
                                    value: "womens",
                                    name: "Womens"
                                }]}
                                handleChange={e => setProductCategory(e.target.value)}
                                required
                            />

                            <FormInput
                                label= "Item Name"
                                type= "text"
                                value= {productName}
                                handleChange= {e => setProductName(e.target.value)}
                                required
                            />

                            <FormInput
                                label= "Price"
                                type= "number"
                                min= "0.00"
                                max= "99999.99"
                                step= "0.01"
                                // trim two place after decimal if input has more
                                // add .00 if input is [dd]
                                // add 00 if input is [dd.]
                                // ad 0d if input is [dd.d]
                                // only allow nubmer and . input
                                value= {productPrice}
                                handleChange= {e => setProductPrice(e.target.value)}
                                onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                                required
                            />

                            <TextInput
                                label= "Description"
                                type= "text"
                                maxChar = "1000"
                                placeholder = "Tell us about your item!"
                                value= {productDescription}
                                handleChange= {e => setProductDescription(e.target.value)}
                                required
                            />

                            <Button className={isLoading ? "btn btn-submit isLoading" : "btn btn-submit"} 
                            type="submit" disabled={isLoading} isLoading={isLoading}>
                                Post
                            </Button>
                            <Button className= "btn btn-cancel" onClick={() => toggleModal(true)}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                </Modal>
    )
}

export default AddNewProduct;