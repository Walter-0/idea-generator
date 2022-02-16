import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => (
  <div className="Layout">
    <Header />
    <main className="Content">{props.children}</main>
  </div>
);

export default Layout;
