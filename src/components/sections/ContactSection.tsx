'use client';

import { useRef, useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import MagneticButton from '@/components/ui/MagneticButton';
import { socialLinks } from '@/data/social';
import styles from '@/styles/contact.module.css';
import uiStyles from '@/styles/ui.module.css';

// Even with autofill and a pasted message, a person needs longer than this; scripts don't
const MIN_FILL_MS = 1500;

export default function ContactSection() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const startedAt = useRef<number | null>(null);

  const showResult = (result: 'success' | 'error') => {
    setStatus(result);
    setTimeout(() => setStatus('idle'), result === 'success' ? 6000 : 4000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Spam traps: a filled hidden field, or a form submitted without any real typing.
    // Bots get the normal success message so they have nothing to adjust to.
    const tooFast = startedAt.current === null || Date.now() - startedAt.current < MIN_FILL_MS;
    if (formData.get('_honey') || tooFast) {
      form.reset();
      showResult('success');
      return;
    }

    setStatus('sending');

    // Convert FormData to JSON
    const object: Record<string, string> = {};
    formData.forEach((value, key) => {
      object[key] = value.toString();
    });

    try {
      // Using FormSubmit.co which allows sending directly to an email or via token
      const formSubmitTarget = process.env.NEXT_PUBLIC_FORMSUBMIT_TOKEN || "bankntp8@gmail.com";
      const response = await fetch(`https://formsubmit.co/ajax/${formSubmitTarget}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...object,
            _subject: "New message from your Portfolio!",
            _template: "table",
            _captcha: "false" // MUST be false for AJAX to work on production domains
        })
      });

      const data = await response.json();

      if (response.ok) {
        form.reset();
        startedAt.current = null;
        showResult('success');
      } else {
        console.error("Form submission error:", data);
        showResult('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showResult('error');
    }
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
            <form
              className={styles.contactForm}
              onSubmit={handleSubmit}
              onFocus={() => { startedAt.current ??= Date.now(); }}
            >
              {/* Honeypot: hidden from people, irresistible to form-filling bots */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.formLabel}>
                  {t('form.name')}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={styles.formInput}
                  placeholder={t('form.name_placeholder')}
                  maxLength={100}
                  autoComplete="name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.formLabel}>
                  {t('form.email')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={styles.formInput}
                  placeholder={t('form.email_placeholder')}
                  maxLength={254}
                  autoComplete="email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-message" className={styles.formLabel}>
                  {t('form.message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={styles.formTextarea}
                  placeholder={t('form.message_placeholder')}
                  maxLength={5000}
                  required
                />
              </div>
              <MagneticButton className={styles.formSubmit}>
                <button
                  type="submit"
                  className={`${uiStyles.btn} ${uiStyles.btnPrimary}`}
                  style={{ width: '100%' }}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t('form.sending') : t('form.send')}
                </button>
              </MagneticButton>
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
          <AnimatedSection direction="right" delay={0.2} className={styles.contactInfoWrap}>
            <div className={styles.contactInfo}>
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
                    className={`${styles.contactSocialLink} ${link.name === 'Instagram' ? styles.contactSocialLinkGold : ''}`}
                  >
                    {link.name === 'Instagram' && (
                      <span className={styles.contactSocialBadge}>{t('recommended')}</span>
                    )}
                    <div className={`${styles.contactSocialIcon} ${link.name === 'Instagram' ? styles.contactSocialIconGold : ''}`}>
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
