export const createImage = (url) =>{
    return (new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    }))
}

export function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation, uploadRotation, index) {
    const rotRad = getRadianAngle(rotation)
    const rotSize = {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
    uploadRotation[index] = rotation;
    return rotSize;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
    imageSrc, 
    pixelCrop, 
    rotation = 0, 
    flip = { horizontal: false, vertical: false },
    uploadRotation, uploadCroppedArea, index, isBlob) {
    if(Object.keys(pixelCrop).length === 0  && rotation === 0){
        return;
    }
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');    
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    const rotRad = getRadianAngle(rotation)

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation,
        uploadRotation,
        index
    )

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)

    // draw rotated image
    ctx.drawImage(image, 0, 0)

    console.log(pixelCrop);
    if(Object.keys(pixelCrop).length !== 0 ){
        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        )
        uploadCroppedArea[index] = pixelCrop;
        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0)
    }
    
    // As Base64 string
    if(!isBlob){

        var imagee = canvas.toDataURL("image/png");
        // console.log(imagee);
        return new Promise((resolve, reject) => {
            resolve({file: null, url: imagee})
        })
    }

    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            file.name = "cropped.jpeg"
        resolve({file: file, url: URL.createObjectURL(file)})
        }, 'image/jpeg')
    })
}
