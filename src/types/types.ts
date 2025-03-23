export interface Image {
  id: string;
  title: string;
  picture: string;
  likesCount: number;
  liked: boolean;
  author: string;
  createdAt: string;
  price: string;
}

export interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ImagesData {
  images: {
    nodes: Image[];
    pageInfo: PageInfo;
  };
}
