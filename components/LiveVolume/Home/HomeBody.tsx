import styles from "./HomeBody.module.scss";
import Gallery from "@/components/LiveVolume/Home/Gallery";
import WhatsNew from "@/components/LiveVolume/Home/WhatsNew";
import Error from "@/components/Utils/Error";
import LayoutBox from "@/components/Utils/LayoutComponent/LayoutBox";
import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import MdViewer from "@/components/Utils/Markdown/MdViewer";
import { useSwrReadCmsHome } from "@/modules/swr";

type Props = {
  liveVolume: queryParamsType;
};
const HomeBody: React.VFC<Props> = (props) => {
  const liveVolume = props.liveVolume;

  const liveVolumeN = Number(String(liveVolume).replace("vol", "")) || undefined;
  const { data, isLoading, isError } = useSwrReadCmsHome(liveVolumeN);

  if (data === "") return <a>create</a>;
  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;

  return (
    <div className={styles.root}>
      <PageTitle title={data.title} />

      <LayoutBox title="Home" img="/gt.png">
        <MdViewer body={data.body} />
      </LayoutBox>

      <LayoutBox title="What's New" img="/caj.png">
        <WhatsNew liveVolume={liveVolume} />
      </LayoutBox>

      <LayoutBox title="Gallery" img="/key.png">
        <Gallery liveVolumeN={liveVolumeN}/>
      </LayoutBox>
    </div >
  );
};

export default HomeBody;