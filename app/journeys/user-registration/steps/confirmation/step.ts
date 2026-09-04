import { step } from '@ministryofjustice/hmpps-forge/core/authoring'
import { panel, description } from './blocks'

export const confirmationStep = step({
  code: 'confirmation',
  path: '/confirmation',
  title: 'Registration complete',
  reachability: { entryWhen: true },
  blocks: [panel, description],
})
