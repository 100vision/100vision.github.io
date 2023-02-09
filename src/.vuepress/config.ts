import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog",
      description: "A blog",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "博客",
      description: "我的博客",
    },
  },

  theme,

  shouldPrefetch: false,
});
