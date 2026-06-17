import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
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
    title: `${post.title[locale as keyof typeof post.title]} | Bigbank Blog`,
    description: post.description[locale as keyof typeof post.description],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  if (slug === '2b-kmutt') {
    return <TwoBKMUTTPost />;
  }

  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <div className={styles.postPage}>
      <div className={styles.postContainer}>
        <Link href={`/${locale}/#blog`} className={styles.backButton}>
          <FiArrowLeft size={20} />
          <span>{locale === 'th' ? 'กลับหน้าหลัก' : locale === 'en' ? 'Back' : locale === 'lo' ? 'ກັບຄືນ' : '返回'}</span>
        </Link>
        
        <article className={styles.postCard}>
          <Image
            src={post.image}
            alt={post.title[locale as keyof typeof post.title]}
            width={800}
            height={400}
            className={styles.postImage}
            priority
          />
          
          <div className={styles.postMeta}>
            <span className={styles.postCategory}>{post.category}</span>
            <span>{post.date}</span>
            <span>{post.readTime} {t('min_read')}</span>
          </div>
          
          <h1 className={styles.postTitle}>{post.title[locale as keyof typeof post.title]}</h1>
          
          <div className={styles.postContent}>
            {post.content[locale as keyof typeof post.content]}
          </div>
        </article>
      </div>
    </div>
  );
}
