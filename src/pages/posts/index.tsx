import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import styled from 'styled-components';

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

const ContainerDiv = styled.div`
  background: #333;
  border-radius: 8px;
  padding: 40px;
  color: white;
  margin: auto;
  width: max-content;
  text-align: center;
`;

export default function BlogsPage({ posts }: any) {
  return (
    <ContainerDiv>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </ContainerDiv>
  );
}
