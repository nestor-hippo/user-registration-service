import { step, submit, redirect } from '@ministryofjustice/hmpps-forge/core/authoring'
import { dateOfBirthField, continueButton } from './blocks'

export const dateOfBirthStep = step({
  code: 'date-of-birth',
  path: '/date-of-birth',
  title: 'What is your date of birth?',
  reachability: { entryWhen: true },
  blocks: [dateOfBirthField, continueButton],
  onSubmission: [
    submit({
      validate: true,
      onValid: {
        // Upon valid submission, we'll redirect to the next step
        next: [redirect({ goto: 'contact-details' })],
      },
    }),
  ],
})
