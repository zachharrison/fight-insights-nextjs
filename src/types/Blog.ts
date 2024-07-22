export type BlogPost = {
  id: string;
  image: string;
  title: string;
  slug: string;
  date: string;
};

export type Blogs = {
  posts: BlogPost[];
};
