export type Review = {
  id: string;
  image: string;
  title: string;
  slug: string;
  date?: string;
  content?: any;
};

export type Reviews = Review[];
