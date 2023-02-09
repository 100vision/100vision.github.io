import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "IT",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "Networking",
        icon: "edit",
        prefix: "networking/",
        children: [
        ],
      },
      {
        text: "Windows",
        icon: "edit",
        prefix: "windows/",
        children: [
        ],
      },

    ],
	

  },
  

 
    {
    text: "外语学习",
    icon: "note",
    prefix: "/learning2ndlang/",
	link: "",
	children: [
		{
			text: "english",
			icon: "note",
			link: "",
			prefix: "english/"
		},
		
		{
			text: "日本语",
			icon: "note",
			link: "",
			prefix: "japanese/"
		},
	]
  },
  
  
]);
