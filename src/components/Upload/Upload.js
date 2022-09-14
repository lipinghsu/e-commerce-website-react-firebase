import Form from './Form';
import ProgressList from './ProgressList/ProgressList';
import Button from '../../components/forms/Button';

const Upload = ({selectedFiles, setSelectedFiles, downloadUrls, setDownloadUrls}) => {
    
    const onSelectFiles = e => {
        console.log("onSelectFiles", e.target.files);
        e.preventDefault();

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFiles([])
            return
        }
        setSelectedFiles([...e.target.files]);
        e.target.value = null
        
    }

    const handleClick = () => {
        document.getElementById('selectFile').click()
    }
    return (
        
        <div>
            {/* <Form setFiles={setSelectedFile} /> */}
            
            <input type='file' id="selectFile" multiple onChange={e => onSelectFiles(e)} onBlur={e => onSelectFiles(e)}/>
            <Button onClick={() => handleClick()}>
                Upload a file
            </Button>
            {/* <ProgressList 
                selectedFiles={selectedFiles} 
                itemID={itemID} 
                downloadUrls={downloadUrls}
                setDownloadUrls={setDownloadUrls} 
            /> */}
        </div>
    );
};

export default Upload;