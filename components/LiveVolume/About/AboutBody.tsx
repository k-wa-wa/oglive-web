import StaffList from "@/components/LiveVolume/About/StaffList";
import Error from "@/components/Utils/Error";
import LayoutBox from "@/components/Utils/LayoutComponent/LayoutBox";
import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import MdViewer from "@/components/Utils/Markdown/MdViewer";
import { useSwrReadCmsAbout } from "@/modules/swr";

type Props = {
  liveVolume: queryParamsType;
}
const AboutBody: React.VFC<Props> = (props) => {
  const liveVolume = props.liveVolume;
  const liveVolumeN = Number(String(liveVolume).replace("vol", "")) || undefined;

  const { data, isLoading, isError } = useSwrReadCmsAbout(liveVolumeN);

  if (data === "") return <a>create</a>;
  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;

  return (
    <div>
      <PageTitle title={data.title} />

      <LayoutBox title="About" img="/key.png">
        <MdViewer body={data.body} />
      </LayoutBox>

      <LayoutBox title="Staff" img="/caj.png" fixedChildren={true}>
        <StaffList />
      </LayoutBox>
    </div>
  );
};

export default AboutBody;