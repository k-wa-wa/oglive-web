import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from 'react';
import styles from "./Gallery.module.scss";
import Error from "@/components/Utils/Error";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import { setPhotoGallery } from "@/modules/canvas";
import { useSwrReadCmsAssetList } from "@/modules/swr";


import '@splidejs/splide/dist/css/splide.min.css';

type SplideGalleryProps = {
  data: CmsAssetType[];
  imgWidth: number;
  imgHeight: number;
}
const SplideGallery: React.VFC<SplideGalleryProps> = (props) => {
  return (
    <div className={styles.root}>
      <Splide options={{
        type: "loop",
        padding: "15rem",
        autoHeight: false
      }}>
        {props.data.map(d => (
          <SplideSlide key={d.url}>
            <Image key={d.url} src={d.url} width={props.imgWidth} height={props.imgHeight} alt="staff" />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

type ThreeGalleryProps = {
  data: CmsAssetType[];
}
const ThreeGallery: React.VFC<ThreeGalleryProps> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const imageList = props.data.map(d => d.url);

  useEffect(() => {
    const divWidth = divRef.current?.clientWidth;
    const divHeight = divRef.current?.clientHeight;
    if (ref.current && divWidth && divHeight) {
      setPhotoGallery(ref.current, divWidth, divHeight, imageList);
    }
  }, [imageList]);

  return (
    <div ref={divRef} className={styles.root}>
      <canvas ref={ref}/>
    </div>
  );
};


type Props = {
  liveVolumeN: number | undefined;
}
const Gallery: React.VFC<Props> = (props) => {
  const liveVolumeN = props.liveVolumeN;
  const { data, isLoading, isError } = useSwrReadCmsAssetList(liveVolumeN);
  const [galleryType, setGalleryType] = useState<"Three" | "Splide" | "">("Three");

  const changeGalleryType = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth >= 769) setGalleryType("Three");
    //else if (innerWidth >= 481) setGalleryType("Splide");
  };

  useEffect(() => {
    changeGalleryType();

    window.addEventListener("resize", changeGalleryType);
    return () => window.removeEventListener("resize", changeGalleryType);
  }, []);

  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;
  if (!data) return <LoadingBody />;
  if (data.length === 0) return (
    <div>
      <>準備中</>
      <br />
      <Link href="/[liveVolume]" as={`/vol${liveVolumeN && liveVolumeN - 1}`}>去年の様子はこちら(ページ下部)→</Link>
    </div>
  );

  const imgWidth = 400;
  const imgHeight = 250;

  if (galleryType === "Three") return <ThreeGallery data={data} />;
  else if (galleryType === "Splide") return <SplideGallery data={data} imgWidth={imgWidth} imgHeight={imgHeight} />;
  else return <></>;

};

export default Gallery;
