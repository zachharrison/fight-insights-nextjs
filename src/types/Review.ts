export type Review = {
  id: string;
  imageUrl: string;
  title: string;
  slug: string;
  date?: string;
  content?: any;
};

export type Reviews = Review[];
