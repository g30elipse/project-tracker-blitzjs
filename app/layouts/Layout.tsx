import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import AppHeader from "app/components/AppHeader"
import { Box, Divider, Typography } from "@material-ui/core"

type LayoutProps = {
  title?: string
  children: ReactNode
  isContainer?: boolean
}

const Layout = ({ title, children, isContainer = false }: LayoutProps) => {
  return (
    <>
      <Suspense fallback='Loading..'>
        <Head>
          <title>{title || "project-tracker"}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppHeader />
        {isContainer ? <Box p={10}>
          <Typography variant='h5'>{title}</Typography>
          <Divider />
          {children}
        </Box> : children}
      </Suspense>
    </>
  )
}

export default Layout
