import { FaLinkedin, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/darwinzy_xz/',
    icon: FaInstagram,
    label: 'Instagram Profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nattapong-pongnukrohsiri/',
    icon: FaLinkedin,
    label: 'LinkedIn Profile',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/9bank.photography',
    icon: FaFacebook,
    label: 'Facebook Page',
  },

  {
    name: 'X',
    url: 'https://x.com/darwinzy_xz',
    icon: FaXTwitter,
    label: 'X (Twitter) Profile',
  },
  {
    name: 'Email',
    url: 'mailto:bigbank@example.com',
    icon: FaEnvelope,
    label: 'Send Email',
  },
];
