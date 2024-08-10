import client from '@/lib/apolloClient';
import { Review } from '@/types/Review';
import { gql } from '@apollo/client';
import moment from 'moment';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from './Review.module.css';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetReviewSlugs {
        reviews {
          edges {
            node {
              slug
            }
          }
        }
      }
    `,
  });

  const paths = data.reviews.edges.map((review: any) => ({
    params: { slug: review.node.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug || null;

  const REVIEWQUERY = gql`
    query GetReviewBySlug($id: ID!) {
      review(id: $id, idType: SLUG) {
        title
        content
        score
        date
        productCategory
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
      }
    }
  `;

  const response = await client.query({
    query: REVIEWQUERY,
    variables: {
      id: slug,
    },
  });

  const date = moment(response?.data?.review?.date).format('MMMM Do YYYY');

  return {
    props: {
      imageUrl: response.data?.review?.featuredImage?.node?.sourceUrl,
      title: response?.data?.review?.title,
      slug,
      date,
      content: response?.data?.review?.content,
    },
  };
};

const StarSVG = ({
  color = 'var(--primary-dark-color)',
}: {
  color?: string;
}) => (
  <svg
    className={styles.starIcon}
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    version='1.1'
    viewBox='0 0 256 256'
    xmlSpace='preserve'
  >
    <defs></defs>
    <g
      style={{
        stroke: 'none',
        strokeWidth: 0,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: 'none',
        fillRule: 'nonzero',
        opacity: 1,
      }}
      transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'
    >
      <path
        style={{ fill: color }}
        d='M 47.755 3.765 l 11.525 23.353 c 0.448 0.907 1.313 1.535 2.314 1.681 l 25.772 3.745 c 2.52 0.366 3.527 3.463 1.703 5.241 L 70.42 55.962 c -0.724 0.706 -1.055 1.723 -0.884 2.72 l 4.402 25.667 c 0.431 2.51 -2.204 4.424 -4.458 3.239 L 46.43 75.47 c -0.895 -0.471 -1.965 -0.471 -2.86 0 L 20.519 87.588 c -2.254 1.185 -4.889 -0.729 -4.458 -3.239 l 4.402 -25.667 c 0.171 -0.997 -0.16 -2.014 -0.884 -2.72 L 0.931 37.784 c -1.824 -1.778 -0.817 -4.875 1.703 -5.241 l 25.772 -3.745 c 1.001 -0.145 1.866 -0.774 2.314 -1.681 L 42.245 3.765 C 43.372 1.481 46.628 1.481 47.755 3.765 z'
      />
    </g>
  </svg>
);

export default function ReviewPage(review: Review) {
  const pros = [
    'Very comfortable fit',
    'Great price',
    'Great for work on the bag, as well as the pads',
  ];
  const cons = [
    "Don't come in ounces for sizing",
    'Not suitable for sparring',
    'poor wrist support',
  ];

  const escapedProsText = `Pro's`;
  const escapedConsText = `Con's`;

  return (
    <div className={styles.container}>
      <div className={styles.topCardContainer}>
        <div className={styles.topCardContentContainer}>
          <div className='flex-center-container width-100'>
            <div className='flex-column-container center'>
              <h1 className={styles.reviewTitle}>{review.title}</h1>
              <img
                className={styles.reviewImg}
                src={review.imageUrl}
                alt={review.title}
              />
            </div>
            <div className='flex-column-container center'>
              <div className={styles.score}>
                <h1>3</h1>
                <span>Out of 5</span>
              </div>
              <div className={styles.starsContainer}>
                <StarSVG color='var(--primary-color)' />
                <StarSVG color='var(--primary-color)' />
                <StarSVG color='var(--primary-color)' />
                <StarSVG />
                <StarSVG />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.proConCardContainer}>
        <div className={styles.proConCard}>
          <h1>{escapedProsText}</h1>
          {pros.map((pro, idx) => (
            <div key={pro + '_' + idx} className={styles.proConTextContainer}>
              <img
                className={styles.proConIcon}
                src='/checkmark.svg'
                alt='checkmark'
              />
              <p className={styles.proConText}>{pro}</p>
            </div>
          ))}
        </div>
        <div className={styles.proConCard}>
          <h1>{escapedConsText}</h1>
          {cons.map((con, idx) => (
            <div key={con + '_' + idx} className={styles.proConTextContainer}>
              <img className={styles.proConIcon} src='/x.svg' alt='x-icon' />
              <p className={styles.proConText}>{con}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className='article-text'
        dangerouslySetInnerHTML={{ __html: review.content }}
        key={review.title + '_' + review.id}
      />
    </div>
  );
}
