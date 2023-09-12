import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    type: "item",
    permissions: ["admin", "editor"],
    navLink: "/",
  },
  {
    type: "groupHeader",
    groupTitle: "member Details",
  },

  {
    id: "purchase",
    title: "Purchase",
    type: "item",
    icon: <Icon.ArrowRight size={12} />,
    permissions: ["admin", "editor"],
    navLink: "/app/purchase/AllPurchaceList",
  },

  {
    type: "groupHeader",
    groupTitle: "Profile Page",
  },

  {
    id: "profile",
    title: "My Account",
    type: "item",
    icon: <Icon.ArrowRight size={12} />,
    permissions: ["admin", "editor"],
    navLink: "/pages/profile",
  },

  {
    id: "login",
    title: "Logout ",
    type: "item",
    permissions: ["admin", "editor"],
    navLink: "/pages/login",
  },
];
export default navigationConfig;
