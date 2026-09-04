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
  GovUKHeading,
} from '@ministryofjustice/hmpps-forge/govuk-components'

export const heading = GovUKHeading({
  text: 'What are your contact details?',
  size: 'l',
})

export const emailField = GovUKTextInput({
  code: 'emailAddress',
  label: {
    text: 'Email address',
    classes: GovUKUtilityClasses.Label.Medium,
  },
  autocomplete: 'email',
  classes: GovUKUtilityClasses.Input.Width20,
  formatters: [Transformer.String.Trim()],
  validWhen: [
    validation({
      condition: Self().match(Condition.IsRequired()),
      message: 'Enter your email address',
    }),
    validation({
      condition: Self().match(Condition.Email.IsValidEmail()),
      message: 'Enter a valid email address',
    }),
  ],
})

export const phoneField = GovUKTextInput({
  code: 'phoneNumber',
  label: {
    text: 'Phone number',
    classes: GovUKUtilityClasses.Label.Medium,
  },
  autocomplete: 'tel',
  classes: GovUKUtilityClasses.Input.Width20,
  formatters: [Transformer.String.Trim()],
  validWhen: [
    validation({
      condition: Self().match(Condition.IsRequired()),
      message: 'Enter your phone number',
    }),
    validation({
      condition: Self().match(Condition.Phone.IsValidPhoneNumber()),
      message: 'Enter a valid phone number',
    }),
  ],
})

export const continueButton = GovUKButton({ text: 'Continue' })
