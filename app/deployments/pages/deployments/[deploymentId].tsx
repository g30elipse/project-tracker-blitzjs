import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getDeployment from "app/deployments/queries/getDeployment"
import deleteDeployment from "app/deployments/mutations/deleteDeployment"

export const Deployment = () => {
  const router = useRouter()
  const deploymentId = useParam("deploymentId", "number")
  const [deployment] = useQuery(getDeployment, { where: { id: deploymentId } })
  const [deleteDeploymentMutation] = useMutation(deleteDeployment)

  return (
    <div>
      <h1>Deployment {deployment.id}</h1>
      <pre>{JSON.stringify(deployment, null, 2)}</pre>

      <Link href={`/deployments/${deployment.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteDeploymentMutation({ where: { id: deployment.id } })
            router.push("/deployments")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowDeploymentPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/deployments">
          <a>Deployments</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Deployment />
      </Suspense>
    </div>
  )
}

ShowDeploymentPage.getLayout = (page) => <Layout isContainer title={"Deployment"}>{page}</Layout>

export default ShowDeploymentPage
