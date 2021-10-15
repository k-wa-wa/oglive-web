import styles from "./WhatsNew.module.scss";
import ContentsList from "@/components/LiveVolume/Contents/ContentsList";
import ViewAll from "@/components/LiveVolume/Home/ViewAll";

const N_OF_CONTENTS = 3;
type Props = {
  liveVolume: queryParamsType
}
const WhatsNew: React.FC<Props> = (props) => {
  const liveVolume = props.liveVolume;

  return (
    <div className={styles.root}>
      <ContentsList liveVolume={liveVolume} contentsPerPage={N_OF_CONTENTS} skip={0} />
      <ViewAll liveVolume={liveVolume} />
    </div>
  );
};

export default WhatsNew;