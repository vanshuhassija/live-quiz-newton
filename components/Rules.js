import { Heading, Text } from '@chakra-ui/core';
import { Stack } from '@chakra-ui/react';
import React from 'react';

const Rules = () => {
    return (
        <Stack maxHeight="90vh" overflowY="scroll">
            <Heading>Rules:</Heading>
            <Text color="gray.500">The rules of the quiz are really simple.</Text>
            <Text>1. Do not cheat. If caught cheating, your whole team will be disqualified.</Text>
            <Text>The quiz will be around HTML,CSS and Javascript.</Text>
            <Text pb={4}>2. There will total of 4 rounds. The rules of each round are specified.</Text>
            <Text color="gray.500" fontWeight={500}>Round 1:</Text>
            <ul>
                <li><Text>All finalized teams will play this round.</Text></li>
                <li><Text>The question answer process will be conducted on zoom chat.</Text></li>
                <li><Text>Top 5 answers (for 5 different teams team) will be considered.</Text></li>
                <li><Text>For each correct answer team gets +10 and for each wrong answer team gets -5</Text></li>
                <li><Text>Only half of the teams will make to the next round.</Text></li>
            </ul>
            <Text color="gray.500" fontWeight={500}>Round 2:</Text>
            <ul>
                <li><Text>Top 5 answers (for 5 different teams team) will be considered.</Text></li>
                <li><Text>For each correct answer team gets +20 and for each wrong answer team gets -10</Text></li>
                <li><Text>Only two teams will make to the next round.</Text></li>
            </ul>
            <Text color="gray.500" fontWeight={500}>Round 3:</Text>
            <ul>
                <li><Text>This is a rapid fire round 🔥.</Text></li>
                <li><Text>There are two sets of question.</Text></li>
                <li><Text>The team with higher score gets to choose the set they want to play with.</Text></li>
                <li><Text>The team with higher score gets to choose which team will play first.</Text></li>
                <li><Text>Each team will choose a captain who will answer all the questions.</Text></li>
                <li><Text>15 seconds will be given for each question. During this time team members can help the captain to answer the question.</Text></li>
                <li><Text>For each correct answer your team gets +10 and for each wrong answer your team gets -20</Text></li>
                <li><Text>You have the option to pass the question.</Text></li>
                <li><Text>Only 1 team will move forward to the final round.</Text></li>
            </ul>
            <Text color="gray.500" fontWeight={500}>Round 4:</Text>
            <ul>
                <li><Text>Everybody plays individual in this round.</Text></li>
                <li><Text>Only 1st answer out of all the answers for the question, will be considered.</Text></li>
                <li><Text>For each correct answer you get +50 and there is no negative marking.</Text></li>
            </ul>
            <Text color="gray.500" fontWeight={500}>Elimination Criteria:</Text>
            <ul>
                <li><Text>The teams with no participation in a particular round, will be eliminated straight away.</Text></li>
                <li><Text>Teams with less scores will be eliminated.</Text></li>
            </ul>
        </Stack>
    );
};

export default Rules;