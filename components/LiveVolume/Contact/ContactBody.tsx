import Error from "@/components/Utils/Error";
import LayoutBox from "@/components/Utils/LayoutComponent/LayoutBox";
import PageTitle from "@/components/Utils/LayoutComponent/PageTitle";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import MdViewer from "@/components/Utils/Markdown/MdViewer";
import { useSwrReadCmsContactList } from "@/modules/swr";

type Props = {
  liveVolume: queryParamsType
}
const ContactBody: React.VFC<Props> = (props) => {
  const liveVolume = props.liveVolume;

  const liveVolumeN = Number(String(liveVolume).replace("vol", "")) || undefined;
  const { data, isLoading, isError } = useSwrReadCmsContactList(liveVolumeN);

  if (!data) return <LoadingBody />;
  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;

  return (
    <div>
      <PageTitle title="お問い合わせ" />

      {data.map(d => (
        <LayoutBox key={d.id} title={d.title}>
          <MdViewer body={d.body} />
        </LayoutBox>
      ))}
    </div>
  );
};

export default ContactBody;