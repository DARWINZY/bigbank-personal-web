'use client';

import { useRef, useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import { socialLinks } from '@/data/social';
import styles from '@/styles/contact.module.css';
import uiStyles from '@/styles/ui.module.css';

// Even with autofill and a pasted message, a person needs longer than this; scripts don't
const MIN_FILL_MS = 1500;

export default function ContactSection() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const startedAt = useRef<number | null>(null);

  // The result stays until the person types again, so nobody misses it
  const showResult = (result: 'success' | 'error') => setStatus(result);
  const clearResult = () => {
    if (status === 'success' || status === 'error') setStatus('idle');
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
    <section className={styles.contact}>
      <div className="container">
        <SectionTitle as="h1" label={t('label')} title={t('title')} description={t('description')} />

        <div className={styles.contactGrid}>
          <form
            className={styles.contactForm}
            onSubmit={handleSubmit}
            onFocus={() => { startedAt.current ??= Date.now(); }}
            onInput={clearResult}
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
            <button
              type="submit"
              className={`${uiStyles.btn} ${uiStyles.btnPrimary} ${styles.formSubmit}`}
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {status === 'sending' ? t('form.sending') : t('form.send')}
            </button>
            {/* Always in the page, so screen readers announce what appears inside it */}
            <div aria-live="polite">
              {status === 'success' && (
                <p className={`${styles.formMessage} ${styles.formSuccess}`}>
                  {t('form.success')}
                </p>
              )}
              {status === 'error' && (
                <p className={`${styles.formMessage} ${styles.formError}`} role="alert">
                  {t('form.error')}
                </p>
              )}
            </div>
          </form>

          {/* Phones show these first: one tap to message is quicker than the form */}
          <aside className={styles.contactInfo}>
            <p className={styles.contactOr}>{t('or')}</p>
            <ul className={styles.socialList}>
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialRow}>
                    <span className={styles.socialIcon} data-network={link.name.toLowerCase()}>
                      <link.icon size={18} aria-hidden="true" />
                    </span>
                    <span className={styles.socialName}>{link.name}</span>
                    {link.name === 'Instagram' && <span className={styles.recommended}>{t('recommended')}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
