import { Box, Input, Typography } from "@material-ui/core"
import { ProjectCreateInput } from "@prisma/client"
import ColorPickerField from "app/components/ColorPickerField"
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

      <LabeledTextField fullWidth label="Project Name" name="name" placeholder="My cool project" />
      <ColorPickerField label="Color" name='color' />
    </Form>
  )
}

export default ProjectForm
