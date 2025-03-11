import ReduxProvider from '@/components/ReduxProvider';
import '@/styles/index.css';

export const metadata = {
  title: 'Mini Thread',
  description: 'App to post your thoughts',
  icons: {
    icon: '/images/logos/minithread-favicon.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
