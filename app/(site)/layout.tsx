import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-screen-xl m-auto p-5">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
