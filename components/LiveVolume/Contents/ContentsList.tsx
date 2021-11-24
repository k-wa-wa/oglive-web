import Link from "next/link";
import styles from "./ContentsList.module.scss";
import Error from "@/components/Utils/Error";

import ListBox from "@/components/Utils/LayoutComponent/ListBox";
import ListBoxLoading from "@/components/Utils/LayoutComponent/ListBoxLoading";
import NewIcon from "@/components/Utils/NewIcon";
import { useSwrReadCmsContentList } from "@/modules/swr";

const today = new Date();
const NEW_CONTENT_THRESHOLD = 3; // この日数以内にupdateされたcontentは新しいとみなし、newIconをつける

type Props = {
  liveVolume: queryParamsType;
  contentsPerPage: number;
  skip: number;
};
const ContentsList: React.VFC<Props> = (props) => {
  const liveVolumeN = Number(String(props.liveVolume).replace("vol", "")) || undefined;
  const { data, isLoading, isError } = useSwrReadCmsContentList(liveVolumeN, props.contentsPerPage, props.skip);

  if (!data || !data.length) return <>準備中</>;
  if (isLoading) return <ListBoxLoading n={props.contentsPerPage} />;
  if (isError) return <Error />;

  const showNewIcon = (updatedAt: string): boolean => {
    const diff = (today.getTime() - (new Date(updatedAt)).getTime()) / (1000 * 60 * 60 * 24);
    return diff < NEW_CONTENT_THRESHOLD;
  };

  return (
    <div className={styles.root}>
      <ListBox>
        {data.map(_data => (
          <Link
            key={_data.id} href="/[liveVolume]/contents/[contentId]"
            as={`/${props.liveVolume}/contents/${_data.id}`}
            passHref>
            <div className={styles.container}>
              <div className={styles.item}>
                <div>
                  <a className={styles.updatedAt}>{_data.updatedAt.slice(0, 10)}</a>
                  <NewIcon show={showNewIcon(_data.updatedAt)} />
                </div>
                <div className={styles.title}>
                  {_data.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ListBox>
    </div>
  );
};

export default ContentsList;