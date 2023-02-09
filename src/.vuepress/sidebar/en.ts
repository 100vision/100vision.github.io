import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",

    {
      text: "IT",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
	
	{
      text: "外语学习",
      icon: "note",
      prefix: "learning2ndlang/",
      children: "structure",
    },
    "intro",
  ],
});
