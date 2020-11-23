import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createEnvironment from "app/environments/mutations/createEnvironment"
import EnvironmentForm from "app/environments/components/EnvironmentForm"
import { Box } from "@material-ui/core"

const NewEnvironmentPage: BlitzPage = () => {
  const router = useRouter()
  const [createEnvironmentMutation] = useMutation(createEnvironment)

  return (
    <div>
      <Box width={600} >
        <EnvironmentForm
          initialValues={{}}
          onSubmit={async (data) => {
            try {
              const environment = await createEnvironmentMutation({ data })
              alert("Success!" + JSON.stringify(environment))
              router.push(`/environments/${environment.id}`)
            } catch (error) {
              alert("Error creating environment " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </Box>

      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </div>
  )
}

NewEnvironmentPage.getLayout = (page) => <Layout isContainer title={"Create New Environment"}>{page}</Layout>

export default NewEnvironmentPage
