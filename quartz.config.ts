import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Configuración de New World Aventures And Nightmare 
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The New World Aventures And Nightmare", 
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "es-ES",
    baseUrl: "the-new-world-aventures-and-nightmare.onrender.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fcfaf2", // Fondo tipo papel/pergamino claro
          lightgray: "#e5e5e5", // Bordes suaves
          gray: "#999999", // Metadatos
          darkgray: "#4e4e4e", // Texto principal (gris oscuro, no negro puro)
          dark: "#2b2b2b", // Títulos
          secondary: "#9a1e1e", // Rojo sangre seco (más elegante en fondo claro)
          tertiary: "#6e1414", // Rojo más oscuro al pasar el mouse
          highlight: "rgba(154, 30, 30, 0.07)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0f0f0f",       // Fondo negro profundo
          lightgray: "#282828",   // Bordes oscuros
          gray: "#646464",        // Metadatos
          darkgray: "#d4d4d4",    // Texto principal (gris claro)
          dark: "#ffffff",        // Títulos (blanco)
          secondary: "#ff3e3e",   // Rojo brillante (resalta en la oscuridad)
          tertiary: "#9a1e1e",    // Rojo sangre al pasar el mouse
          highlight: "rgba(255, 62, 62, 0.1)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config