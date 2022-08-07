import React from "react";
import { Box } from "@chakra-ui/core";
import Particles from "react-tsparticles";
import User from "./User";
import { withApollo } from "../lib/apollo";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const PageContainer = ({ children }) => {
 
  return (
    <Box bg="background" w="100vw" h="100vh">
      <Box zIndex={1}>
      <Toaster />
       {children}
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(PageContainer);;
