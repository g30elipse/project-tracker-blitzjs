import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createDeployment from "app/deployments/mutations/createDeployment"
import DeploymentForm from "app/deployments/components/DeploymentForm"

const NewDeploymentPage: BlitzPage = () => {
  const router = useRouter()
  const [createDeploymentMutation] = useMutation(createDeployment)

  return (
    <div>
      <h1>Create New Deployment</h1>

      <DeploymentForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const deployment = await createDeploymentMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(deployment))
            router.push(`/deployments/${deployment.id}`)
          } catch (error) {
            alert("Error creating deployment " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/deployments">
          <a>Deployments</a>
        </Link>
      </p>
    </div>
  )
}

NewDeploymentPage.getLayout = (page) => <Layout isContainer title={"Create New Deployment"}>{page}</Layout>

export default NewDeploymentPage
