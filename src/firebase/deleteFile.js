import { deleteObject, ref } from "firebase/storage";

import { storage } from '../firebase/utils';

const deleteFile = (subFolder, editedImageNameArray) => {
  // return new Promise((resolve, reject) => {
    for(let i = 0 ; i < editedImageNameArray.length; i++){
      const desertRef = ref(storage, (subFolder + '/' + editedImageNameArray[i]));

      deleteObject(desertRef).then(() => {
        console.log("deleted: ", editedImageNameArray[i])
      }).catch((error) => {
        console.log(error);
      });
    }
    
  // });
};

export default deleteFile;