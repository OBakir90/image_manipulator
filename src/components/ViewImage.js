import React, {useState, useEffect, useRef} from 'react'
import {Image} from 'react-bootstrap'
import styled from 'styled-components'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.min.css";
import GetWidth from './GetWidth'

const ViewImage = ({imageUrl, faceBox, colors, selected}) => {
    const [imgDim, setImgDim] = useState(null)
    const [frames, setFrames] = useState([])
    const [croppedImage, setCroppedImage] = useState(null)
    const uploadedImage = useRef(null)
  
    const screenWidth = GetWidth();
    console.log({screenWidth})

    const onCrop = () => {
        const imageElement = uploadedImage.current;
        const cropper = imageElement.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL())
    };
 

    useEffect(()=>{
        let boxes=[]
        console.log('facebox', faceBox)
        faceBox&&faceBox.map((face, index)=>{
            boxes.push({top:face.top_row*imgDim.height,
            left:face.left_col*imgDim.width,
            width:face.right_col*imgDim.width-face.left_col*imgDim.width,        
            height:face.bottom_row*imgDim.height-face.top_row*imgDim.height
            })
        })
        setFrames(boxes)
    },[imgDim, faceBox] )


    const getImgDimensions = ({target:Image})=>{
        console.log('image', Image, Image.clientWidth, Image.width, Image.clientHeight, Image.height)
        setImgDim({
            width:Number(Image.width),
            height:Number(Image.height)
        }) 
    }
    return (
        <Container>
            {!selected&&imageUrl&&<BasicImg src={imageUrl} alt='unselected'/>}
            {selected==='face'&&imageUrl&&<><img id='up_img' ref={uploadedImage} src={imageUrl} onLoad={getImgDimensions} alt='myimage' width='80%' height='auto'/>   
                {frames&&frames.map(frame=><FaceBox style={frame?{top:frame.top, left:frame.left, width:frame.width, height:frame.height}:null}/>)}</>        
            }
            {selected==='cropp'&&imageUrl&&<>
                <StyledCropper
                    src={imageUrl} 
                    guides={false}
                    crop={onCrop}
                    ref={uploadedImage}
                    alt='myimage'
                    style={{width:screenWidth*0.5, height:'auto'}}
                />
                <CroppedImg src={croppedImage} alt="Cropped_Image" style={{width:screenWidth*0.5}}/>
            </>
            }
            {selected==='colors'&&imageUrl&&<>
                <img src={imageUrl} alt='unselected' style={{width: '80%', height:'auto'}}/>
                {colors&&<ColorsCont>
                            {colors.map((color,i)=>{
                                return  (
                                    <ColorCont>
                                        <ColorBox key={i} style={{backgroundColor:color.w3c.hex}}/>
                                        <ColorName>{color.w3c.name}</ColorName>
                                    </ColorCont>
                                )
                                })
                            }
                        </ColorsCont>
                }                  
            </>
            }
        </Container>
    )
}

export default ViewImage

const Container =styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
`

const StyledCropper=styled(Cropper)`
    width:500px;
    height:auto;
    @media (max-width: 768px) {
        width:300px; 
        height:200px;
    }
    @media (max-width: 568px) {
        width:230px; 
        height:120px;
    }
    
`

const FaceBox = styled.div`
    position: absolute;
    box-shadow: 0 0 0 3px red inset;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
`

const CroppedImg = styled.img`
    height:360px;
    border:2px solid #f1f1f1;
    @media (max-width: 768px) {
        height:240px;
    }
    @media (max-width: 568px) {
        height:180px;
    }
    
`

const ColorsCont = styled.div`
    display:flex;
    width:80%;
    justify-content:center;
    flex-wrap:wrap;
`

const BasicImg = styled.img`
    width:80%;
    height:auto;
`

const ColorCont=styled.div`
    display:flex; 
    flex-direction:column; 
    align-items:center;
`

const ColorBox=styled.div`
    display:flex; 
    width:40px; 
    height:30px;
    margin:8px;
    @media (max-width: 768px) {
        width:25px; 
        height:15px;
    }
    @media (max-width: 568px) {
        width:14px; 
        height:8px;
    }
`

const ColorName = styled.div`
    font-size:10px;
    @media (max-width: 768px) {
        font-size:8px;
    }
    @media (max-width: 568px) {
        font-size:6px;
    }
`