import Link from 'next/link';
import styles from './BlogPostPreview.module.css';
import * as cheerio from 'cheerio';

export type BlogPostPreviewProps = {
  fullWidth?: boolean;
  imageUrl: string;
  title: string;
  slug: string;
  date: string;
  content?: any;
};

const stripHtml = (html: string) => {
  const string = cheerio.load(html);
  return string.text();
};

const truncate = (description: string) => {
  const strippedHTMLString = stripHtml(description);
  return strippedHTMLString.length > 80
    ? strippedHTMLString.substring(0, 80) + '...'
    : strippedHTMLString;
};

const FullWidthView = (post: BlogPostPreviewProps) => {
  return (
    <div className='space-between-container mobile-column'>
      <img src={post.imageUrl} className='full-width-image' />
      <div
        className='flex-column-container'
        style={{ maxWidth: '500px', gap: 'var(--small-gap)' }}
      >
        <Link href={`/posts/${post.slug}`} className='full-width-post-title'>
          <h1 className='title-h1'>{post.title}</h1>
        </Link>
        {post.content && (
          <p
            className={styles.descriptionP}
            style={{ maxWidth: '400px', fontSize: 'var(--font-size-x-small)' }}
          >
            {truncate(post.content)}
          </p>
        )}
        <p className='date'>{post.date}</p>
      </div>
    </div>
  );
};

export default function Post(post: BlogPostPreviewProps) {
  return post.fullWidth ? (
    <FullWidthView {...post} />
  ) : (
    <div className={styles.cardContainerDiv}>
      <img src={post.imageUrl} className={styles.image} />
      <Link href={`/posts/${post.slug}`}>
        <h3 className='title-h3'> {post.title}</h3>
      </Link>
    </div>
  );
}
