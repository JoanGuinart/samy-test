import { useState, useEffect } from "react";

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

  useEffect(() => {
    const likedImages: Record<string, boolean> = JSON.parse(
      localStorage.getItem("likedImages") || "{}"
    );
    if (likedImages[image.id]) {
      setLiked(true);
    }
  }, [image.id]);

  const handleLike = () => {
    const likedImages: Record<string, boolean> = JSON.parse(
      localStorage.getItem("likedImages") || "{}"
    );

    if (liked) {
      setLikesCount((prev) => prev - 1);
      delete likedImages[image.id];
    } else {
      setLikesCount((prev) => prev + 1);
      likedImages[image.id] = true;
    }

    setLiked(!liked);
    localStorage.setItem("likedImages", JSON.stringify(likedImages));
  };

  return (
    <div className="hidden md:flex flex-col justify-center items-center gap-[6px]">
      <button onClick={handleLike}>
        <img
          className={ `w-5 h-auto ${liked ? "scale-100" : "scale-125"}` }
          src={liked ? "/heart.svg" : "/heart.svg"}
          alt="likes button"
        />
      </button>
      <p className="text-white">{likesCount}</p>
    </div>
  );
};

export default LikesButton;
