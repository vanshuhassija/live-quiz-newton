import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation create_user($user: users_insert_input!) {
    insert_users(objects: [$user]) {
      returning {
        id
        name
        team{
          name
          id
        }
      }
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation create_team($team: teams_insert_input!) {
    insert_teams(objects: [$team]) {
      returning {
        id
        name
        admin_id
      }
    }
  }
`;

export const CREATE_REQUEST = gql`
  mutation create_request($request: requests_insert_input!) {
    insert_requests(objects: [$request]) {
      returning {
        id
        team{
          name
        }
        user{
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation update_user($user_id: Int!, $changes: users_set_input) {
    update_users(where: { id: { _eq: $user_id } }, _set: $changes) {
      returning {
        id
        name
        is_admin
        is_super_admin
        team {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation update_team($team_id: Int!, $changes: teams_set_input) {
    update_teams(where: { id: { _eq: $team_id } }, _set: $changes) {
      returning {
        id
        name
        status
        scores
      }
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation update_request($request_id: Int!, $changes: requests_set_input) {
    update_requests(where: { id: { _eq: $request_id } }, _set: $changes) {
      returning {
        id
        team {
          id
          name
        }
        user{
          id
        }
      }
    }
  }
`;

// export const UPDATE_PLAYER = gql`
//   mutation update_player($player_id: uuid, $changes: players_set_input) {
//     update_players(where: { id: { _eq: $player_id } }, _set: $changes) {
//       returning {
//         id
//         name
//         room_id
//       }
//     }
//   }
// `;
