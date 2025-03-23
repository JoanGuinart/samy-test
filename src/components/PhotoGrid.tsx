import { useQuery } from "@apollo/client";
import { GET_IMAGES } from "@graphql/queries";
import { ImagesData } from "src/types/types";

export const PhotoGrid = () => {
  const { loading, error, data } = useQuery<ImagesData>(GET_IMAGES, {
    variables: { first: 2 }, 
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (error ||!data) return <div>Error Loading Images</div>;

  return (
    <div className="photo-grid">
      {data.images.nodes.map((image) => (
        <div key={image.id} className="photo-item">
          <img src={image.picture} alt={image.title} />
          <h3>{image.title}</h3>
          <p>Autor: {image.author}</p>
          <p>❤️ {image.likesCount} Me gusta</p>
        </div>
      ))}
    </div>
  );
};
