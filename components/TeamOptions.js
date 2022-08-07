import { Button, Heading, Stack, Text } from "@chakra-ui/core";
import Router  from "next/router";
import React,{useContext,useEffect} from "react";
import { MdPlayCircleOutline } from "react-icons/md";
import AppContext from "../context/App";
import withAuth from "../lib/user";

function TeamOptions({setSelectedOption}) {
  const {user}=useContext(AppContext);

  useEffect(()=>{
    if(user){
      console.log("User is",user)
      if(user.team&&user["is_admin"]){
        Router.push(`/team/${user?.team?.id}`)
      }
      else if(user.team&&!user["is_admin"]){
        Router.push("/get-ready")
      }
    }
  },[user])
  return (
    <Stack>
      <Heading color="headline">Create/ Join a team</Heading>
      <Text color="paragraph">
        If you create a team, you will become an admin automatically. Consider
        joining an existing team if you do not want to become an admin but still
        want to be a part of team.
      </Text>
      <Button
        color="buttonText"
        loadingText="Creating"
        border="1px"
        variantColor="primary"
        type="submit"
        cursor="pointer"
        onClick={()=>setSelectedOption("create")}
      >
        Create a new team
      </Button>
      <Button
        color=""
        loadingText="Creating"
        border="1px"
        variantColor="background"
        type="submit"
        cursor="pointer"
        onClick={()=>setSelectedOption("join")}
      >
        Join an existing Team
      </Button>
    </Stack>
  );
}

export default withAuth(TeamOptions);
