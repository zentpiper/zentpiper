import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppButton from "./WhatsAppButton";
import Breadcrumbs from "./Breadcrumbs";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <Breadcrumbs />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}

export default Layout;
