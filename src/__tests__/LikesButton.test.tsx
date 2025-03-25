import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LikesButton from "@components/LikesButton";
import { LIKE_IMAGE } from "@graphql/queries";
import { expect, test } from "vitest";

const mocks = [
  {
    request: {
      query: LIKE_IMAGE,
      variables: {
        input: { imageId: "1" },
      },
    },
    result: {
      data: {
        likeImage: {
          __typename: "LikeImagePayload",
          image: {
            __typename: "Image",
            id: "1",
            likesCount: 11, // simulate the new number of likes
          },
        },
      },
    },
  },
];

test("need to render number of likes and change on click", async () => {
  const image = {
    id: "1",
    liked: false,
    likesCount: 10,
    title: "title-test",
    picture: "image.jpg",
    author: "Author",
    createdAt: "2023-01-01T00:00:00Z",
    price: '10',
  };

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LikesButton image={image} />
    </MockedProvider>
  );

  // verify the initial number of likes
  expect(screen.getByText("10")).toBeInTheDocument();

  // simulate the click
  fireEvent.click(screen.getByRole("button"));

  // verify the new number of likes
  expect(await screen.findByText("11")).toBeInTheDocument();
});
