import { step, submit, redirect } from '@ministryofjustice/hmpps-forge/core/authoring'
import { heading, emailField, phoneField, continueButton } from './blocks'

export const contactDetailsStep = step({
  code: 'contact-details',
  path: '/contact-details',
  title: 'What are your contact details?',
  reachability: { entryWhen: true },
  blocks: [heading, emailField, phoneField, continueButton],
  onSubmission: [
    submit({
      validate: true,
      onValid: {
        // Redirect to the next step (address)
        next: [redirect({ goto: 'address' })],
      },
    }),
  ],
})
