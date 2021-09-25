import Image from "next/image";
import { useState } from "react";

import styles from "./Account.module.scss";
import { useThemeContext } from "@/modules/theme-context";

const Account = () => {
  const { theme } = useThemeContext();

  return (
    <div className={styles.root}>

      <div>
        <Image src={"/staff.svg"} width={40} height={40} alt="account" />
      </div>

      <div className={styles.accountMenu}>
        <div className={styles.menu}>
          <a href="/api/auth/login" className={styles.action} style={{ color: theme.text }}>{/* eslint-disable-line */}
            Login
          </a>

          <a href="/api/auth/logout" className={styles.action} style={{ color: theme.text }}>{/* eslint-disable-line */}
            Logout
          </a>

          <a className={styles.action} style={{ color: theme.text }}>
            Settings
          </a>
        </div>
      </div>

    </div>
  );
};

export default Account;