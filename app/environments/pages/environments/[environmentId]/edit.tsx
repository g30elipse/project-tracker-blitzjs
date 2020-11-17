import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getEnvironment from "app/environments/queries/getEnvironment"
import updateEnvironment from "app/environments/mutations/updateEnvironment"
import EnvironmentForm from "app/environments/components/EnvironmentForm"

export const EditEnvironment = () => {
  const router = useRouter()
  const environmentId = useParam("environmentId", "number")
  const [environment, { setQueryData }] = useQuery(getEnvironment, { where: { id: environmentId } })
  const [updateEnvironmentMutation] = useMutation(updateEnvironment)

  return (
    <div>
      <h1>Edit Environment {environment.id}</h1>
      <pre>{JSON.stringify(environment)}</pre>

      <EnvironmentForm
        initialValues={environment}
        onSubmit={async () => {
          try {
            const updated = await updateEnvironmentMutation({
              where: { id: environment.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/environments/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating environment " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditEnvironmentPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEnvironment />
      </Suspense>

      <p>
        <Link href="/environments">
          <a>Environments</a>
        </Link>
      </p>
    </div>
  )
}

EditEnvironmentPage.getLayout = (page) => <Layout title={"Edit Environment"}>{page}</Layout>

export default EditEnvironmentPage
