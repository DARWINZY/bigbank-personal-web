import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { type BlogPost, formatPostDate, getTag, localize, readableTextColor } from '@/data/blog';
import styles from '@/styles/blog.module.css';

interface Props {
  post: BlogPost;
  priority?: boolean;
  /** h2 on the blog index; h3 where the cards sit under a section heading. */
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export default function PostCard({ post, priority = false, headingLevel = 'h2', className = '' }: Props) {
  const t = useTranslations('blog');
  const locale = useLocale();
  const tag = getTag(post.tag);
  const Heading = headingLevel;

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className={`${styles.blogCard} ${className}`}>
      <div className={styles.blogCardImage}>
        <Image
          src={post.image}
          alt={localize(post.title, locale)}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 320px"
          priority={priority}
        />
        <span
          className={styles.blogCardTag}
          style={{ background: tag.color, color: readableTextColor(tag.color) }}
        >
          {tag.label}
        </span>
      </div>
      <div className={styles.blogCardBody}>
        <Heading className={styles.blogCardTitle}>{localize(post.title, locale)}</Heading>
        <p className={styles.blogCardDesc}>{localize(post.description, locale)}</p>
        <p className={styles.blogCardMeta}>
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          <span aria-hidden="true"> · </span>
          {t('read_time', { minutes: post.readTime })}
        </p>
      </div>
    </Link>
  );
}
