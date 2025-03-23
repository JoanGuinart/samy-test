export interface Image {
  id: string;
  title: string;
  picture: string;
  likesCount: number;
  liked: boolean;
  author: string;
  createdAt: string;
}

export interface ImagesData {
  images: {
    nodes: Image[];
  };
}
