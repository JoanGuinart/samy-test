import { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_IMAGE } from "@graphql/queries";
import { Image } from "src/types/types";

interface LikesButtonProps {
  image: Image;
}

const LikesButton: FC<LikesButtonProps> = ({ image }) => {
  const [liked, setLiked] = useState(image.liked);
  const [likesCount, setLikesCount] = useState(image.likesCount);

  const [likeImage] = useMutation(LIKE_IMAGE, {
    // optimistic response to update inmediately the ui
    optimisticResponse: {
      likeImage: {
        __typename: "LikeImagePayload",
        image: {
          __typename: "Image",
          id: image.id,
          likesCount: liked ? likesCount - 1 : likesCount + 1,
        },
      },
    },
    // Optional, update cache
    update: (cache, { data: { likeImage } }) =>
      cache.modify({
        id: cache.identify({ __typename: "Image", id: image.id }),
        fields: { likesCount: () => likeImage.image.likesCount },
      }),
  });

  const handleClick = async () => {
    const newLiked = !liked;
    const newLikesCount = newLiked ? likesCount + 1 : likesCount - 1;
    setLiked(newLiked);
    setLikesCount(newLikesCount);

    try {
      await likeImage({
        variables: {
          input: { imageId: image.id },
        },
      });
    } catch (error) {
      setLiked(liked);
      setLikesCount(likesCount);
      console.error("Error updating like:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-row md:flex-col justify-center items-center gap-[6px] cursor-pointer w-full h-full md:w-auto md:h-auto"
    >
      <div>
        <img
          className={`w-5 h-auto cursor-pointer ${
            liked ? "animate-heart" : ""
          }`}
          src={liked ? "/filled-heart.png" : "/heart.svg"}
          alt="likes button"
        />
      </div>
      <p className="text-[#1d1d1b] md:text-white">{likesCount}</p>
    </button>
  );
};

export default LikesButton;
