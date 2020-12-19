import {InputGroup, FormControl, Button} from 'react-bootstrap'
import styled from 'styled-components'


const ImageInput = ({imageUrl, setImageUrl, detectFaces, setFaceBox, getColors, croppImage}) => {
   
    return (
        <Container>
            <StyledInputGroup size="lg" >
                <StyledFormControl
                    placeholder="Enter Image`s URL"
                    aria-label="Image`s URL"
                    aria-describedby="basic-addon2"
                    onChange={(e)=>{
                        setFaceBox(null)
                        setImageUrl(`${e.target.value}`)
                    }}
                    accept="image"
                />
                <StyledInputGroupAppend>
                    <StyledButton id="basic-addon2" onClick={detectFaces}>Face Detector</StyledButton>
                    <StyledButton id="basic-addon2" onClick={getColors}>Color Scheme</StyledButton>               
                    <StyledButton id="basic-addon2" onClick={croppImage}>Image Cropper</StyledButton>
                </StyledInputGroupAppend>
            </StyledInputGroup>  
        </Container>
    )
}

export default ImageInput


const Container = styled.div`
    margin-top:50px;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const StyledFormControl = styled(FormControl)`
    width:75%;
    height:40px; 
    font-size:1.1rem;
    border-radius:4px;
    @media (max-width: 768px) {
        height:30px; 
        font-size:1rem;   
    }
    @media (max-width: 568px) {
        height:20px; 
        font-size:0.8rem;  
    }
`

const StyledInputGroup=styled(InputGroup)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:90%;
    color:red;
`
const StyledInputGroupAppend=styled(InputGroup.Append)`
    display:flex;
    justify-content:center;
`

const StyledButton = styled(Button)`
    width:32%;
    height:60px;
    margin:40px 1%;
    background-color:#F44006;
    color:#fff;
    font-size:18px;
    font-wight:bold;
    border-radius:4px;
    @media (max-width: 768px) {
        height:45px;   
        font-size:14px;
    }
    @media (max-width: 568px) {
        height:30px;   
        font-size:10px; 
    }
`