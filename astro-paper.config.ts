import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://jl3xroot.github.io/",
    title: "jl3x | NetOps & Sec",
    description: "Write-ups técnicos, arquitetura de redes ISP, monitoramento, automação e estudos práticos em cibersegurança.",
    author: "jl3x",
    profile: "https://github.com/jl3xroot",
    ogImage: "default-og.jpg",
    lang: "pt-BR",
    timezone: "America/Belem",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/jl3xroot/jl3xroot.github.io/edit/main/",
    },
    search: "pagefind",
    toc: true,
  },
  socials: [
    { name: "github",   url: "https://github.com/jl3xroot" },
    { name: "mail",     url: "mailto:jhonatancorreit@gmail.com" },
  ],
  shareLinks: [
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
