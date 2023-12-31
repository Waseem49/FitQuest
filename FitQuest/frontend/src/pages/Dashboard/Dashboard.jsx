// import React from 'react';
import cycling from "./Images/cycling.jpg";
import heart from "./Images/healthy-heart.png"
import star from "./Images/star.png";
import doctor from "./Images/stethoscope.png";
import workouts from "./Images/workout.png"
import './Dashboard.css';

import { Button, Center, Grid, GridItem, Image, Text,Stack } from '@chakra-ui/react'

import { Box } from '@chakra-ui/react'
import DashboardCard from "./DashboardCard";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const Dashboard = () => {

  const [workout, setWorkout] = useState([]);
  const [completedData,setCompletedData] = useState([]);
  const [flag,setFlag]=useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    fetch("https://fitquestbackend.onrender.com/workout/dashboard",{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }).then((res)=>{
      return res.json()
    }).then((res)=>{
      console.log(res)
      let proData=res.workout.filter((el)=>{
        return el.isCompleted==false;
      })
      let completeData = res.workout.filter((el)=>{
        return el.isCompleted==true;
      })
      setCompletedData(completeData)
      setWorkout(proData)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)

    })
  }, [flag])

  const handleFlag=()=>{
    setFlag(!flag)
  }
  const handleClick = ()=>{
    navigate("/workout")
  }

  // if (loading) {
  //   return (
      
  //   )
  // }


  return (
    <div className="dashboard">
      <div style={{ height: "100vh" }}>
        <img src={cycling} alt="" className="background-image" />
      </div>
      <div className="image-overlay">
        <Text className="text-over-image">Discover the power within you to overcome challenges, embrace victories, and inspire others through your athletic journey</Text>
        <Button className="join-now" colorScheme='orange' variant='outline'>
          Join Now
        </Button>
      </div>

      {workout.length===0 && completedData.length===0 && <Box> <Text color={"purple.900"} textAlign={"center"} marginTop={"-50px"} fontSize='4xl'>Please Start your Journey!</Text>
      <Center>
      <Button onClick={handleClick} m={"auto"} colorScheme='purple' variant='outline'>Start</Button>
      </Center>
      </Box>}
      <Box w={"80%"} m={"auto"} mt={"50px"}>
        {loading?
        <Stack m={"auto"}>
        <Skeleton startColor='green.500' endColor='orange.500' height='100px' borderRadius={"20px"} />
        <br />
        <Skeleton startColor='green.500' endColor='orange.500' height='100px' borderRadius={"20px"} />
        <br />
      </Stack>
        :
        workout?.map((el) => {
          return (<DashboardCard key={el._id} el={el} handleFlag={handleFlag} />)
        })
        
        }
      </Box>
      <Box w={"80%"} m={"auto"} mt={"50px"}>
        {loading?
        <Stack m={"auto"}>
        <Skeleton startColor='green.500' endColor='orange.500' height='100px' borderRadius={"20px"} />
        <br />
        <Skeleton startColor='green.500' endColor='orange.500' height='100px' borderRadius={"20px"} />
        <br />
      </Stack>
        :
        completedData?.map((el) => {
          return (<DashboardCard key={el._id} el={el} handleFlag={handleFlag} />)
        })}
      </Box>
      <Box>
        <Text style={{ marginTop: "50px",textAlign:"center" }} color={"GrayText"} fontSize='4xl'>How Does FitQuest Help Me?</Text>
        <Text style={{ marginTop: "20px",textAlign:"center" }} color={"GrayText"}>
          GET YOUR VERY OWN PERSONAL TRAINER THAT PROVIDES EVERYTHING YOU NEED TO GET IN THE BEST SHAPE OF YOUR LIFE.
        </Text>
      </Box>
      <Grid templateColumns='repeat(2, 1fr)' w={"60%"} style={{ margin: "auto", textAlign: "center" }} gap={6}>
        <GridItem style={{ borderRadius: "10px" }} fontSize='2xl' w='100%' h='auto' p={5} bg='gray.100' >
          <Box style={{display:"flex"}}>
            <Box w={"40px"} style={{borderRadius:"50%",backgroundColor:"rgb(252,91,70)"}}>
              <Image m={"auto"} marginTop={"8px"} w={"25px"} src={doctor} alt="png" />
            </Box>
            <Text fontSize='lg' margin={"10px"}>FITNESS ASSESSMENT</Text>
          </Box>
          <Text>Your expert coach will take you through an assessment in order to create your personal plan for success. Whether you're a beginner or an experienced athlete, we have a coach for you.</Text>
        </GridItem>
        <GridItem style={{ borderRadius: "10px" }} fontSize='2xl' w='100%' h='auto' p={5} bg='gray.100' >
          <Box style={{display:"flex"}}>
            <Box w={"40px"} style={{borderRadius:"50%",backgroundColor:"rgb(45,177,116)"}}>
              <Image m={"auto"} marginTop={"8px"} w={"25px"} src={heart} alt="png" />
            </Box>
            <Text fontSize='lg' margin={"10px"}>NUTRITIONAL SUCCESS</Text>
          </Box>
          <Text>You'll get a personalized nutrition plan built specifically for your needs. No more guesswork, no more stress. You'll learn how to eat on your own terms while establishing healthy habits.</Text>
        </GridItem>
        <GridItem style={{ borderRadius: "10px" }} fontSize='2xl' w='100%' p={5} h='auto' bg='gray.100' >
          <Box style={{display:"flex"}}>
            <Box w={"40px"} style={{borderRadius:"50%",backgroundColor:"rgb(0,121,255)"}}>
              <Image m={"auto"} marginTop={"8px"} w={"25px"} src={workouts} alt="png" />
            </Box>
            <Text fontSize='lg' margin={"10px"} >WORKOUTS</Text>
          </Box>
          <Text>We build the workouts for you, you follow them and get results. The Fitocracy mobile app will take you through each expert-built workout, set by set.</Text>
        </GridItem>
        <GridItem style={{ borderRadius: "10px" }} fontSize='2xl' w='100%' p={5} h='auto' bg='gray.100' >
          <Box style={{display:"flex"}} >
            <Box w={"40px"} style={{borderRadius:"50%",backgroundColor:"rgb(255,152,50)"}}  >
              <Image m={"auto"} marginTop={"8px"} w={"25px"} src={star} alt="png" />
            </Box>
            <Text fontSize='md' margin={"10px"}>MOTIVATION & ACCOUNTABILITY</Text>
          </Box>
          <Text>Your coach works with you on a daily basis to keep you motivated and on track. They're your secret weapon to hit any goal, no matter what it is.</Text>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Dashboard;
