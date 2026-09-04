import {
  Self,
  Condition,
  validation,
  Transformer,
} from '@ministryofjustice/hmpps-forge/core/authoring'
import {
  GovUKTextInput,
  GovUKButton,
  GovUKUtilityClasses,
} from '@ministryofjustice/hmpps-forge/govuk-components'

// In GOV.UK style, a single question page uses the field's label as the main <h1> heading.
// Combining isPageHeading: true with Large label class achieves this spacing.
export const fullNameField = GovUKTextInput({
  code: 'fullName',
  label: {
    text: 'What is your name?',
    classes: GovUKUtilityClasses.Label.Large,
    isPageHeading: true,
  },
  autocomplete: 'name',
  classes: GovUKUtilityClasses.Input.Width20,
  formatters: [Transformer.String.Trim()],
  validWhen: [
    validation({
      condition: Self().match(Condition.IsRequired()),
      message: 'Enter your name',
    }),
    validation({
      condition: Self().match(Condition.String.HasMaxLength(100)),
      message: 'Name must be 100 characters or less',
    }),
  ],
})

export const continueButton = GovUKButton({ text: 'Continue' })
