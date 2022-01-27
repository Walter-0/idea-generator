import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => (
  <div className="Layout">
    <Header />
    <main className="Content">{props.children}</main>
    <Footer />
  </div>
);

export default Layout;
