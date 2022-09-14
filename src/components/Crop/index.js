import { useState } from "react";
import Cropper from "react-easy-crop";
import { Box, Button, DialogActions, DialogContent, Slider, Typography} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import CropIcon from '@mui/icons-material/Crop';
import getCroppedImg from "./CropImage";
import { makeStyles } from '@material-ui/core/styles';
import "./styles.scss";

const useStyles = makeStyles({
    sliderColor: {
        color: 'white'
    },
    track: {
        height: 2,
        borderRadius: 1,
    },
});

const CROP_AREA_ASPECT = 1 / 1;

export default function Crop({ 
    imageSource, 
    setOpenCrop, 
    setPhotoURL,
    uploadRotateSize,
    uploadCroppedArea,
    index}) {

    const classes = useStyles()

    // these will reset every time open crop closes
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    
    const [rotation, setRotation] = useState(0);
    const [croppedArea, setCroppedArea] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    
    const zoomPercent = (value) => {
        return `${Math.round(value * 100)}%`;
    };

    const cropImage = async () => {
        try {
            const { file, url } = await getCroppedImg(
                imageSource,
                croppedAreaPixels,
                rotation,
                { horizontal: false, vertical: false },
                uploadRotateSize,
                uploadCroppedArea,
                index,
                true
            );

            setPhotoURL(imageSource, url);  //replace old objectUrl blob
            setOpenCrop(false);
        } catch (error) {
            console.log(error);
        }
    };

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }


    return (
        <div>
        {/* <DialogContent dividers sx={{
            backgroun: "#333",
            position:"relative",
            height: 400,
            width: "auto",
            minWidth: {sm:500},
        }}> */}
            <Cropper
                image= {imageSource}
                aspect={CROP_AREA_ASPECT} 
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                objectFit="vertical-cover"
                onCropAreaChange={(croppedArea) => {
                    setCroppedArea(croppedArea);
                }}
                onCropComplete={cropComplete}
            />
        {/* </DialogContent> */}
            <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }} className="dialog-actions">
                <Box sx={{ width: '100%', mb: 1 }} className="outer-box">
                
                    <Box className="inner-box-zoom">
                        <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                        <Slider
                        valueLabelDisplay="auto"
                        valueLabelFormat={zoomPercent}
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={(e, zoom) => setZoom(zoom)}
                        className={`${classes.sliderColor} ${classes.track}`}
                        />
                    </Box>
                    <Box className="inner-box-rotation">
                        <Typography>Rotation: {rotation + '°'}</Typography>
                        <Slider
                        valueLabelDisplay="auto"
                        min={0}
                        max={360}
                        step={1}
                        value={rotation}
                        onChange={(e, rotation) => setRotation(rotation)}
                        className={`${classes.sliderColor} ${classes.track}`}
                        />
                    </Box>
                    
                </Box>
                <Box sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                }}>
                    <Button variant="contained" startIcon={<Cancel />} onClick={() => setOpenCrop(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained" startIcon={<CropIcon />} onClick={cropImage}>
                        Crop
                    </Button>
                </Box>
            </DialogActions>
            
        </div>
    );
}