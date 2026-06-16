'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { socialLinks } from '@/data/social';
import styles from '@/styles/contact.module.css';
import uiStyles from '@/styles/ui.module.css';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label={t('label')}
            title={t('title')}
            description={t('description')}
          />
        </AnimatedSection>

        <div className={styles.contactGrid}>
          {/* Contact Form */}
          <AnimatedSection direction="left" delay={0.1}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.formLabel}>
                  {t('form.name')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className={styles.formInput}
                  placeholder={t('form.name_placeholder')}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.formLabel}>
                  {t('form.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className={styles.formInput}
                  placeholder={t('form.email_placeholder')}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-message" className={styles.formLabel}>
                  {t('form.message')}
                </label>
                <textarea
                  id="contact-message"
                  className={styles.formTextarea}
                  placeholder={t('form.message_placeholder')}
                  required
                />
              </div>
              <button
                type="submit"
                className={`${uiStyles.btn} ${uiStyles.btnPrimary} ${styles.formSubmit}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t('form.sending') : t('form.send')}
              </button>
              {status === 'success' && (
                <p className={`${styles.formMessage} ${styles.formSuccess}`}>
                  {t('form.success')}
                </p>
              )}
              {status === 'error' && (
                <p className={`${styles.formMessage} ${styles.formError}`}>
                  {t('form.error')}
                </p>
              )}
            </form>
          </AnimatedSection>

          {/* Social Info */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className={styles.contactInfo}>
              <p className={styles.contactInfoText}>{t('description')}</p>
              <div className={styles.contactOr}>
                <span>{t('or')}</span>
              </div>
              <div className={styles.contactSocialGrid}>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactSocialLink}
                  >
                    <div className={styles.contactSocialIcon}>
                      <link.icon size={18} />
                    </div>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
