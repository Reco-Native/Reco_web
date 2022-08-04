import React from "react";
import { Icon } from "@iconify/react";

const IconsMain = ({ icon, styles, color }) => {
  return <Icon icon={icon} className={`${styles}`} color={color} />;
};

export default IconsMain;
