
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./StaffImage.module.scss";
type Props = {
  imageUrlList: string[];
}
const StaffImage: React.VFC<Props> = (props) => {
  const imgSize = 150;
  const imageUrlList = props.imageUrlList;
  const [imageUrl, setImageUrl] = useState<string>(
    imageUrlList.length > 0 ? imageUrlList[0] : "/staff.svg"
  );

  useEffect(() => {
    const randomChoiceImageUrl = () => {
      imageUrlList.length > 0 && setImageUrl(imageUrlList[Math.floor(Math.random() * imageUrlList.length)]);
    };
    const intervalFunc = setInterval(randomChoiceImageUrl, 2000);
    return () => clearInterval(intervalFunc);
  }, [imageUrlList]);

  return (
    <div className={styles.root}>
      <Image src={imageUrl} width={imgSize} height={imgSize} alt="staff" />
    </div>
  );
};

export default StaffImage;