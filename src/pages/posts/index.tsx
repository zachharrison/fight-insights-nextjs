import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import moment from 'moment';
import { BlogPost, Blogs } from '@/types/Blog';
import Link from 'next/link';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                id
                sourceUrl
              }
            }
          }
        }
      }
    `,
  });

  const blogPosts: Blogs = data?.posts?.nodes.map((blog: any) => {
    const date = moment(blog.date);

    return {
      image: blog.featuredImage.node.sourceUrl,
      title: blog.title,
      slug: blog.slug,
      date: date.format('MMMM Do YYYY'),
    };
  });

  return {
    props: {
      posts: blogPosts,
    },
    revalidate: 1,
  };
};

export default function BlogsPage({ posts }: Blogs) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <div className='container'>
        {posts.map((post: BlogPost, idx: number) => (
          <div className='centered' key={`${post.id}-${idx}`}>
            <Image src={post.image} alt={post.slug} width={100} height={100} />
            <div className='flex-column'>
              <p>{post.date}</p>
              <Link href={`/posts/${post.slug}`}>
                <h1>{post.title}</h1>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
