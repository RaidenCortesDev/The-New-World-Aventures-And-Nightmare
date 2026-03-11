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
    /*Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),*/
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
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
        { Component: Component.ReaderMode() },
      ],
    }),
    //Component.Explorer(),
    Component.Explorer({ // Explorador limpio (sin archivos repetidos)
      filterFn: (node) => {
        const isIndex = node.name.toLowerCase() === "index"
        const isDuplicate = node.name === node.parent?.name
        return !isIndex && !isDuplicate
      },
      useSavedState: true,
    }),
  ],
  right: [
    //Component.Graph(),
    Component.Graph({ // La constelación de vuelta a la derecha y con profundidad
      localGraph: {
        depth: 2, 
        linkDistance: 50,
        repulsion: 400,
      },
      globalGraph: {
        depth: -1,
        linkDistance: 100,
        repulsion: 800,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [/*Component.Breadcrumbs()*/Component.Breadcrumbs({
    hideOnRoot: true,
    showCurrentPage: false, // Esto evita que el último nombre se repita
  }), Component.ArticleTitle(), Component.ContentMeta()],
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
