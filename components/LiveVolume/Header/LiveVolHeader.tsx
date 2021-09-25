import Link from 'next/link';
import { useState } from 'react';
import styles from "./LiveVolHeader.module.scss";
import H1 from '@/components/LiveVolume/Header/H1';

import Parallax from '@/components/Utils/Animation/Parallax';
import Reveal from "@/components/Utils/Animation/Reveal";

type Props = {
  liveVolume: queryParamsType;
};
const LiveVolHeader: React.VFC<Props> = (props) => {
  const liveVolume = props.liveVolume;

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const closeMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <div className={styles.root} >
      <H1 liveVolume={liveVolume} />

      <div className={showMenu ? styles.open : ""}>
        <div className={styles.overlay} onClick={() => closeMenu()} />

        <div className={styles.toggler} onClick={() => setShowMenu(!showMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={styles.menuBox}>
          <div className={styles.box} onClick={() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }); }}>
            <Link href="/[liveVolume]" as={`/${liveVolume}`} passHref>
              <div className={styles.menuItem}>
                <a>Home</a>
              </div>
            </Link>

            <Link href="/[liveVolume]/about" as={`/${liveVolume}/about`} passHref>
              <div className={styles.menuItem}>
                <a>About</a>
              </div>
            </Link>

            <Link href="/[liveVolume]/contents" as={`/${liveVolume}/contents`} passHref>
              <div className={styles.menuItem}>
                <a>Contents</a>
              </div>
            </Link>

            <Link href="/[liveVolume]/contact" as={`/${liveVolume}/contact`} passHref>
              <div className={styles.menuItem}>
                <a>Contact</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVolHeader;