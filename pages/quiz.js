import { Grid, GridItem } from "@chakra-ui/react";
import React,{useContext} from "react";
import Leaderboard from "../components/Leaderboard";
import Rules from "../components/Rules";
import Scoring from "../components/Scoring";
import AppContext from "../context/App";
import { withApollo } from "../lib/apollo";
import withAuth from "../lib/user";

const Quiz = () => {
    const {user}=useContext(AppContext)
    console.log("User is",user)
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} px={6}>
      <GridItem  bg="blue.500">
        {!user["is_super_admin"]?<Rules />:<Scoring/>}
      </GridItem>
      <GridItem  bg="blue.500">
        <Leaderboard />
      </GridItem>
    </Grid>
  );
};

export default withApollo({ ssr: true })(withAuth(Quiz));
