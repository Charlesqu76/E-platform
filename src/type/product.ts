export type TProduct = {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  retailer: string;
  ratings: number;
  AISummary: string;
};

export type TProductDetail = TProduct & { comments: IComment[] };

export interface IComment {
  id: number;
  username: string;
  content: string;
}
