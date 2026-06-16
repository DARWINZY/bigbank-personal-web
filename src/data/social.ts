import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/bigbank',
    icon: FaGithub,
    label: 'GitHub Profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/bigbank',
    icon: FaLinkedin,
    label: 'LinkedIn Profile',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/bigbank',
    icon: FaFacebook,
    label: 'Facebook Page',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/bigbank',
    icon: FaInstagram,
    label: 'Instagram Profile',
  },
  {
    name: 'X',
    url: 'https://x.com/bigbank',
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
