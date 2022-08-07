/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/core";
import Logo from "../components/Logo";
import { useInput } from "react-hanger";
import { useMutation } from "@apollo/react-hooks";
import { get } from "lodash";
import Router from "next/router";
import { getCookies, setCookies } from "cookies-next";
// import PageContainer from '../components/PageContainer';
import { MdPlayCircleOutline } from "react-icons/md";
import TeamOptions from "../components/TeamOptions";
import CreateTeam from "../components/CreateTeam";
import { withApollo } from "../lib/apollo";
import withAuth from "../lib/user";
import JoinTeam from "../components/JoinTeam";

const Team = () => {
  const nameInput = useInput("");
  const [selectedOption, setSelectedOption] = useState(null);

  //   const [createUser] = useMutation(CREATE_USER);

  const [isLoading, setIsLoading] = useState(false);

  //   const createPlayer = async () => {
  //     setIsLoading(true);
  //     console.log("Name Input",nameInput.value)
  //     try {
  //       const { data: playerData } = await createUser({
  //         variables: { user: { name: nameInput.value } },
  //       });
  //       const user = get(playerData, 'insert_users.returning.0');

  //       const teamPath = `/team`;
  //       setCookies(null, 'user-id', user.id, { path:teamPath });
  //       // setCookies(null, 'is-creator', true, { path: roomPath });
  //       // Router.push(roomPath);
  //     } catch (err) {
  //       setIsLoading(false);
  //     }
  //   };
  //   console.log("User Id is",getCookies("user-is"))

  return (
    <Stack spacing={5} align="center" margin="auto" maxWidth="32em" padding={5}>
      <Logo />
      {!selectedOption ? (
        <TeamOptions setSelectedOption={setSelectedOption} />
      ) : selectedOption === "create" ? (
        <CreateTeam joinTeam={()=>{setSelectedOption("join")}} />
      ) : (
      <JoinTeam/>
      )}
    </Stack>
  );
};

export default withApollo({ ssr: true })(withAuth(Team))
