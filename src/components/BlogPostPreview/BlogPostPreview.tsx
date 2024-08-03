import Link from 'next/link';
import styles from './BlogPostPreview.module.css';

export type BlogPostPreviewProps = {
  fullWidth?: boolean;
  imageUrl: string;
  title: string;
  slug: string;
  date: string;
  content: any;
};

const truncate = (description: string) => {
  return description.length > 80
    ? description.substring(0, 80) + '...'
    : description;
};

const FullWidthView = (post: BlogPostPreviewProps) => {
  return (
    <div
      className='space-between-container mobile-column'
      // style={{ margin: 'auto' }}
    >
      <img src={post.imageUrl} className={styles.fullWidthImage} />
      <div
        className='flex-column-container'
        style={{ maxWidth: '500px', gap: '15px' }}
      >
        <Link href={`/posts/${post.slug}`} className='full-width-post-title'>
          <h1 className={styles.titleH1}>{post.title}</h1>
        </Link>
        <p className={styles.descriptionP} style={{ maxWidth: '400px' }}>
          {truncate(post.content)}
        </p>
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
        <h3>{post.title}</h3>
      </Link>
      <p className={styles.descriptionP} style={{ maxWidth: '75%' }}>
        {truncate(post.content)}
      </p>
    </div>
  );
}
