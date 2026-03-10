import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
    "The New World Aventures And Nightmare": "https://the-new-world-aventures-and-nightmare.onrender.com/",
    //"Comunidad": "https://discord.com",
  },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    //Component.PageTitle(),
    Component.Graph({
      localGraph: {
        depth: 2,           // Muestra conexiones de segundo nivel (clave para que no se vea vacío)
        linkDistance: 50,
        repulsion: 400,
        fontSize: 0.6,
      },
      globalGraph: {
        depth: -1,          // El mapa global siempre muestra TODO
        linkDistance: 100,
        repulsion: 800,
      },
    }),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    //Component.Explorer(),
    Component.Explorer({
      filterFn: (node) => {
        // Filtro para que NO muestre archivos que se llamen "index" 
        // o que tengan el mismo nombre que su carpeta
        const isIndex = node.name.toLowerCase() === "index"
        const isDuplicate = node.name === node.parent?.name
        return !isIndex && !isDuplicate
      },
      useSavedState: true,
    })
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
