import { Flex, Text } from '@chakra-ui/core';
import { Box } from '@chakra-ui/react';
import React,{useContext} from 'react';
import { MdPerson } from 'react-icons/md';
import AppContext from '../context/App';

const Navbar = () => {
    const {user}=useContext(AppContext)
    return (
        <Flex width="100%" height="50px" color="buttonText" justifyContent="space-between">
            <Box></Box>
            <Flex alignItems="center">
                <MdPerson/>
            <Text color="black" mx={3} fontSize="md" fontWeight={500}>{user?.name} ({user?.team?.name})</Text>
            </Flex>
        </Flex>
    );
};

export default Navbar;