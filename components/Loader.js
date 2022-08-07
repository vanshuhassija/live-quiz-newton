import { Flex, Spinner } from '@chakra-ui/core';
import React from 'react';

const Loader = () => {
    return (
        <Flex alignItems="center" justifyContent="center" height="100vh" width="100%">
         <Spinner color="buttonText" size="lg"/>
        </Flex>
    );
};

export default Loader;