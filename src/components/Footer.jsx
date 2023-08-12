// Icons
import {
  FaTwitter,
  FaFacebookF,
  FaRss,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <p className="copyright">
            {new Date().getFullYear()}
            <span> Nike, Inc. Tüm Hakları Saklıdır ©</span>
          </p>
          <ul className="socialList">
            <li className="socialItem">Follow us</li>
            <Link to="https://twitter.com/Nike">
              <li className="socialItem">
                <FaTwitter />
              </li>
            </Link>
            <Link to="https://www.facebook.com/nike/">
              <li className="socialItem">
                <FaFacebookF />
              </li>
            </Link>
            <Link to="https://www.instagram.com/nike/">
              <li className="socialItem" >
                <FaInstagram />
              </li>
            </Link>
            <Link to="https://www.youtube.com/user/NIKE">
              <li className="socialItem">
                <FaYoutube />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
