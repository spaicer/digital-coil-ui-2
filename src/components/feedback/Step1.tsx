import { mdiThumbDown, mdiThumbUp } from '@mdi/js'
import Icon from '@mdi/react'
import { useStyletron } from 'baseui'
import { Button, KIND } from 'baseui/button'
import { ButtonGroup, MODE } from 'baseui/button-group'
import { ModalBody, ModalButton, ModalFooter, ModalHeader } from 'baseui/modal'
import React from 'react'
import { StepWizardChildProps } from 'react-step-wizard'

const Step1: React.FC<
  Partial<StepWizardChildProps> & {
    evenness?: boolean
    onChange: (evenness: boolean) => void
    done: () => void
  }
> = ({ nextStep, evenness, onChange, done }) => {
  const [css, theme] = useStyletron()
  return (
    <>
      <ModalHeader>Feedback</ModalHeader>
      <ModalBody>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <ButtonGroup
            mode={MODE.radio}
            overrides={{
              Root: {
                style: {
                  alignSelf: 'center',
                },
              },
            }}
            selected={evenness === undefined ? -1 : evenness === true ? 0 : 1}
            onClick={(e, index) => {
              onChange(index === 0)
            }}
          >
            <Button
              endEnhancer={
                <Icon
                  path={mdiThumbUp}
                  size={1}
                  color={theme.colors.positive}
                />
              }
            >
              OK
            </Button>
            <Button
              endEnhancer={
                <Icon
                  path={mdiThumbDown}
                  size={1}
                  color={theme.colors.negative}
                />
              }
            >
              Nicht OK
            </Button>
          </ButtonGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind={KIND.primary}
          onClick={done}
          disabled={evenness === undefined}
        >
          Fertig
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export { Step1 }
