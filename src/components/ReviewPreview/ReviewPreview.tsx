import Link from 'next/link';

type ReviewPreviewProps = {
  imageUrl: string;
  title: string;
  slug: string;
};

export const ReviewPreview = ({
  title,
  imageUrl,
  slug,
}: ReviewPreviewProps) => {
  return (
    <Link className='link-style-none' href={`/reviews/${slug}`}>
      <div className='product-container'>
        <img className='product-image' src={imageUrl} />
        <h1 className='title-h1'>{title}</h1>
      </div>
    </Link>
  );
};
