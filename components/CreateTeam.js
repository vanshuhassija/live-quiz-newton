/* eslint-disable react/no-unescaped-entities */
import { useMutation } from "@apollo/react-hooks";
import { Button, Heading, Input, Stack } from "@chakra-ui/core";
import { Link, Text } from "@chakra-ui/react";
import { forEach, get } from "lodash";
import Router from "next/router";
import React, { useState, useContext } from "react";
import { useInput } from "react-hanger";
import toast from "react-hot-toast";
import { MdPlayCircleOutline } from "react-icons/md";
import AppContext from "../context/App";
import { CREATE_TEAM, CREATE_USER, UPDATE_USER } from "../lib/mutations";

const CreateTeam = ({ joinTeam }) => {
  const nameInput = useInput("");
  const { user, setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [createTeam] = useMutation(CREATE_TEAM);
  const [updateUser] = useMutation(UPDATE_USER);

  const createTeamAndUpdateUser = async () => {
    setIsLoading(true);
    try {
      const { data: teamData } = await createTeam({
        variables: { team: { name: nameInput.value, admin_id: user?.id } },
      });
      console.log("Error is", teamData);
      const team = get(teamData, "insert_teams.returning.0");
      const { data: updatedUserData } = await updateUser({
        variables: {
          user_id: user.id,
          changes: {
            is_admin: true,
            team_id: team.id,
          },
        },
      });
      const updatedUser = get(updatedUserData, "update_users.returning.0");
      setUser(updatedUser);
      const teamPath = `/team/${team.id}`;
      Router.push(teamPath);
    } catch (err) {
      console.log("Error", err);
      if (err.message.includes("Uniqueness violation")) {
        toast.error("Name already taken", {
          position: "top-right",
          style: {
            background: "black",
            color: "red",
          },
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={5} align="center" margin="auto" maxWidth="32em" padding={5}>
      <Heading color="headline">Create Team</Heading>
      <Text color="paragraph">
        Enter team name to create a team. After creating the team, you will
        become an admin automatically. As an admin, you will receive requests
        from others to join the team. It's your responsibility to have at least
        4 members in the team. Failure to do so will not give you entry to the
        quiz.
      </Text>
      <Input placeholder="Enter team name" mt="3" {...nameInput.eventBind} />
      <Text
        textDecoration="underline"
        color="gray.500"
        cursor="pointer"
        mt={0}
        onClick={joinTeam}
      >
        Join an existing team instead?
      </Text>
      <Button
        isLoading={isLoading}
        color="buttonText"
        loadingText="Creating"
        border="1px"
        mt={3}
        variantColor="primary"
        type="submit"
        rightIcon={MdPlayCircleOutline}
        disabled={!nameInput.hasValue}
        onClick={createTeamAndUpdateUser}
      >
        Register Team
      </Button>
    </Stack>
  );
};

export default CreateTeam;
