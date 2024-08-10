import client from '@/lib/apolloClient';
import { Review } from '@/types/Review';
import { gql } from '@apollo/client';
import moment from 'moment';
import { GetStaticPaths, GetStaticProps } from 'next';

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

export default function ReviewPage(review: Review) {
  console.log('review is ', review);
  return <div>Reveiw</div>;
}
