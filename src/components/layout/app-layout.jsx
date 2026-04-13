import PropTypes from 'prop-types';
import {Nav, BreadcrumbApp, Main, Footer} from "../index.d.ts";
import ScrollToTopButton from "./scroll-to-top-button.jsx";

const AppLayout = ({children}) => (
  <div className="position-relative">
    <Nav/>
    <Main>
      <BreadcrumbApp/>
      {children}
    </Main>
    <Footer/>
    <ScrollToTopButton/>
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
