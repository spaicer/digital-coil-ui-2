import { mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import { useStyletron, withStyle } from 'baseui'
import { Button, KIND, SIZE } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input, InputProps, StyledEndEnhancer, StyledInput } from 'baseui/input'
import React, { useState } from 'react'

import { CoilInfos } from './CoilInfos'
import { Feedback } from './Feedback'

export type Coil = {
  manufacturer?: string
  materialNumber?: string
  materialQuality?: string
  materialThickness?: number
  materialWidth?: number
}

const CustomStyledInput = withStyle(StyledInput, ({ $theme }) => ({
  color: $theme.colors.primary,
  WebkitTextFillColor: $theme.colors.primary,
}))

const CustomEndEnhancer = withStyle(StyledEndEnhancer, ({ $theme }) => ({
  color: $theme.colors.primary,
}))

const CustomInput: React.FC<InputProps> = React.memo((props) => {
  return (
    <Input
      {...props}
      overrides={{
        Input: {
          component: CustomStyledInput,
        },
        EndEnhancer: {
          component: CustomEndEnhancer,
        },
      }}
    />
  )
})

const DigitalCoil = React.memo(() => {
  const [css, theme] = useStyletron()
  const [CM70In, setCM70In] = useState(0)
  const [CM70Out, setCM70Out] = useState(0)
  const [CM50In, setCM50In] = useState(0)
  const [CM50Out, setCM50Out] = useState(0)
  const [tension, setTension] = useState(0)
  const [showCoilInfo, setShowCoilInfo] = useState(false)
  const [coil, setCoil] = useState<Coil>()
  const [showFeedback, setShowFeedback] = useState(false)

  return (
    <div
      className={css({
        paddingLeft: theme.sizing.scale600,
        paddingRight: theme.sizing.scale600,
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          ...theme.typography.HeadingSmall,
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
        })}
      >
        <span
          className={css({
            paddingRight: theme.sizing.scale600,
          })}
        >
          Aktuelles Coil
        </span>
        <Button
          size={SIZE.mini}
          kind={KIND.primary}
          onClick={() => setShowCoilInfo(true)}
          startEnhancer={<Icon path={mdiPencil} size={'1rem'} />}
          overrides={{
            StartEnhancer: {
              style: ({ $theme }) => ({
                marginRight: $theme.sizing.scale300,
              }),
            },
          }}
        >
          Bearbeiten
        </Button>
      </div>
      <div>
        <table
          className={css({
            ...theme.typography.ParagraphMedium,
          })}
        >
          <tbody>
            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Hersteller:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                })}
              >
                {coil?.manufacturer || '--'}
              </td>
            </tr>
            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Materialnummer:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                })}
              >
                {coil?.materialNumber || '--'}
              </td>
            </tr>

            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Materialgüte:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                })}
              >
                {coil?.materialQuality || '--'}
              </td>
            </tr>
            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Banddicke:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                  textAlign: 'right',
                })}
              >
                {coil?.materialThickness || '--'} mm
              </td>
            </tr>
            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Bandbreite:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                  textAlign: 'right',
                })}
              >
                {coil?.materialWidth || '--'} mm
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className={css({
          ...theme.typography.HeadingSmall,
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
        })}
      >
        Richtanlage
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr);',
          alignItems: 'center',
          columnGap: theme.sizing.scale300,
        })}
      >
        <div
          className={css({
            ...theme.typography.LabelLarge,
            paddingTop: theme.sizing.scale600,
          })}
        >
          IST:
        </div>
        <div>
          <FormControl label={() => 'CM70 Einlauf'}>
            <Input
              endEnhancer={'mm'}
              value={CM70In}
              type={'number'}
              step={0.1}
              min={-5}
              max={10}
              onChange={(e) => {
                setCM70In(e.currentTarget.valueAsNumber)
              }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM70 Auslauf'}>
            <Input
              endEnhancer={'mm'}
              value={CM70Out}
              type={'number'}
              step={0.1}
              min={-5}
              max={10}
              onChange={(e) => {
                setCM70Out(e.currentTarget.valueAsNumber)
              }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Einlauf'}>
            <Input
              endEnhancer={'mm'}
              value={CM50In}
              type={'number'}
              step={0.1}
              min={-5}
              max={10}
              onChange={(e) => {
                setCM50In(e.currentTarget.valueAsNumber)
              }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Auslauf'}>
            <Input
              endEnhancer={'mm'}
              value={CM50Out}
              type={'number'}
              step={0.1}
              min={-5}
              max={10}
              onChange={(e) => {
                setCM50Out(e.currentTarget.valueAsNumber)
              }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'Bandzug'}>
            <Input
              endEnhancer={'%'}
              value={tension}
              type={'number'}
              step={1}
              min={0}
              max={100}
              onChange={(e) => {
                setTension(e.currentTarget.valueAsNumber)
              }}
            />
          </FormControl>
        </div>
        <div
          className={css({
            paddingTop: theme.sizing.scale600,
          })}
        >
          <Button>Übernehmen</Button>
        </div>
        <div
          className={css({
            ...theme.typography.LabelLarge,
            paddingTop: theme.sizing.scale600,
          })}
        >
          Empfehlung:
        </div>
        <div>
          <FormControl label={() => 'CM70 Einlauf'}>
            <CustomInput endEnhancer={'mm'} value={CM70In} disabled />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM70 Auslauf'}>
            <CustomInput endEnhancer={'mm'} value={CM70Out} disabled />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Einlauf'}>
            <CustomInput endEnhancer={'mm'} value={CM50In} disabled />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Auslauf'}>
            <CustomInput endEnhancer={'mm'} value={CM50Out} disabled />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'Bandzug'}>
            <CustomInput endEnhancer={'%'} value={tension} disabled />
          </FormControl>
        </div>
      </div>
      <Button
        size={SIZE.large}
        onClick={() => setShowFeedback(true)}
        overrides={{
          Root: {
            style: {
              marginTop: theme.sizing.scale1200,
              alignSelf: 'center',
            },
          },
        }}
      >
        Feedback
      </Button>
      <CoilInfos
        coil={coil}
        isOpen={showCoilInfo}
        onClose={(coil) => {
          setShowCoilInfo(false)
          setCoil(coil)
        }}
      />
      <Feedback
        isOpen={showFeedback}
        onClose={() => {
          setShowFeedback(false)
        }}
      />
    </div>
  )
})

export { DigitalCoil }
