import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
/*     "/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    }, */
    "/": {
      lang: "zh-CN",
      title: "Tim's Blog",
      description: "博客",
    },
  },

  theme,

  shouldPrefetch: false,
});
