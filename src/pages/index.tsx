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
      reviews(first: 3) {
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
    };
  });

  const reviews = reviewsResponse?.data?.reviews?.edges.map((review: any) => {
    return {
      imageUrl: review.node.featuredImage.node.sourceUrl,
      title: review.node.title,
      slug: review.node.slug,
      date: review.node.date,
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
  console.log({ blogPosts, reviews });
  return (
    <main className={roboto.className}>
      <div className={styles.pageContainer}>
        HOME PAGE
        {/* <Post {...mostRecentBlogPost} fullWidth={true} />
      <FlexColumnDiv gap="20px">
        <TitleH1>Latest Articles</TitleH1>
        <GridContainerDiv>
          <Post
            {...post}
            image="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2023/09/07/3780400-76897928-2560-1440.jpg"
          />
          <Post
            {...reviewTwo}
            image="https://cdn.vox-cdn.com/thumbor/Y5Dr0LWVNOjb1_nkBDCp3n1WOO8=/0x0:1080x1350/269x239/filters:focal(489x271:661x443):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72738410/386508272_18387548842006604_7783350461656217775_n.0.jpg"
          />
          <Post
            {...post}
            image="https://cdn.vox-cdn.com/thumbor/JshVrHBsDZenDUTmW6uN1lpZAy4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24129274/1435299462.jpg"
          />
        </GridContainerDiv>
      </FlexColumnDiv>

      <FlexColumnDiv
        gap="20px"
        style={{ margin: "auto", width: "fit-content" }}
      >
        <TitleH1>Reviews</TitleH1>
        <ReviewContainerDiv>
          {reviews.map((review: any) => {
            return <Review {...review} />;
          })}
          <Review {...reviewData} />
        </ReviewContainerDiv>
      </FlexColumnDiv> */}
      </div>
    </main>
  );
}
