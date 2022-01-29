import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => (
  <div className="Layout">
    <Header />
    <main className="Content">{props.children}</main>
    <Footer />
  </div>
);

export default Layout;
