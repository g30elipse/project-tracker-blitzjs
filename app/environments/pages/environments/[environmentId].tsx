import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getEnvironment from "app/environments/queries/getEnvironment"
import deleteEnvironment from "app/environments/mutations/deleteEnvironment"

export const Environment = () => {
  const router = useRouter()
  const environmentId = useParam("environmentId", "number")
  const [environment] = useQuery(getEnvironment, { where: { id: environmentId } })
  const [deleteEnvironmentMutation] = useMutation(deleteEnvironment)

  return (
    <div>
      <h1>Environment {environment.id}</h1>
      <pre>{JSON.stringify(environment, null, 2)}</pre>

      <Link href={`/environments/${environment.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteEnvironmentMutation({ where: { id: environment.id } })
            router.push("/environments")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowEnvironmentPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/environments">
          <a>Environments</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Environment />
      </Suspense>
    </div>
  )
}

ShowEnvironmentPage.getLayout = (page) => <Layout isContainer title={"Environment"}>{page}</Layout>

export default ShowEnvironmentPage
