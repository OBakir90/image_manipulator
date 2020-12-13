import React, {useState, useEffect} from 'react'
import ImageInput from './components/ImageInput'
import ViewImage from './components/ViewImage'
import styled from 'styled-components'
import Clarifai from 'clarifai';

import left from './images/aaron-burden-Bycd2wF5vQU-unsplash.jpg'
import right from './images/syd-sujuaan-2OowobmZRFE-unsplash.jpg'
import color from './images/colors.PNG'
import crop from './images/crop.PNG'
import faces from './images/faces.PNG'


const App=()=>{
  const [imageUrl, setImageUrl] = useState(null)  
  const [selected, setSelected] = useState(null)
  const [faceBox, setFaceBox] = useState(null)
  const [colors, setColors] = useState(null)

  const app = new Clarifai.App({
    apiKey: 'fe053916ea194ebfa8e447fad43a70ec'
  });

  const detectFaces = ()=>{
    setSelected('face')
    imageUrl?app.workflow.predict('12345', imageUrl).then(
        (response)=>{
          setFaceBox(response.results[0].outputs[2].data.regions.map(p=>p.region_info.bounding_box))
        },
    ).catch(
      console.log('error')
    ) : console.log('Please enter a url')  
  }

  const croppImage = ()=>{
    setSelected('cropp')
  }

  const getColors = ()=>{
    setSelected('colors')
    imageUrl?app.workflow.predict('1234567', imageUrl).then(
      (response)=>{
        setColors(response.results[0].outputs[0].data.colors)
        console.log('colors', response.results[0].outputs[0].data.colors)
      },
    ).catch(
      console.log('error')
    ) : console.log('Please enter a url')  
  }

  return (
    <Screen className="App">
      <Left>
        <Img src={color} alt=''/>
        <Img src={faces} alt=''/>
        <Img src={crop} alt=''/> 
      </Left>
      <Container>
        <Header>
          <span style={{color:''}}></span>
                <span style={{color:'red'}}>I</span>
                <span style={{color:'yellow'}}>m</span>
                <span style={{color:'orange'}}>a</span>
                <span style={{color:'blue'}}>g</span>
                <span style={{color:'green'}}>e</span> 
                <span> </span>
                <span style={{color:'black'}}>M</span>
                <span style={{color:'red'}}>a</span>
                <span style={{color:'violet'}}>n</span>
                <span style={{color:'green'}}>i</span>
                <span style={{color:'brown'}}>p</span>
                <span style={{color:'turquoise'}}>u</span>
                <span style={{color:'yellow'}}>l</span>
                <span style={{color:'orange'}}>a</span>
                <span style={{color:'blue'}}>t</span>
                <span style={{color:'black'}}>o</span>
                <span style={{color:'red'}}>r</span>
               </Header>
        <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} setFaceBox={setFaceBox} detectFaces={detectFaces} croppImage={croppImage} getColors={getColors}/>
        <ViewImage imageUrl={imageUrl} faceBox={faceBox} selected={selected} colors={colors}/>
      </Container>
      <Right>
        <Img src={crop} alt=''/> 
        <Img src={color} alt=''/>
        <Img src={faces} alt=''/>
      </Right>
    </Screen>
  );
}

export default App;


const Screen = styled.div`
  width:100%;
  min-height:100vh;
  justify-content:center;
  background-color:#f1f1f1;
  display:flex;

`

const Container=styled.div`
  display:flex;
  flex-direction:column;
  width:60%;
  align-items:center;
`
const Header =styled.div`
  font-size:90px;
  font-weight:900;
  font-family:East Sea Dokdo;
  @media (max-width: 768px) {
    font-size:66px;
  }
  @media (max-width: 568px) {
    font-size:36px; 
  }

`
const Img=styled.img`
  width:90%;
  margin:35px 5%;
`

const Left=styled.div`
  width:20%;
  background-image: url(${left});
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const Right=styled.div`
  width:20%;  
  background-image: url(${right});
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`