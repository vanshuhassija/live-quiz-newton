import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { LEADERBOARD, TEAMS, TEAMS_QUERY } from "../lib/queries";
import Loader from "./Loader";
import FlipMove from "react-flip-move";
import { Avatar } from "@chakra-ui/react";
import { Text, Flex, Stack, Heading, Box, Button } from "@chakra-ui/core";
import { UPDATE_TEAM } from "../lib/mutations";

const Scoring = () => {
  const { data: teamsData, loading: teamsLoading } = useQuery(TEAMS_QUERY);
  const [updateTeam] = useMutation(UPDATE_TEAM);
  const { teams } = teamsData || {};
  if (teamsLoading) {
    return <Loader />;
  }

  async function updateTeamScores(teamId, scores) {
    await updateTeam({
      variables: {
        team_id: teamId,
        changes: {
          scores,
        },
      },
    });
  }
  async function eliminateTeam(teamId) {
    await updateTeam({
      variables: {
        team_id: teamId,
        changes: {
          status:"eliminated"
        },
      },
    });
  }

  return (
    <Stack>
      <Heading>Scoring</Heading>
      <Box mt={4}>
        <FlipMove>
          {teams?.map((team) => {
            return (
              <Flex
                justifyContent="space-between"
                alignItems="center"
                boxShadow="sm"
                key={team.id}
                width="100%"
                height="100%"
              >
                <Flex alignItems="center">
                  <Avatar
                    size="xs"
                    width={30}
                    src={`https://avatars.dicebear.com/v2/gridy/${team.name}.svg`}
                  ></Avatar>
                  <Text ml={4}>{team.name}</Text>
                </Flex>
                <Flex>
                  <Button
                    variant="primary"
                    background="primary"
                    size="xs"
                    onClick={() => {
                      updateTeamScores(team.id, team.scores + 10);
                    }}
                  >
                    +10
                  </Button>
                  <Button
                    variant="primary"
                    size="xs"
                    ml={2}
                    onClick={() => {
                      updateTeamScores(team.id, team.scores + 20);
                    }}
                  >
                    +20
                  </Button>
                  <Button
                    variant="primary"
                    size="xs"
                    ml={2}
                    onClick={() => {
                      updateTeamScores(team.id, team.scores - 5);
                    }}
                  >
                    -5
                  </Button>
                  <Button
                    variant="primary"
                    size="xs"
                    ml={2}
                    onClick={() => {
                      updateTeamScores(team.id, team.scores - 10);
                    }}
                  >
                    -10
                  </Button>
                  <Button
                    variant="primary"
                    size="xs"
                    ml={2}
                    onClick={() => {
                      updateTeamScores(team.id, team.scores - 20);
                    }}
                  >
                    -20
                  </Button>
                  <Button
                    background="red"
                    size="xs"
                    ml={2}
                    color="white"
                    onClick={() => {
                      eliminateTeam(team.id);
                    }}
                  >
                    Eliminate
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </FlipMove>
      </Box>
    </Stack>
  );
};

export default Scoring;
