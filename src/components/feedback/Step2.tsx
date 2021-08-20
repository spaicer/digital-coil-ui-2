import { KIND } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { ModalBody, ModalButton, ModalFooter, ModalHeader } from 'baseui/modal'
import React from 'react'
import { StepWizardChildProps } from 'react-step-wizard'

const Step2: React.FC<
  Partial<StepWizardChildProps> & {
    roughness?: number
    onChange: (roughness?: number) => void
  }
> = ({ nextStep, previousStep, roughness, onChange }) => {
  return (
    <>
      <ModalHeader>Rauheit</ModalHeader>
      <ModalBody>
        <FormControl label={() => 'Mittenrauheit (Ra)'}>
          <Input
            type={'number'}
            min={0.7}
            max={1.4}
            step={0.01}
            value={roughness || ''}
            onChange={(e) => {
              onChange(e.currentTarget.valueAsNumber)
            }}
            endEnhancer={'µm'}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={previousStep}>
          Zurück
        </ModalButton>
        <ModalButton
          kind={KIND.primary}
          onClick={nextStep}
          disabled={roughness === undefined || isNaN(roughness)}
        >
          Weiter
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export { Step2 }
