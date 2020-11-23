import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getProject from "app/projects/queries/getProject"
import updateProject from "app/projects/mutations/updateProject"
import ProjectForm from "app/projects/components/ProjectForm"
import { Box } from "@material-ui/core"

export const EditProject = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [project, { setQueryData }] = useQuery(getProject, { where: { id: projectId } })
  const [updateProjectMutation] = useMutation(updateProject)

  return (
    <div>
      <Box width={600} py={4}>
        <ProjectForm
          initialValues={{ active: project.active, color: project.color, name: project.name }}
          onSubmit={async (formData) => {
            try {
              const updated = await updateProjectMutation({
                where: { id: project.id },
                data: formData,
              })
              await setQueryData({ ...project, ...updated })
              alert("Success!" + JSON.stringify(updated))
              router.push(`/projects/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error creating project " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </Box>
    </div>
  )
}

const EditProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>

      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}

EditProjectPage.getLayout = (page) => <Layout isContainer title={"Edit Project"}>{page}</Layout>

export default EditProjectPage
