import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  { text: "生活随笔", icon: "discover", link: "/zh/生活随笔/" },
  { text: "外语学习", icon: "discover", link: "/zh/外语学习/" },

  {
    text: "信息技术",
    icon: "edit",
    prefix: "/zh/信息技术/",
    children: [
      {
        text: "网络",
        icon: "edit",
        prefix: "网络/",
        link: "",
        children: [
        ],
      },
      {
        text: "虚拟化",
        icon: "edit",
        prefix: "virtualization/",
        children: [

        ],
      },

    ],
  },

]);
