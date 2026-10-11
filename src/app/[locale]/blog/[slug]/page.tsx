import { notFound } from 'next/navigation';
import { blogPosts, getTag, localize, readableTextColor, CUSTOM_POST_SLUGS } from '@/data/blog';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import styles from '@/styles/blog-post.module.css';
import TwoBKMUTTPost from '@/components/blog/TwoBKMUTTPost';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const locales = ['th', 'en', 'lo', 'zh'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${localize(post.title, locale)} | Bigbank Blog`,
    description: localize(post.description, locale),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  if (CUSTOM_POST_SLUGS.includes(slug)) {
    return <TwoBKMUTTPost />;
  }

  const t = await getTranslations({ locale, namespace: 'blog' });
  const tag = getTag(post.tag);

  return (
    <div className={styles.postPage}>
      <div className={styles.postContainer}>
        <Link href={`/${locale}/blog`} className={styles.backButton}>
          <FiArrowLeft size={20} />
          <span>{locale === 'th' ? 'กลับหน้าหลัก' : locale === 'en' ? 'Back' : locale === 'lo' ? 'ກັບຄືນ' : '返回'}</span>
        </Link>
        
        <article className={styles.postCard}>
          <Image
            src={post.image}
            alt={localize(post.title, locale)}
            width={800}
            height={400}
            className={styles.postImage}
            priority
          />
          
          <div className={styles.postMeta}>
            <span
              className={styles.postCategory}
              style={{ background: tag.color, color: readableTextColor(tag.color) }}
            >
              {tag.label}
            </span>
            <span>{post.date}</span>
            <span>{post.readTime} {t('min_read')}</span>
          </div>
          
          <h1 className={styles.postTitle}>{localize(post.title, locale)}</h1>
          
          <div className={styles.postContent}>
            {localize(post.content, locale)}
          </div>
        </article>
      </div>
    </div>
  );
}
