import { KIND } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { ModalBody, ModalButton, ModalFooter, ModalHeader } from 'baseui/modal'
import React, { useCallback } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'

const Step3: React.FC<
  Partial<StepWizardChildProps> & {
    thickness: {
      measurement1?: number
      measurement2?: number
      measurement3?: number
      measurement4?: number
    }
    onChange: (thickness: {
      measurement1?: number
      measurement2?: number
      measurement3?: number
      measurement4?: number
    }) => void
    done: () => void
  }
> = ({ previousStep, thickness, onChange, done }) => {
  const isValid = useCallback(() => {
    return (
      thickness.measurement1 !== undefined &&
      !isNaN(thickness.measurement1) &&
      thickness.measurement2 !== undefined &&
      !isNaN(thickness.measurement2) &&
      thickness.measurement3 !== undefined &&
      !isNaN(thickness.measurement3) &&
      thickness.measurement4 !== undefined &&
      !isNaN(thickness.measurement4)
    )
  }, [thickness])

  return (
    <>
      <ModalHeader>Teiledicke</ModalHeader>
      <ModalBody>
        <FormControl label={() => 'Messung 1'}>
          <Input
            type={'number'}
            min={0}
            max={10}
            step={0.1}
            value={thickness.measurement1 || ''}
            onChange={(e) =>
              onChange({
                ...thickness,
                measurement1: e.currentTarget.valueAsNumber,
              })
            }
            endEnhancer={'mm'}
          />
        </FormControl>
        <FormControl label={() => 'Messung 2'}>
          <Input
            type={'number'}
            min={0}
            max={10}
            step={0.1}
            value={thickness.measurement2 || ''}
            onChange={(e) =>
              onChange({
                ...thickness,
                measurement2: e.currentTarget.valueAsNumber,
              })
            }
            endEnhancer={'mm'}
          />
        </FormControl>
        <FormControl label={() => 'Messung 3'}>
          <Input
            type={'number'}
            min={0}
            max={10}
            step={0.1}
            value={thickness.measurement3 || ''}
            onChange={(e) =>
              onChange({
                ...thickness,
                measurement3: e.currentTarget.valueAsNumber,
              })
            }
            endEnhancer={'mm'}
          />
        </FormControl>
        <FormControl label={() => 'Messung 4'}>
          <Input
            type={'number'}
            min={0}
            max={10}
            step={0.1}
            value={thickness.measurement4 || ''}
            onChange={(e) =>
              onChange({
                ...thickness,
                measurement4: e.currentTarget.valueAsNumber,
              })
            }
            endEnhancer={'mm'}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={previousStep}>
          Zurück
        </ModalButton>
        <ModalButton
          kind={KIND.primary}
          onClick={() => done()}
          disabled={!isValid()}
        >
          Fertig
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export { Step3 }
