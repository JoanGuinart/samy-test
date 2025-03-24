import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_IMAGE } from "@graphql/queries";

interface ImageProps {
  id: string;
  likesCount: number;
}

interface LikeButtonProps {
  image: ImageProps;
}

const LikesButton: React.FC<LikeButtonProps> = ({ image }) => {
  const [likesCount, setLikesCount] = useState<number>(image.likesCount);
  const [liked, setLiked] = useState<boolean>(false);

  // Centralizar la lógica de localStorage
  const getLikedImages = () =>
    JSON.parse(localStorage.getItem("likedImages") || "{}");

  useEffect(() => {
    const likedImages = getLikedImages();
    if (likedImages[image.id]) {
      setLiked(true);
    }
  }, [image.id]);

  const [likeImage] = useMutation(LIKE_IMAGE, {
    optimisticResponse: (variables) => {
      const newLikedState = !liked;
      return {
        likeImage: {
          __typename: "Mutation",
          image: {
            __typename: "Image",
            id: variables.input.imageId,
            likesCount: newLikedState ? likesCount + 1 : likesCount - 1,
          },
        },
      };
    },
    update: (cache, { data }) => {
      if (data) {
        const { likeImage } = data;
        cache.modify({
          id: cache.identify({ __typename: "Image", id: likeImage.image.id }),
          fields: {
            likesCount() {
              return likeImage.image.likesCount;
            },
          },
        });
      }
    },
  });

  const handleLike = async () => {
    const likedImages = getLikedImages();
    const newLikedState = !liked;

    // Actualiza el estado antes de hacer la mutación (optimistic UI)
    setLiked(newLikedState);
    setLikesCount((prev) => (newLikedState ? prev + 1 : prev - 1));

    try {
      const { data } = await likeImage({
        variables: {
          input: {
            imageId: image.id,
            clientMutationId: "like-" + image.id, // Opcional
          },
        },
      });

      if (data) {
        setLikesCount(data.likeImage.image.likesCount);
      }

      // Guardar el estado de los likes en localStorage
      if (newLikedState) {
        likedImages[image.id] = true;
      } else {
        delete likedImages[image.id];
      }
      localStorage.setItem("likedImages", JSON.stringify(likedImages));
    } catch (error) {
      console.error("Error updating likes:", error);
      if (error instanceof Error) {
        alert("Error: " + error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <button onClick={handleLike} className="flex flex-row md:flex-col justify-center items-center gap-[6px] cursor-pointer w-full h-full md:w-auto md:h-auto">
      <div>
        <img
          className={`w-5 h-auto cursor-pointer ${liked ? "animate-heart" : ""}`}
          src= {liked ? "/filled-heart.png" : "/heart.svg"}
          alt="likes button"
        />
      </div>
      <p className="text-[#1d1d1b] md:text-white">{likesCount}</p>
    </button>
  );
};

export default LikesButton;
