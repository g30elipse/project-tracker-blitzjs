import { EnvironmentCreateInput } from "@prisma/client"
import ColorPickerField from "app/components/ColorPickerField"
import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"

type EnvironmentFormProps = {
  initialValues: any
  onSubmit: (data: EnvironmentCreateInput) => void
}

const EnvironmentForm = ({ initialValues, onSubmit }: EnvironmentFormProps) => {
  return (
    <Form
      submitText="SAVE"
      // schema={LoginInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >

      <LabeledTextField fullWidth label="Name" name="name" placeholder="development" />
      <ColorPickerField label="Color" name='color' />
    </Form>
  )
}

export default EnvironmentForm
