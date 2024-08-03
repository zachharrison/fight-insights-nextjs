import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import moment from 'moment';
import { BlogPost, Blogs } from '@/types/Blog';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogsPage.module.css';
type BlogsPageProps = {
  blogPosts: Blogs;
};

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
      imageUrl: blog.featuredImage.node.sourceUrl,
      title: blog.title,
      slug: blog.slug,
      date: date.format('MMMM Do YYYY'),
    };
  });

  return {
    props: {
      blogPosts,
    },
    revalidate: 1,
  };
};

export default function BlogsPage({ blogPosts }: BlogsPageProps) {
  return (
    <div className={styles.containerDiv}>
      {blogPosts.map((post: BlogPost, idx: number) => (
        <div className={styles.blogContainer} key={`${post.id}-${idx}`}>
          <img className={styles.blogImg} src={post.imageUrl} alt={post.slug} />
          <div className='flex-column-container'>
            <p className='date'>{post.date}</p>
            <Link href={`/posts/${post.slug}`}>
              <h1 className={styles.blogTitle}>{post.title}</h1>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
