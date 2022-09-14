import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import { storage } from '../firebase/utils';

import React from 'react';


const uploadFileWithProgress = (file, subFolder, imageName, setProgress, fileType) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, (subFolder + '/' + imageName));

        if(fileType === "file" ){
            const upload = uploadBytesResumable(storageRef, file);
            upload.on('state_changed',
                (snapshot) => {
                    const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);

                },(error) => {
                    reject(error);

                },async () => {
                    try {
                        const url = await getDownloadURL(storageRef);
                        // setDownloadUrls((prevState) => [...prevState, url]);
                        resolve(url);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        }
        else if(fileType === "dataURL" ){
            const uploadTask = 
            uploadString(storageRef, file, 'data_url').then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    console.log("dataURL download URL: ", url);
                    resolve(url);
                })
            },(error) => {
                reject(error);
            },async () => {
                try {
                    console.log("upload - dataURL - tryBlock");
                    const url = await getDownloadURL(storageRef);
                    // setDownloadUrls((prevState) => [...prevState, url]);
                    console.log(url);
                    resolve(url);
                } catch (error) {
                    
                    reject(error);
                }
            }
        );
        //     const uploadTask = storageRef.putString(dataUrl, 'data_url');
        
        //     uploadTask.on('state_changed', snapshot => {
        //         setTransferred(
        //         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        //         );
        //     });
            
        //     try {
        //         await uploadTask;
                
        //         setUploading(false);
        //         Alert.alert(
        //         'Photo uploaded!',
        //         'Your photo has been uploaded to Firebase Cloud Storage!'
        //         );
        //     } catch (err) {
        //         // TODO: Check value of `err.code` and handle appropriately.
        //         console.error('Upload failed: ', err);
        //         Alert.alert(
        //         'Photo upload failed!',
        //         'Your photo didn\'t upload properly!'
        //         );
        //     }
        }
    });
};

export default uploadFileWithProgress;