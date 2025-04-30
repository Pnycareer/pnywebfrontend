// utils/getIconComponent.js
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as CgIcons from "react-icons/cg";

const iconLibraries = {
  fa: FaIcons,
  md: MdIcons,
  gi: GiIcons,
  cg: CgIcons,
};

export function getIconComponent(iconName) {
  const prefix = iconName.slice(0, 2).toLowerCase(); // e.g. "Fa"
  const lib = iconLibraries[prefix];
  return lib?.[iconName] || null;
}
