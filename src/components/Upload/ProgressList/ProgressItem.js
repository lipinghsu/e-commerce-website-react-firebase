

import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 } from 'uuid';
import uploadFileWithProgress from '../../../firebase/uploadFileWithProgress';
import addDocument from '../../../firebase/addDocument';
import { auth } from '../../../firebase/utils';

const ProgressItem = ({ file, itemID, downloadUrls, setDownloadUrls }) => {
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState(null);

    // const itemID = v4();     
    // itemID: [image, duplicate] for each image
    // each image and its duplicate will have the same itemID      
    // itemID created -> this useEffect hook ran twice.
    
    // !!!!!!
    // duplicated image will have the same imageName but replaced. (still uploaded twice)
    const imageName = v4() + '.' + file.name.split('.').pop();
    
    useEffect(() => {
        console.log("ProgressItem - useEffect", imageName)
        const uploadImage = async () => {
            // duplicated image will have a differnet imageName (this is where it should be if it works correctly)
            // const imageName = v4() + '.' + file.name.split('.').pop();  
            try {
                const url = await uploadFileWithProgress(
                    file,
                    `gallery/${auth.currentUser.uid}/${itemID}`,
                    imageName,
                    setProgress,
                    downloadUrls,
                    setDownloadUrls
                );

                // const galleryDoc = {
                //     imageURL: url,
                //     uid: auth.currentUser.uid,
                //     uEmail: 'test@test.com',
                //     // uName: 'John',
                //     // uPhoto: '',
                // };

                // await addDocument('gallery', galleryDoc, imageName);
                setImageURL(null);  // remove ImageListItem when after it reaches 100% and upload
                console.log(url);
            } catch (error) {
                alert(error.message);
                console.log(error);
            }
        };
        setImageURL(URL.createObjectURL(file)); 
        uploadImage().then(() =>{
            console.log("image uploaded.", file.name)
        });
        
    }, [file]);

    // return (
    //     imageURL && (
    //     <ImageListItem cols={1} rows={1}>
    //         <img src={imageURL} alt="images gallery" loading="lazy" />
    //         <Box sx={backDrop}>
    //         {progress < 100 ? (
    //             <CircularProgressWithLabel value={progress} />
    //         ) : (
    //             <CheckCircleOutline
    //             sx={{ width: 60, height: 60, color: 'lightgreen' }}
    //             />
    //         )}
    //         </Box>
    //     </ImageListItem>
    //     )
    // );
};

export default ProgressItem;

const backDrop = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,.5)',
};