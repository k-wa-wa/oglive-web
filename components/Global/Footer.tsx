import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { useThemeContext } from "@/modules/theme-context";

const Footer = () => {
  const { theme } = useThemeContext();
  return (
    <div className={styles.root} style={{ backgroundColor: theme.footer }}>

      <div className={styles.flex}>
        <div className={styles.box}>
          <h4>OG Live History</h4>
          <div>
            <Link href="/">
              <a>
                <Image src="/icons/back.svg" width={16} height={16} alt="top"/>
                <span>Top Page</span>
              </a>
            </Link>
          </div>
        </div>

        <div className={styles.box}>
          <h4>Unplugged</h4>
          <div>
            <a href="https://hit-unplugged.com/" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/website.svg" width={16} height={16} alt="website"/>
              <span>HP</span>
            </a>
          </div>

          <div>
            <a href="https://twitter.com/unplugged_h_t" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/twitter.svg" width={16} height={16} alt="twitter"/>
              <span>Twitter</span>
            </a>
          </div>

          <div>
            <a href="https://www.youtube.com/channel/UCqT2BJzo7rvbg5LTS_Pa-tg" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/youtube.svg" width={16} height={16} alt="youtube" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        <div className={styles.box}>
          <h4>About this website</h4>
          <div>
            <a href="https://github.com/ko-he-e/oglive-web" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/search.svg" width={16} height={16} alt="search" />
              <span>View source</span>
            </a>
          </div>

          <div>
            <a href="https://github.com/ko-he-e/oglive-web/issues" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/bug.svg" width={16} height={16} alt="bug" />
              <span>Report a bug</span>
            </a>
          </div>

          <div>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/privacy.svg" width={16} height={16} alt="privacy" />
              <span>Privacy Policy</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Footer;