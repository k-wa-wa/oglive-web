import Image from "next/image";
import Error from "@/components/Utils/Error";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import { useSwrReadCmsAssetList } from "@/modules/swr";

type Props = {
  liveVolumeN: number | undefined;
}
const Gallery: React.VFC<Props> = (props) => {
  const { data, isLoading, isError } = useSwrReadCmsAssetList(props.liveVolumeN);
  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;
  return (
    <div>
      {data.map(d => (
        <Image key={d.url} src={d.url} width={600} height={300} alt="staff" />
      ))}
    </div>
  );
};

export default Gallery;