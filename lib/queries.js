import gql from "graphql-tag";

export const USER = gql`
  query GetUser($userId: Int!) {
    users(where: { id: { _eq: $userId } }) {
      id
      name
      team_id
      is_admin
      is_super_admin
      team {
        id
        name
        status
      }
    }
  }
`;

export const USERS = gql`
  query GetUsers{
    users{
      id
      name
      is_super_admin
      team{
        name
        id
      }
    }
  }
`;

export const TEAM = gql`
  query GetTeam($teamId: Int!) {
    teams(where: { id: { _eq: $teamId } }) {
      id
      name
      status
    }
  }
`;
export const USER_REQUEST = gql`
  query Request($userId: Int!,$status:String!) {
    requests(where: { user_id: { _eq: $userId }, status:{_eq:$status} }) {
      id
      team {
        id
        name
        status
      }
    }
  }
`;

export const TEAMS = gql`
  subscription GetTeams {
    teams{
      id
      name
      scores
      user{
        id
        name
      }
    }
  }
`;

export const TEAMS_QUERY = gql`
  query{
    teams{
      id
      name
      scores
      user{
        id
        name
      }
    }
  }
`;

export const LEADERBOARD = gql`
  subscription GetTeams {
    teams(order_by: {scores: desc}){
      id
      name
      scores
      status
    }
  }
`;

export const REQUEST = gql`
  subscription request($teamId: Int!,$status:String!) {
    requests(where: { team_id: { _eq: $teamId }, status:{_eq:$status} }) {
      id
      user {
        name
        id
        is_admin
        team{
          id
          name
          status
        }
      }
      team {
        id
        name
        status
      }
    }
  }
`;


