export type BlogPost = {
  id: string;
  imageUrl: string;
  title: string;
  slug: string;
  date: string;
  content?: any;
};

export type Blogs = BlogPost[];
