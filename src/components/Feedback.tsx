import { useStyletron } from 'baseui'
import { Modal, ROLE, SIZE } from 'baseui/modal'
import React, { useState } from 'react'
import StepWizard from 'react-step-wizard'

import { Step1 } from './feedback/Step1'
import { Step2 } from './feedback/Step2'
import { Step3 } from './feedback/Step3'

const Feedback: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = React.memo(({ isOpen, onClose }) => {
  const [css] = useStyletron()
  const [eveness, setEvenness] = useState<boolean>()
  const [roughness, setRoughness] = useState<number>()
  const [thickness, setThickness] = useState<{
    measurement1?: number
    measurement2?: number
    measurement3?: number
    measurement4?: number
  }>({})
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setEvenness(undefined)
        setRoughness(undefined)
        setThickness({})
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
        <Step1 evenness={eveness} onChange={setEvenness} />
        <Step2 roughness={roughness} onChange={setRoughness} />
        <Step3
          thickness={thickness}
          onChange={setThickness}
          done={() => {
            // TODO: Send feedback to the AI module
            setEvenness(undefined)
            setRoughness(undefined)
            setThickness({})
            // Close the dialog
            onClose()
          }}
        />
      </StepWizard>
    </Modal>
  )
})

export { Feedback }
