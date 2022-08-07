/* eslint-disable react/no-unescaped-entities */
import { useMutation, useQuery, useSubscription } from "@apollo/client";

import {
  Button,
  Heading,
  Input,
  Stack,
  Text as AsliText,
  Flex,
} from "@chakra-ui/core";
import { Avatar, VStack, Text, HStack } from "@chakra-ui/react";
import { forEach, get } from "lodash";
import Router from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { useInput } from "react-hanger";
import toast from "react-hot-toast";
import { MdPlayCircleOutline } from "react-icons/md";
import AppContext from "../context/App";
import { CREATE_REQUEST } from "../lib/mutations";
import { TEAMS, USER_REQUEST } from "../lib/queries";
import Loader from "./Loader";

const JoinTeam = ({ joinTeam }) => {
  const nameInput = useInput("");
  const { user, setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const { data: teamsData, loading: teamsLoading } = useSubscription(TEAMS);
  const [generateRequestForUser] = useMutation(CREATE_REQUEST);
  const [pendingRequest, setPendingRequest] = useState(null);
  const {
    loading: userPendingRequestLoading,
    error,
    data: userPendingRequest,
  } = useQuery(USER_REQUEST, {
    variables: {
      userId: user?.id,
      status: "pending",
    },
  });

  useEffect(() => {
    console.log("User Pending Request", userPendingRequest);
    if (userPendingRequest?.requests?.length) {
      setPendingRequest(userPendingRequest?.requests?.[0]);
    }
  }, [userPendingRequest]);

  if (teamsLoading) {
    return <Loader />;
  }

  const generateRequest = async (teamId) => {
    const { data: requestDataGenerated } = await generateRequestForUser({
      variables: {
        request: { user_id: user?.id, team_id: teamId },
      },
    });
    console.log("Request Data is", requestDataGenerated);
    setPendingRequest(
      requestDataGenerated?.["insert_requests"]?.returning?.[0]
    );
  };

  //   const createTeamAndUpdateUser = async () => {
  //     setIsLoading(true);
  //     try {
  //       const { data: teamData } = await createTeam({
  //         variables: { team: { name: nameInput.value, admin_id: user?.id } },
  //       });
  //       console.log("Error is", teamData);
  //       const team = get(teamData, "insert_teams.returning.0");
  //       const { data: updatedUserData } = await updateUser({
  //         variables: {
  //           user_id: user.id,
  //           changes: {
  //             is_admin: true,
  //             team_id: team.id,
  //           },
  //         },
  //       });
  //       const updatedUser = get(updatedUserData, "update_users.returning.0");
  //       setUser(updatedUser);
  //       const teamPath = `/team/${team.id}`;
  //       Router.push(teamPath);
  //     } catch (err) {
  //       console.log("Error", err);
  //       if (err.message.includes("Uniqueness violation")) {
  //         toast.error("Name already taken", {
  //           position: "top-right",
  //           style: {
  //             background: "black",
  //             color: "red",
  //           },
  //         });
  //       }
  //       setIsLoading(false);
  //     }
  //   };
  if (pendingRequest) {
    return (
      <h1>{`Your request for ${pendingRequest?.team?.name} is still in process. Please contact the admin.`}</h1>
    );
  }

  return (
    <Stack spacing={5} align="center" margin="auto" maxWidth="32em" padding={5}>
      <Heading color="headline">Join Team</Heading>
      <AsliText color="gray.500">
        Select from existing teams. Once you find a dream team, send a request
        to the admin of the team. If your request is accepted, Wohooo! you are
        in. Incase, admin rejects your request, raise a request to another team
        for consideration. Keep visiting this dashboard for latest updates.
      </AsliText>
      {teamsData?.teams?.map((team) => {
        return (
          <HStack
            // width="100%"
            // height="100%"
            // justifyContent="space-between"
            // boxShadow="sm"
            key={team?.id}
          >
            <Flex alignItems="center">
              <Avatar
                size="xs"
                width={30}
                height={30}
                src={`https://avatars.dicebear.com/v2/gridy/${team.name}.svg`}
              ></Avatar>
              <Stack ml={3}>
                <AsliText size="md" height="100%">
                  {team.name}
                </AsliText>
                <AsliText fontSize="sm" mt={0} color="gray.500">
                  {team.user.name}
                </AsliText>
              </Stack>
            </Flex>
            <Button
              size="sm"
              color="buttonText"
              onClick={() => {
                generateRequest(team.id);
              }}
            >
              Request
            </Button>
          </HStack>
        );
      })}
    </Stack>
  );
};

export default JoinTeam;
