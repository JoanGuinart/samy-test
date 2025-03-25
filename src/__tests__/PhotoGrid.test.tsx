import { render, screen } from "@testing-library/react";
import { PhotoGrid } from "@components/PhotoGrid";
import { MockedProvider } from "@apollo/client/testing";
import { GET_IMAGES } from "@graphql/queries";
import { expect, test } from "vitest";
const mocks = [
    {
      request: {
        query: GET_IMAGES,
        variables: { first: 24, after: null, title: "test" }, // default search term
      },
      result: {
        data: {
          images: {
            nodes: Array.from({ length: 24 }, (_, i) => ({
              id: `image-${i + 1}`,
              title: `image-title-test ${i + 1}`,
              picture: `/image${i + 1}.jpg`,
              likesCount: 0,
              liked: false,
              author: `Author ${i + 1}`,
              createdAt: "2023-01-01T00:00:00Z",
              price: 10,
            })),
            pageInfo: {
              endCursor: "cursor-24",
              hasNextPage: true,
            },
          },
        },
      },
    },
  ];
  
  test("render first 24 images with a search term", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PhotoGrid searchTerm="test" />
      </MockedProvider>
    );
  
    for (let i = 1; i <= 24; i++) {
      expect(await screen.findByText(`image-title-test ${i}`)).toBeInTheDocument();
    }
  });