import { ImageList } from '@mui/material';
import React from 'react';
import ProgressItem from './ProgressItem';
import {useEffect} from 'react';
let count = 0;
const ProgressList = ({ selectedFiles, itemID, downloadUrls, setDownloadUrls }) => {
  
  useEffect(() => {
    count++;
  }, [selectedFiles])
  
  if (!selectedFiles || selectedFiles.length === 0) {
    return;
  }

  return (
    
    <ImageList rowHeight={200} cols={4}>
      {console.log(count++)}
      {selectedFiles.map((file, index) => (
        
        <ProgressItem 
          file={file} 
          key={index} 
          itemID={itemID} 
          downloadUrls={downloadUrls}
          setDownloadUrls={setDownloadUrls}
        />
      ))}
    </ImageList>
  );
};

export default ProgressList;