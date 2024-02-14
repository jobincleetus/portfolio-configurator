import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import imgPlaceHolder from '../../assets/imgs/placeholder.png'

const ImageUploader = ({handleFile, classNames, defaultImg}) => {
    const hiddenFileInput = useRef(null);
  
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const [image, setImage] = useState(null)

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            const { size, type } = fileUploaded
            var pattern = /image-*/;

            if(size > 2097152) {
                return alert('Image size too big');
            }
        
            if (!type.match(pattern)) {
                return alert('Invalid format');
            }

            setImage(null);

            const imgUrl = URL.createObjectURL(fileUploaded)
            setImage(imgUrl);
            handleFile(imgUrl);
        }
    };

    useEffect(() => {
        if(defaultImg) {
            setImage(defaultImg)
        }
    }, [defaultImg])
  return (
    <button onClick={handleClick}>
        <img src={image ? image : imgPlaceHolder} className={`${classNames ? classNames : 'w-7 h-7 rounded-md'} object-cover overflow-hidden`} />
        <input type="file" id="myfile" accept="image/*" onChange={handleChange} ref={hiddenFileInput} hidden />
    </button>
  )
}

export default ImageUploader
