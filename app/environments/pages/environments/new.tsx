import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createEnvironment from "app/environments/mutations/createEnvironment"
import EnvironmentForm from "app/environments/components/EnvironmentForm"

const NewEnvironmentPage: BlitzPage = () => {
  const router = useRouter()
  const [createEnvironmentMutation] = useMutation(createEnvironment)

  return (
    <div>
      <h1>Create New Environment</h1>

      <EnvironmentForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const environment = await createEnvironmentMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(environment))
            router.push(`/environments/${environment.id}`)
          } catch (error) {
            alert("Error creating environment " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/environments">
          <a>Environments</a>
        </Link>
      </p>
    </div>
  )
}

NewEnvironmentPage.getLayout = (page) => <Layout isContainer title={"Create New Environment"}>{page}</Layout>

export default NewEnvironmentPage
