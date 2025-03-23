import { useQuery } from "@apollo/client";
import { GET_IMAGES } from "@graphql/queries";
import { useCallback, useRef, useState, useEffect } from "react";
import { ImagesData } from "src/types/types";

export const PhotoGrid = () => {
  const { loading, error, data, fetchMore } = useQuery<ImagesData>(GET_IMAGES, {
    variables: { first: 24 },
  });

  const [hasMore, setHasMore] = useState(true);
  const [observerEnabled, setObserverEnabled] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setObserverEnabled(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMoreImages = useCallback(() => {
    if (isFetching.current || !data?.images.pageInfo.hasNextPage) return;

    isFetching.current = true;

    fetchMore({
      variables: {
        first: 24,
        after: data.images.pageInfo.endCursor,
      },
    })
      .then((fetchResult) => {
        if (!fetchResult.data?.images.pageInfo.hasNextPage) {
          setHasMore(false);
          console.log("No more images to load");
        }
      })
      .finally(() => {
        isFetching.current = false;
      });
  }, [data, fetchMore]);

  const lastImageRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !node || isFetching.current || !observerEnabled) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            console.log("End of the list reached, loading more images");
            loadMoreImages();
          }
        },
        { rootMargin: "10px", threshold: 0 }
      );

      observer.current.observe(node);
    },
    [loading, hasMore, loadMoreImages, observerEnabled]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Error Loading Images</div>;

  return (
    <div className="photo-grid bg-gray-300">
      {data.images.nodes.map((image, index) => (
        <div
          key={image.id}
          ref={index === data.images.nodes.length - 1 ? lastImageRef : null}
        >
          <img src={image.picture} alt={image.title} />
          <h3>{image.title}</h3>
          <p>Author: {image.author}</p>
          <p>❤️ {image.likesCount} Like</p>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};
