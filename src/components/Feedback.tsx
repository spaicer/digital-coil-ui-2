import { useStyletron } from 'baseui'
import { Modal, ROLE, SIZE } from 'baseui/modal'
import React, { useState } from 'react'
import StepWizard from 'react-step-wizard'

import { Step1 } from './feedback/Step1'

const Feedback: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = React.memo(({ isOpen, onClose }) => {
  const [css] = useStyletron()
  const [eveness, setEvenness] = useState<boolean>()
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setEvenness(undefined)
        onClose()
      }}
      unstable_ModalBackdropScroll
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <StepWizard
        className={css({
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
        })}
        transitions={{}}
        isLazyMount={true}
      >
        <Step1
          evenness={eveness}
          onChange={setEvenness}
          done={() => {
            // TODO: Send feedback to the AI module
            setEvenness(undefined)
            // Close the dialog
            onClose()
          }}
        />
      </StepWizard>
    </Modal>
  )
})

export { Feedback }
