import { step, submit, redirect } from '@ministryofjustice/hmpps-forge/core/authoring'
import { fullNameField, continueButton } from './blocks'

export const userNameStep = step({
  code: 'user-name',
  path: '/', // This is the home/first page of the journey
  title: 'What is your name?',
  reachability: { entryWhen: true }, // The first step is always reachable
  blocks: [fullNameField, continueButton],
  onSubmission: [
    submit({
      validate: true,
      onValid: {
        // Upon valid submission, we'll redirect to the next step
        next: [redirect({ goto: 'date-of-birth' })],
      },
    }),
  ],
})
