import { useSubscription } from "@apollo/client";
import React from "react";
import { LEADERBOARD } from "../lib/queries";
import Loader from "./Loader";
import FlipMove from "react-flip-move";
import { Avatar } from "@chakra-ui/react";
import { Text, Flex, Stack, Heading, Box } from "@chakra-ui/core";

const Leaderboard = () => {
  const { data: leaderboardData, loading: leaderboardLoading } =
    useSubscription(LEADERBOARD);
  const { teams } = leaderboardData || {};
  if (leaderboardLoading) {
    return <Loader />;
  }
  return (
    <Stack>
      <Heading>Leaderboard</Heading>
      <Box mt={4} maxHeight="90vh" overflowY="scroll">
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
                textDecoration={team?.status==="eliminated"?"line-through":"none"}
                background={team?.status==="eliminated"?"red":"transparent"}
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
                  <Text mr={4}>{team.scores}</Text>
                </Flex>
              </Flex>
            );
          })}
        </FlipMove>
      </Box>
    </Stack>
  );
};

export default Leaderboard;
