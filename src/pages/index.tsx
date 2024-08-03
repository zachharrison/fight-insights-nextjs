import Head from 'next/head';
import Image from 'next/image';
import { Roboto_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import client from '@/lib/apolloClient';
import { BlogPost, Blogs } from '@/types/Blog';
import { gql } from '@apollo/client';
import moment from 'moment';
import { GetStaticProps } from 'next';
import { Reviews } from '@/types/Review';
import BlogPostPreview from '@/components/BlogPostPreview/BlogPostPreview';
import { ReviewPreview } from '@/components/ReviewPreview/ReviewPreview';

const roboto = Roboto_Mono({ subsets: ['latin'] });

type HomePageProps = {
  blogPosts: Blogs;
  reviews: Reviews;
};

export const getStaticProps: GetStaticProps = async () => {
  const BLOGSQUERY = gql`
    query GetPosts {
      posts(first: 4, where: { categoryName: "blog" }) {
        nodes {
          title
          content
          date
          slug
          featuredImage {
            node {
              id
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const REVIEWSQUERY = gql`
    query Reviews {
      reviews(first: 4) {
        edges {
          node {
            id
            title
            score
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
    }
  `;

  const blogsResponse = await client.query({
    query: BLOGSQUERY,
  });

  const reviewsResponse = await client.query({
    query: REVIEWSQUERY,
  });

  const blogPosts: Blogs = blogsResponse.data?.posts?.nodes.map((blog: any) => {
    const date = moment(blog.date);

    return {
      imageUrl: blog.featuredImage.node.sourceUrl,
      title: blog.title,
      slug: blog.slug,
      date: date.format('MMMM Do YYYY'),
      content: blog.content,
    };
  });

  const reviews = reviewsResponse?.data?.reviews?.edges.map((review: any) => {
    const date = moment(review.node.date);
    return {
      imageUrl: review.node.featuredImage.node.sourceUrl,
      title: review.node.title,
      slug: review.node.slug,
      date: date.format('MMMM Do YYYY'),
    };
  });

  return {
    props: {
      blogPosts,
      reviews,
    },
    revalidate: 1,
  };
};

export default function Home({ blogPosts, reviews }: HomePageProps) {
  const mostRecentBlogPost = blogPosts[0];
  const blogs = blogPosts.slice(1);
  return (
    <main className={roboto.className}>
      <div className={styles.pageContainer}>
        <BlogPostPreview
          key={mostRecentBlogPost.id + '-' + mostRecentBlogPost.title}
          title={mostRecentBlogPost.title}
          slug={mostRecentBlogPost.slug}
          date={mostRecentBlogPost.date}
          content={mostRecentBlogPost.content}
          imageUrl={mostRecentBlogPost.imageUrl}
          fullWidth={true}
        />
        <div className='flex-column-container'>
          <h1>Latest Articles</h1>
          <div className={styles.blogsContainer}>
            {blogs.map((blog: any, idx: number) => (
              <BlogPostPreview
                key={blog.id + '-' + blog.title}
                {...blog}
                fullWidth={false}
              />
            ))}
          </div>
        </div>

        <div className='flex-column-container'>
          <h1>Reviews</h1>
          <div className={styles.reviewContainer}>
            {reviews.map((review: any) => (
              <ReviewPreview key={review.id + '-' + review.title} {...review} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
