import React from "react";
import { Flex, Image } from "@chakra-ui/react";

const Logo = ({}) => {
  return (
    <Flex alignItems="center" margin="auto">
      <Image width="50px" src="Logo.png"  alt="Logo" />
      <Image
      ml={10}
      mt={10}
        height="60px"
        width="auto"
        src="Title.png"
        alt="Title"
      />
    </Flex>
  );
};

export default Logo;
