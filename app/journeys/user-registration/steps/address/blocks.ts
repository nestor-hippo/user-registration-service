import {
  Self,
  Condition,
  Transformer,
  validation,
} from '@ministryofjustice/hmpps-forge/core/authoring'
import {
  GovUKHeading,
  GovUKTextInput,
  GovUKButton,
  GovUKUtilityClasses,
} from '@ministryofjustice/hmpps-forge/govuk-components'

export const heading = GovUKHeading({ text: 'What is your address?', size: 'l' })

export const addressLine1Field = GovUKTextInput({
  code: 'addressLine1',
  label: {
    text: 'Address line 1',
    classes: GovUKUtilityClasses.Label.Medium,
  },
  classes: GovUKUtilityClasses.Input.Width30,
  autocomplete: 'address-line1',
  formatters: [Transformer.String.Trim()],
  validWhen: [
    validation({
      condition: Self().match(Condition.IsRequired()),
      message: 'Enter the first line of your address',
    }),
  ],
})

export const addressLine2Field = GovUKTextInput({
  code: 'addressLine2',
  label: {
    text: 'Address line 2 (optional)',
    classes: GovUKUtilityClasses.Label.Medium,
  },
  classes: GovUKUtilityClasses.Input.Width30,
  autocomplete: 'address-line2',
  formatters: [Transformer.String.Trim()],
})

export const addressTownField = GovUKTextInput({
  code: 'addressTown',
  label: {
    text: 'Town or city',
    classes: GovUKUtilityClasses.Label.Medium,
  },
  classes: GovUKUtilityClasses.Input.Width20,
  autocomplete: 'address-level2',
  formatters: [Transformer.String.Trim()],
  validWhen: [
    validation({
      condition: Self().match(Condition.IsRequired()),
      message: 'Enter your town or city',
    }),
  ],
})

export const addressPostcodeField = GovUKTextInput({
  code: 'addressPostcode',
  label: {
    text: 'Postcode',
    classes: GovUKUtilityClasses.Label.Medium,
  },
  classes: GovUKUtilityClasses.Input.Width10,
  autocomplete: 'postal-code',
  formatters: [Transformer.String.Trim(), Transformer.String.ToUpperCase()],
  validWhen: [
    validation({
      condition: Self().match(Condition.IsRequired()),
      message: 'Enter your postcode',
    }),
    validation({
      condition: Self().match(Condition.Address.IsValidPostcode()),
      message: 'Enter a real postcode',
    }),
  ],
})

export const continueButton = GovUKButton({ text: 'Continue' })
