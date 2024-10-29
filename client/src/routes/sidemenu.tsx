import { Icon } from "@chakra-ui/react";
import { MdHome, MdOutlineShoppingCart } from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/dashboard";
import FormsPage from "views/admin/forms/Form";
import RTL from "views/admin/rtl";

// Auth Imports

const sidemenuRoutes: SideMenuItemType[] = [
  {
    name: "Main Dashboard",
    path: "/",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Form Sheet",
    path: "/forms",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: FormsPage,
  },
  {
    name: "RTL Admin",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: RTL,
  },
];

export default sidemenuRoutes;
