import Image from "next/image";
import Link from "next/link";

import styles from "./HomeBody.module.scss";
import HomeImage from "@/components/Home/HomeImage";
import Reveal from "@/components/Utils/Animation/Reveal";
import LayoutBox from "@/components/Utils/LayoutComponent/LayoutBox";
import ListBox from "@/components/Utils/LayoutComponent/ListBox";
import LoadingPage from "@/components/Utils/Loading/LoadingPage";
import LoginPrompt from "@/components/Utils/LoginPrompt";
import { useSwrReadCmsHomeList } from "@/modules/api";

const HomeBody = () => {
  const { data, isLoading, isError } = useSwrReadCmsHomeList();

  if (isLoading) return <LoadingPage />;
  if (isError) return <LoginPrompt />;

  const next = data[0];
  const past = data.slice(1);

  return (
    <div className={styles.root}>
      <HomeImage />

      <Image src="/notes.png" width="200" height="100" alt="notes" />

      <Reveal animVars={{ y: 0, duration: 2 }}>
        <LayoutBox title="Next Live" fixedChildren={true}>
          <ListBox>
            {[
              <div key={0} className={styles.next}>
                <Link href="/[liveVolume]" as={`/vol${next.liveVolume}`} passHref>
                  <div className={styles.box}>
                    <div className={styles.item}>
                      <div className={styles.arrow}></div>
                      <h3>OG LIVE Vol.{next.liveVolume}</h3>
                      <div className={styles.note}>&#9834;</div>
                    </div>
                  </div>
                </Link>
              </div>
            ]}
          </ListBox>
        </LayoutBox>

        <LayoutBox title="Past Live" fixedChildren={true}>
          <ListBox>
            {past.map(_past => (
              <Link key={_past.liveVolume} href="/[liveVolume]" as={`/vol${_past.liveVolume}`} passHref>
                <div className={styles.box}>
                  <div className={styles.item}>
                    <div className={styles.arrow}></div>
                    <h3>OG LIVE Vol.{_past.liveVolume}</h3>
                    <div className={styles.note}>&#9834;</div>
                  </div>
                </div>
              </Link>
            ))}
          </ListBox>
        </LayoutBox>

        <LayoutBox title="Gallery">

        </LayoutBox>
      </Reveal>
    </div >

  );
};

export default HomeBody;