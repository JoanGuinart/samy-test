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
        { rootMargin: "100px", threshold: 0 }
      );

      observer.current.observe(node);
    },
    [loading, hasMore, loadMoreImages, observerEnabled]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Error Loading Images</div>;

  return (
    <div className="flex flex-wrap gap-8 items-center justify-center px-8 py-[28px] md:py-[58px]">
      {data.images.nodes.map((image, index) => (
        <div
          key={image.id}
          ref={index === data.images.nodes.length - 1 ? lastImageRef : null}
          className="max-w-[328px] md:max-w-[400px] w-full h-auto"
        >
          <div className="w-full max-h-[360px] overflow-hidden relative">
            <img
              className="object-cover w-full h-full"
              src={image.picture}
              alt={image.title}
            />
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[75px] border-l-white border-t-[50px] border-t-white border-r-transparent border-r-[60px] border-b-transparent border-b-[60px]"></div>
            <div className="absolute left-2.5 top-5">
              <span className="e1 text-start">
                {parseFloat(image.price).toFixed(2)}{" "}
                <span className="text-xs">€</span>
              </span>
            </div>
          </div>

          <div className="border-[1px] border-[#d3d3d3] flex flex-col items-center justify-center gap-[10px] h-[100px]">
            <h3 className="e2">{image.title}</h3>
            <p className="e1">
              <span className="e3">by</span> {image.author}
            </p>
          </div>
          <div className="flex md:hidden items-center justify-center h-[59px] border-b-[1px] border-x-[1px] border-[#d3d3d3]">
            <div className="flex justify-center items-center w-1/2 h-full border-r-[1px] border-[#d3d3d3]">
              likes
            </div>
            <div className="flex justify-center items-center w-1/2 h-full">
              share
            </div>
          </div>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};
