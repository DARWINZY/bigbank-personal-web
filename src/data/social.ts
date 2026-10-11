import { FaFacebook, FaInstagram } from 'react-icons/fa';

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
    name: 'Facebook',
    url: 'https://www.facebook.com/9bank.photography',
    icon: FaFacebook,
    label: 'Facebook Page',
  },
];
