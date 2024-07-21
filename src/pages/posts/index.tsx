import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';

// type Posts = {
//     nodes:  {
//       id: string;
//       title: string;
//     }

// }

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.posts.nodes,
    },
    revalidate: 1,
  };
};

export default function BlogsPage({ posts }: any) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
