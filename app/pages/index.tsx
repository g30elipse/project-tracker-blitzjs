import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/layouts/Layout"
// import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import React, { Suspense } from "react"
import { Typography } from "@material-ui/core"
import Landing from "app/components/Landing"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  // const [logoutMutation] = useMutation(logout)

  if (currentUser)
    return (
      <Landing />
    )

  return (
    <>
      <Link href="/login">
        <a className="button small">
          <strong>Login</strong>
        </a>
      </Link>
    </>
  )
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <div >
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>

      </main>


    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
