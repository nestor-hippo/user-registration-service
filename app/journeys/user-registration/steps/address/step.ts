import { step, submit, redirect } from '@ministryofjustice/hmpps-forge/core/authoring'
import {
  heading,
  addressLine1Field,
  addressLine2Field,
  addressTownField,
  addressPostcodeField,
  continueButton,
} from './blocks'

export const addressStep = step({
  code: 'address',
  path: '/address',
  title: 'What is your address?',
  reachability: { entryWhen: true },
  blocks: [
    heading,
    addressLine1Field,
    addressLine2Field,
    addressTownField,
    addressPostcodeField,
    continueButton,
  ],
  onSubmission: [
    submit({
      validate: true,
      onValid: {
        // Upon valid submission, we'll redirect to confirmation
        next: [redirect({ goto: 'confirmation' })],
      },
    }),
  ],
})
