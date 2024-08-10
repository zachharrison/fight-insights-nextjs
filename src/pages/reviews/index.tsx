import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import moment from 'moment';
import Link from 'next/link';
import styles from './ReviewsPage.module.css';
import { Review, Reviews } from '@/types/Review';

type ReviewsPageProps = {
  reviews: Reviews;
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query getReviews {
        reviews {
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
    `,
  });

  const reviews = data?.reviews?.edges.map((review: any) => {
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
      reviews,
    },
    revalidate: 1,
  };
};

export default function ReviewsPage({ reviews }: ReviewsPageProps) {
  return (
    <div className={styles.containerDiv}>
      {reviews.map((review: Review, idx: number) => (
        <div className={styles.reviewContainer} key={`${review.id}-${idx}`}>
          <img
            className={styles.reviewImg}
            src={review.imageUrl}
            alt={review.slug}
          />
          <div className='flex-column-container width-100'>
            <p className='date'>{review.date}</p>
            <Link href={`/reviews/${review.slug}`}>
              <h1 className={styles.reviewTitle}>{review.title}</h1>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
