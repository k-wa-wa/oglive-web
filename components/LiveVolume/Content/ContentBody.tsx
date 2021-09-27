
import Reveal from "@/components/Utils/Animation/Reveal";
import Error from "@/components/Utils/Error";
import LayoutBox from "@/components/Utils/LayoutComponent/LayoutBox";
import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import MdViewer from "@/components/Utils/Markdown/MdViewer";
import { useSwrReadCmsContent } from "@/modules/api";

type Props = {
  liveVolume: queryParamsType;
  contentId: queryParamsType;
}
const ContentBody: React.VFC<Props> = (props) => {
  const liveVolume = props.liveVolume;
  const contentId = props.contentId;

  const { data, isLoading, isError } = useSwrReadCmsContent(contentId);

  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;

  return (
    <div>
      <Reveal animVars={{ y: 20 }}>
        <PageTitle title={data.title} />
      </Reveal>

      <Reveal>
        <LayoutBox title="" img="/guitar01.png">
          <MdViewer body={data.body} />
        </LayoutBox>
      </Reveal>
    </div>
  );
};

export default ContentBody;