import { BlogPost } from '@/types/Blog';
import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import moment from 'moment';
import client from '@/lib/apolloClient';
import { useEffect } from 'react';
import styles from './Blog.module.css';
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetPostSlugs {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  const paths = data.posts.nodes.map((post: BlogPost) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const PostQuery = gql`
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        categories {
          nodes {
            name
          }
        }
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
  `;

  const blog = await client.query({
    query: PostQuery,
    variables: {
      id: slug,
    },
  });

  const date = moment(blog?.data?.post?.date).format('MMMM Do YYYY');

  return {
    props: {
      imageUrl: blog.data?.post?.featuredImage?.node?.sourceUrl,
      title: blog?.data?.post?.title,
      slug: blog?.data?.post?.slug,
      date,
      content: blog?.data?.post?.content,
    },
  };
};

export default function BlogsPage(blog: BlogPost) {
  useEffect(() => {
    // Re-run any scripts within the content (e.g., Twitter embeds)
    const scripts = document.querySelectorAll('.article-text script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      //@ts-ignore
      newScript.src = script.src;
      newScript.async = true;
      document.body.appendChild(newScript);
    });
  }, []);

  return (
    <div className={styles.articleContainer}>
      <img
        src={blog.imageUrl}
        className='full-width-image height-100'
        alt={blog.title}
      />
      <h1 className={styles.articleTitle}>{blog.title}</h1>
      <div
        className='article-text'
        style={{ margin: 'auto' }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
        key={blog.title + '_' + blog.id}
      />
    </div>
  );
}
