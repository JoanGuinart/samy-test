import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages($first: Int, $after: String, $title: String) {
    images(first: $first, after: $after, title: $title) {
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

export const LIKE_IMAGE = gql`
  mutation LikeImage($input: LikeImageInput!) {
    likeImage(input: $input) {
      image {
        id
        likesCount
      }
    }
  }
`;

