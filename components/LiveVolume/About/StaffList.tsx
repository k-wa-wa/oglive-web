import styles from "./StaffList.module.scss";
import Staff from "@/components/LiveVolume/About/Staff";


const StaffList = () => {
  const data: CmsStaffType[] = [];
  //const staffData = data.length >= 1 ? data : []
  const staffData = [
    { imageUrl: "/staff.svg", name: "Unknown", nickname: "unknown", id: "1", comment: "comment"}, 
    { imageUrl: "/staff.svg", name: "Unknown", nickname: "unknown", id: "2", comment: "" },
    { imageUrl: "/staff.svg", name: "Unknown", nickname: "unknown", id: "3", comment: "" }, 
    { imageUrl: "/staff.svg", name: "Unknown", nickname: "unknown", id: "4", comment: "" },
    { imageUrl: "/staff.svg", name: "Unknown", nickname: "unknown", id: "5", comment: "" }
  ];

  return (
    <div className={styles.root}>
      {staffData.map(staff => (
        <div key={staff.id} className={styles.itemBox}>
          <Staff staff={staff} />
        </div>
      ))}

    </div>
  );
};

export default StaffList;