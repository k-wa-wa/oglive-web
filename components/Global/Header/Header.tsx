import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import Account from "@/components/Global/Header/Account";
import Canvas from "@/components/Global/Header/Canvas";
import Theme from "@/components/Global/Header/Theme";
import { useThemeContext } from "@/modules/theme-context";

const Header = () => {
  const { theme } = useThemeContext();

  return (
    <div className={styles.root} style={{ backgroundColor: theme.header }}>
      <div className={styles.header}>

        <Link href="/">
          {theme.name === "light"
            ?
            <div className={styles.title}>
              <h1>OG Live</h1>
            </div>
            :
            <div className={styles.title}>
              <Canvas />
            </div>
          }
        </Link>

        <div className={styles.icon}>
          <Theme />
        </div>
        <div className={styles.icon}>
          <Account />
        </div>

      </div>
    </div>
  );
};

export default Header;