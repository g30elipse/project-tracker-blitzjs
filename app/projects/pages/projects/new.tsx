import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProject from "app/projects/mutations/createProject"
import ProjectForm from "app/projects/components/ProjectForm"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Box } from "@material-ui/core"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)

  const user = useCurrentUser();
  if (!user) return null;

  return (
    <div>
      <Box width={600} py={4}>
        <ProjectForm
          initialValues={{}}
          onSubmit={async (formData) => {
            try {
              // console.log("data to submit", data);
              // return;
              const project = await createProjectMutation({ data: { ...formData, user: { connect: { id: user.id } } } })
              alert("Success!" + JSON.stringify(project))
              router.push(`/projects/${project.id}`)
            } catch (error) {
              alert("Error creating project " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </Box>
      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}

NewProjectPage.getLayout = (page) => <Layout isContainer title={"Create New Project"}>{page}</Layout>

export default NewProjectPage
