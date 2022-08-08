/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
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
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_USER } from "../lib/mutations";
import { get } from "lodash";
import Router, { useRouter } from "next/router";
import { getCookies, setCookies } from "cookies-next";
// import PageContainer from '../components/PageContainer';
import { MdPlayCircleOutline } from "react-icons/md";
import AppContext from "../context/App";
import { USERS } from "../lib/queries";

const Home = () => {
  const nameInput = useInput("");
  const { setUserLoading, setUser } = useContext(AppContext);
  const [createUser] = useMutation(CREATE_USER);
  const {
    loading: usersLoading,
    error: usersError,
    data: allUsers,
  } = useQuery(USERS);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getCookies("user-id")?.["user-id"]) {
      Router.push("/team");
    }
  }, [nameInput]);

  const createPlayer = async () => {
    setIsLoading(true);

    const matchingUser = allUsers?.users?.find(
      (user) =>
        user?.name?.replaceAll(" ", "")?.toLowerCase() ===
        nameInput?.value?.replaceAll(" ", "")?.toLowerCase()
    );
    console.log("matching user", matchingUser);
    if (matchingUser) {
      setCookies(null, "user-id", matchingUser.id, { path: teamPath });
      setUser(matchingUser);
      const teamPath = `/team`;
      setUserLoading(false);
      Router.push(teamPath);
    }
    else{
    try {
      const { data: playerData } = await createUser({
        variables: { user: { name: nameInput.value } },
      });
      const user = get(playerData, "insert_users.returning.0");
      setCookies(null, "user-id", user.id, { path: teamPath });
      setUser(user);
      setUserLoading(false);
      const teamPath = `/team`;

      Router.push(teamPath);
    } catch (err) {
      console.log("Error",err)
      setIsLoading(false);
    }
    }
  };

  return (
    <Stack spacing={5} align="center" margin="auto" maxWidth="32em" padding={5}>
      <Logo />
      <Heading color="headline">Register For The Quiz</Heading>
      <Text color="paragraph">
        Enter your full name to experience the quiz.
      </Text>
      <Input
        placeholder="Enter your name"
        w="50%"
        mt="3"
        {...nameInput.eventBind}
      />
      <Button
        isLoading={isLoading}
        color="buttonText"
        loadingText="Creating"
        border="1px"
        variantColor="primary"
        type="submit"
        rightIcon={MdPlayCircleOutline}
        disabled={!nameInput.hasValue}
        onClick={createPlayer}
      >
        Register
      </Button>
    </Stack>
  );
};

export default Home;
