import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import config from "@/config";

export const GET: APIRoute = async context => {
  const fonts = fontData["--font-google-sans-code"];
  const regularFontPath = getFontPathByWeight(fonts, 400);
  const boldFontPath = getFontPathByWeight(fonts, 700);

  if (regularFontPath === undefined || boldFontPath === undefined) {
    throw new Error("Cannot find the font path.");
  }

  const [regularData, boldData] = await Promise.all([
    fetch(experimental_getFontFileURL(regularFontPath, context.url)).then(res =>
      res.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldFontPath, context.url)).then(res =>
      res.arrayBuffer()
    ),
  ]);

  const svg = await satori(
    {
      key: null,
      type: "div",
      props: {
        style: {
          background: "#0d1015",
          color: "#e2e8f0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Google Sans Code",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                boxSizing: "border-box",
                border: "3px solid #22c55e",
                background: "#111620",
                opacity: "0.75",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "relative",
                boxSizing: "border-box",
                border: "3px solid #22c55e",
                background: "#141923",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "24px",
                    width: "90%",
                    height: "90%",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          height: "90%",
                          maxHeight: "90%",
                          overflow: "hidden",
                          textAlign: "left",
                        },
                        children: [
                          {
                            type: "p",
                            props: {
                              style: {
                                fontSize: 24,
                                color: "#22c55e",
                                margin: "0 0 12px",
                                width: "100%",
                              },
                              children: "jl3x@netops:~$ cat identity.txt",
                            },
                          },
                          {
                            type: "p",
                            props: {
                              style: {
                                fontSize: 64,
                                fontWeight: "bold",
                                color: "#f8fafc",
                                margin: "0 0 22px",
                                width: "100%",
                              },
                              children: `>_ ${config.site.title}`,
                            },
                          },
                          {
                            type: "p",
                            props: {
                              style: {
                                fontSize: 28,
                                color: "#94a3b8",
                                margin: 0,
                                width: "100%",
                              },
                              children: config.site.description,
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          marginBottom: "8px",
                          fontSize: 24,
                          color: "#22c55e",
                        },
                        children: [
                          {
                            type: "span",
                            props: {
                              style: { fontSize: 22 },
                              children:
                                "Redes • Observabilidade • Automação • Sec",
                            },
                          },
                          {
                            type: "span",
                            props: {
                              style: {
                                overflow: "hidden",
                                fontWeight: "bold",
                                color: "#e2e8f0",
                              },
                              children: new URL(config.site.url).hostname,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        {
          name: "Google Sans Code",
          data: regularData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Google Sans Code",
          data: boldData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
