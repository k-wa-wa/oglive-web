import Image from "next/image";
import styles from "./Theme.module.scss";
import { useThemeContext } from "@/modules/theme-context";


const Menu = () => {
  const { theme, toggleTheme } = useThemeContext();
  const iconPath = theme.name === "light" ? "/ei-sun.svg" : "/ei-moon.svg";
  return (
    <div className={styles.root} onClick={() => toggleTheme()}>
      <Image src={iconPath} width={40} height={40} alt={iconPath} />
    </div>
  );
};

export default Menu;