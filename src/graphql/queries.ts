import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages($first: Int, $after: String) {
    images(first: $first, after: $after) {
      nodes {
        id
        title
        picture
        likesCount
        liked
        author
        createdAt
        price
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
