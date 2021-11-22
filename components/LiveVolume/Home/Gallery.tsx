import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from "next/image";
import Error from "@/components/Utils/Error";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import { useSwrReadCmsAssetList } from "@/modules/swr";

import '@splidejs/splide/dist/css/splide.min.css';


type Props = {
  liveVolumeN: number | undefined;
}
const Gallery: React.VFC<Props> = (props) => {
  const { data, isLoading, isError } = useSwrReadCmsAssetList(props.liveVolumeN);

  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;

  const imgWidth = 400;
  const imgHeight = 250;

  return (
    <Splide options={{
      type: "loop",
      padding: "15rem"
    }}>
      {data.map(d => (
        <SplideSlide key={d.url}>
          <Image key={d.url} src={d.url} width={imgWidth} height={imgHeight} alt="staff" />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Gallery;