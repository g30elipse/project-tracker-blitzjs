import { Box, Input } from "@material-ui/core"
import { ProjectCreateInput } from "@prisma/client"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"

type ProjectFormProps = {
  initialValues: Partial<ProjectCreateInput>
  onSubmit: (data: ProjectCreateInput) => void
}

const ProjectForm = ({ initialValues, onSubmit }: ProjectFormProps) => {
  return (
    // <form
    //   onSubmit={(event) => {
    //     event.preventDefault()
    //     onSubmit(event)
    //   }}
    // >
    //   <div>Put your form fields here. But for now, just click submit</div>
    //   <div>{JSON.stringify(initialValues)}</div>
    //   <button>Submit</button>
    // </form>
    <Form
      submitText="SAVE"
      // schema={LoginInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >

      <LabeledTextField label="Project Name" name="name" placeholder="My cool project" />
      <Box width='100%' height={20}>
        <Input type='color' fullWidth />
      </Box>
    </Form>
  )
}

export default ProjectForm
