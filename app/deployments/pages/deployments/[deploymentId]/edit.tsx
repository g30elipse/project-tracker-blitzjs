import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getDeployment from "app/deployments/queries/getDeployment"
import updateDeployment from "app/deployments/mutations/updateDeployment"
import DeploymentForm from "app/deployments/components/DeploymentForm"

export const EditDeployment = () => {
  const router = useRouter()
  const deploymentId = useParam("deploymentId", "number")
  const [deployment, { setQueryData }] = useQuery(getDeployment, { where: { id: deploymentId } })
  const [updateDeploymentMutation] = useMutation(updateDeployment)

  return (
    <div>
      <h1>Edit Deployment {deployment.id}</h1>
      <pre>{JSON.stringify(deployment)}</pre>

      <DeploymentForm
        initialValues={deployment}
        onSubmit={async () => {
          try {
            const updated = await updateDeploymentMutation({
              where: { id: deployment.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/deployments/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating deployment " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditDeploymentPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDeployment />
      </Suspense>

      <p>
        <Link href="/deployments">
          <a>Deployments</a>
        </Link>
      </p>
    </div>
  )
}

EditDeploymentPage.getLayout = (page) => <Layout isContainer title={"Edit Deployment"}>{page}</Layout>

export default EditDeploymentPage
