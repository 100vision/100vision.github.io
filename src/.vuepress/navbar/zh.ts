import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  { text: "生活随笔", icon: "discover", link: "/zh/thoughts/" },
  { text: "外语学习", icon: "discover", link: "/zh/second_lang/" },

  {
    text: "IT",
    icon: "edit",
    prefix: "/zh/it/",
    children: [
      {
        text: "网络",
        icon: "edit",
        prefix: "networking/",
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
