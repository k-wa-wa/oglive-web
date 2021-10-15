import { useUser } from '@auth0/nextjs-auth0';
import Image from "next/image";

import styles from "./Account.module.scss";
import { useThemeContext } from "@/modules/theme-context";

const Account = () => {
  const { theme } = useThemeContext();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <></>;
  if (error) return <></>;

  return (
    <div className={styles.root}>

      <div>
        <Image src={"/staff.svg"} width={40} height={40} alt="account" />
      </div>

      <div className={styles.accountMenu}>
        <div className={styles.menu}>
          {
            user
              ?
              <a href="/api/auth/logout" className={styles.action} style={{ color: theme.text }}>{/* eslint-disable-line */}
                Logout
              </a>
              :
              <a href="/api/auth/login" className={styles.action} style={{ color: theme.text }}>{/* eslint-disable-line */}
                Login
              </a>
          }

          <a className={styles.action} style={{ color: theme.text }}>
            Settings(作成中)
          </a>
        </div>
      </div>

    </div>
  );
};

export default Account;