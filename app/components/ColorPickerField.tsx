import { Box, Input, TextField, Typography } from "@material-ui/core"
import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface ColorPickerFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
    /** Field name. */
    name: string
    /** Field label. */
    label: string
    fullWidth?: boolean
    /** Field type. Doesn't include radio buttons and checkboxes */
    type?: "text" | "password" | "email" | "number"
    outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const ColorPickerField = React.forwardRef<HTMLInputElement, ColorPickerFieldProps>(
    ({ name, fullWidth, label, outerProps, ...props }, ref) => {
        const {
            input,
            meta: { touched, error, submitError, submitting },
        } = useField(name)

        const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

        return (
            <div {...outerProps}>
                <Box width={100}>
                    <Typography variant='caption'>{label}</Typography>
                    <Input type='color' {...input} fullWidth />
                </Box>
            </div>
        )
    },
)

export default ColorPickerField
