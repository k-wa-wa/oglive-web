import router from "next/router";

import styles from "./ContentsBody.module.scss";
import ContentsList from "@/components/LiveVolume/Contents/ContentsList";
import Error from "@/components/Utils/Error";
import LayoutBox from "@/components/Utils/LayoutComponent/LayoutBox";

import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import { useSwrReadCmsNofContents } from "@/modules/api";

const CONTENTS_PER_PAGE = 5;

type Props = {
  liveVolume: queryParamsType;
  page: queryParamsType;
}
const ContentsBody: React.VFC<Props> = (props) => {
  const liveVolume = props.liveVolume;
  const liveVolumeN = Number(String(liveVolume).replace("vol", "")) || undefined;

  const { data, isLoading, isError } = useSwrReadCmsNofContents(liveVolumeN);
  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;

  const pageN = Number(props.page) || 1;
  const skip = CONTENTS_PER_PAGE * (pageN - 1);
  const NofContents = data.count;

  return (
    <div className={styles.root}>
      <PageTitle title="その他のお知らせ" />

      <LayoutBox title="Contents" img="/gt.png">
        <ContentsList
          liveVolume={liveVolume}
          contentsPerPage={CONTENTS_PER_PAGE} skip={skip} />

        <div className={styles.bottom}>
          <div
            className={styles.back}
            style={{ display: pageN >= 2 ? "inline-block" : "none" }}
            onClick={() => router.push(`/${liveVolume}/contents?page=${pageN - 1}`)} />

          <div>
            {pageN}ページ
            (/{Math.ceil(NofContents / CONTENTS_PER_PAGE)}ページ中)
          </div>

          <div
            className={styles.next}
            style={{ display: pageN * CONTENTS_PER_PAGE < NofContents ? "inline-block" : "none" }}
            onClick={() => true && router.push(`/${liveVolume}/contents?page=${pageN + 1}`)} />
        </div>
      </LayoutBox>
    </div>
  );
};

export default ContentsBody;