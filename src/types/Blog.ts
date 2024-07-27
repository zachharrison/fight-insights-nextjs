export type BlogPost = {
  id: string;
  image: string;
  title: string;
  slug: string;
  date: string;
  content?: any;
};

export type Blogs = {
  posts: BlogPost[];
};
