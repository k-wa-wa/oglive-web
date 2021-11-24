import styles from "./StaffList.module.scss";
import Staff from "@/components/LiveVolume/About/Staff";
import Error from "@/components/Utils/Error";
import LoadingBody from "@/components/Utils/Loading/LoadingBody";
import { useSwrReadCmsStaffList } from "@/modules/swr";


type Props = {
  liveVolumeN: number | undefined;
}
const StaffList: React.VFC<Props> = (props) => {
  const { data, isLoading, isError } = useSwrReadCmsStaffList(props.liveVolumeN);

  if (!data) return <></>;
  if (isLoading) return <LoadingBody />;
  if (isError) return <Error />;

  return (
    <div className={styles.root}>
      {data.map(staff => (
        <div key={staff.id} className={styles.itemBox}>
          <Staff staff={staff} />
        </div>
      ))}
    </div>
  );
};

export default StaffList;