import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {useEffect} from "react"
import {
  Stack,
  Heading,
  Text,
  Flex,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";
import { Avatar } from "@chakra-ui/react";
import { get } from "lodash";
import Router,{  useRouter } from "next/router";
import React from "react";
import Loader from "../../components/Loader";
import Logo from "../../components/Logo";
import { withApollo } from "../../lib/apollo";
import { UPDATE_REQUEST, UPDATE_TEAM, UPDATE_USER } from "../../lib/mutations";
import { REQUEST, TEAM } from "../../lib/queries";
import withAuth from "../../lib/user";

const TeamManagement = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    loading,
    error,
    data: teamData,
  } = useQuery(TEAM, {
    variables: {
      teamId: id,
    },
  });

  const [updateUser] = useMutation(UPDATE_USER);
  const [updateTeam] = useMutation(UPDATE_TEAM);

  const team = get(teamData, "teams.0");
  const [updateRequestForUser] = useMutation(UPDATE_REQUEST);

  const { data: requestData, loading: requestsLoading } = useSubscription(
    REQUEST,
    {
      variables: { teamId: team?.id, status: "pending" },
    }
  );

  const { data: approvedRequests, loading: acceptedRequestsLoading } =
    useSubscription(REQUEST, {
      variables: { teamId: team?.id, status: "accepted" },
    });

  const { data: rejectedRequests, loading: rejectedRequestsLoading } =
    useSubscription(REQUEST, {
      variables: { teamId: team?.id, status: "rejected" },
    });

    useEffect(()=>{
      if(team){
        if(team.status==="final"){
          Router.push("/get-ready")
        }
      }
    },[team])

  if (loading) {
    return <Loader />;
  }

  const updateRequest = async (requestId, status, userId, teamId) => {
    await updateRequestForUser({
      variables: {
        request_id: requestId,
        changes: {
          status,
        },
      },
    });
    if (status === "accepted") {
      debugger;
      const { data: updatedUserData } = await updateUser({
        variables: {
          user_id: userId,
          changes: {
            is_admin: false,
            team_id: teamId,
          },
        },
      });
    }
  };

  const finalizeTeam=async()=>{
    await updateTeam({
      variables: {
        team_id: id,
        changes: {
          status:"final",
        },
      },
    });
    Router.push("/get-ready")
  }

  return (
    <Stack spacing={5} align="center" margin="auto" maxWidth="32em" padding={5}>
      <Heading color="headline">Manage Your Team {team.name}</Heading>
      <Text color="gray.500">
        All requests to join your team will appear here. You can either accept
        the request or reject it, according to your choice.
        <strong>Remember!</strong> Request action is irreversible. Your team
        will be completed only if it has a minimum of 4 members. You will not be
        allowed to accept more than 8 members. Choose Wisely!
      </Text>
      {approvedRequests?.requests?.map((req) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          boxShadow="sm"
          key={req.id}
          width="100%"
        >
          <Flex alignItems="center">
            <Avatar
              size="xs"
              width={30}
              src={`https://avatars.dicebear.com/v2/gridy/${req.user.name}.svg`}
            ></Avatar>
            <Text ml={4}>{req.user.name}</Text>
          </Flex>
          <Flex>
            <Text color="green.500">Accepted</Text>
          </Flex>
        </Flex>
      ))}
      {rejectedRequests?.requests?.map((req) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          boxShadow="sm"
          key={req.id}
          width="100%"
        >
          <Flex alignItems="center">
            <Avatar
              size="xs"
              width={30}
              src={`https://avatars.dicebear.com/v2/gridy/${req.user.name}.svg`}
            ></Avatar>
            <Text ml={4}>{req.user.name}</Text>
          </Flex>
          <Flex>
            <Text color="red.500">Rejected</Text>
          </Flex>
        </Flex>
      ))}
      {requestData?.requests?.map((req) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          boxShadow="sm"
          key={req.id}
          width="100%"
        >
          <Flex alignItems="center">
            <Avatar
              size="xs"
              width={30}
              src={`https://avatars.dicebear.com/v2/gridy/${req.user.name}.svg`}
            ></Avatar>
            <Text ml={4}>{req.user.name}</Text>
          </Flex>
          <Flex>
            <Button
              bg="background"
              size="sm"
              onClick={() => {
                updateRequest(req.id, "accepted", req?.user?.id, req?.team?.id);
              }}
            >
              Accept
            </Button>
            <Button
              bg="red.500"
              color="white"
              ml={3}
              size="sm"
              onClick={() => {
                updateRequest(req.id, "rejected");
              }}
            >
              Reject
            </Button>
          </Flex>
        </Flex>
      ))}
      {!requestsLoading &&
      !acceptedRequestsLoading &&
      !rejectedRequestsLoading &&
      !approvedRequests?.requests?.length &&
      !rejectedRequests?.requests?.length &&
      !requestData?.requests?.length ? (
        <Text>
          You have not started thinking about teams yet. Hmmm! Hurry, else other
          teams will strengthen up.
        </Text>
      ) : approvedRequests?.requests?.length < 4 ? (
        <Alert fontSize="lg" status="success">
          <AlertDescription>
            Almost there! {4 - Number(approvedRequests?.requests?.length)} more
            to qualify for the quiz.
          </AlertDescription>
        </Alert>
      ) : null}
      {approvedRequests?.requests?.length >= 4 &&
      approvedRequests?.requests?.length <= 8 ? (
        <Button bg="green.500" color="white" onClick={finalizeTeam}>Finalize Team</Button>
      ) : null}
    </Stack>
  );
};

export default withApollo({ ssr: true })(withAuth(TeamManagement));
