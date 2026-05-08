/**
 * BRANDING CONFIG — edit this file to white-label BookShelfIQ for any client.
 * All colours, names, and copy are centralised here.
 */
const branding = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'BookShelfIQ',
  tagline: process.env.NEXT_PUBLIC_TAGLINE || 'Stop guessing your book\'s keywords. Start publishing strategically.',
  logoText: process.env.NEXT_PUBLIC_LOGO_TEXT || 'BookShelfIQ',
  primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#1e3a8a',
  accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || '#d97706',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@bookshelfiq.com',
  company: process.env.NEXT_PUBLIC_COMPANY || 'BookShelfIQ',
};

export default branding;
