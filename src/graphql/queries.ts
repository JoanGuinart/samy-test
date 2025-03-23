import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages($first: Int) {
    images(first: $first) {
      nodes {
        id
        title
        picture
        likesCount
        liked
        author
        createdAt
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
