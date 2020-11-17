import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getDeployments from "app/deployments/queries/getDeployments"
import Badge from "app/environments/components/Badge"
import DeploymentCard from "app/deployments/components/DeploymentCard"
import { Box } from "@material-ui/core"

const ITEMS_PER_PAGE = 100

export const DeploymentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ deployments, hasMore }] = usePaginatedQuery(getDeployments, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Box display='flex' flexDirection='column' >
        {deployments.map((deployment) => (
          <Box key={deployment.id} my={2}>
            <DeploymentCard deployment={deployment} />
          </Box>
        ))}
      </Box>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const DeploymentsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/deployments/new">
          <a>Create Deployment</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <DeploymentsList />
      </Suspense>
    </div>
  )
}

DeploymentsPage.getLayout = (page) => <Layout isContainer title={"Deployments"}>{page}</Layout>

export default DeploymentsPage
