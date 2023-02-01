import { mdiPencil, mdiQrcodeScan } from '@mdi/js'
import Icon from '@mdi/react'
import { useStyletron, withStyle } from 'baseui'
import { Button, KIND, SIZE } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input, InputProps, StyledEndEnhancer, StyledInput } from 'baseui/input'
import { Layer } from 'baseui/layer'
import { ProgressBar } from 'baseui/progress-bar'
import { toaster, ToasterContainer } from 'baseui/toast'
import React, { useEffect, useState } from 'react'

import { useApi } from '../ApiProvider'
import Schema from '../assets/Linie_8_Bandanlage_mit_Schrift.png'
import { CoilInfos } from './CoilInfos'
import { Feedback } from './Feedback'
import { QrScan } from './QrScan'

export type Coil = {
  hersteller: string
  materialNummer: string
  guete: string
  breite: number
  dickeVorn: number
  dickeHinten: number
  zugfestigkeitA?: number
  zugfestigkeitE?: number
  streckgrenzeA?: number
  streckgrenzeE?: number
  bruchdehnungA?: number
  bruchdehnungE?: number
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
  const [recommendation, setRecommendation] = useState<{
    cm50In: number
    cm50Out: number
    cm70In: number
    cm70Out: number
    tension: number
  }>({
    cm50In: 0.0,
    cm50Out: 0.0,
    cm70In: 0.0,
    cm70Out: 0.0,
    tension: 0.0,
  })
  const [setpoint, setSetpoint] = useState<{
    cm50In: number
    cm50Out: number
    cm70In: number
    cm70Out: number
    tension: number
  }>({
    cm50In: -2.6,
    cm50Out: 1.8,
    cm70In: -2.0,
    cm70Out: 1.8,
    tension: 0.0,
  })
  const [showCoilInfo, setShowCoilInfo] = useState(false)
  const [coil, setCoil] = useState<Coil>()
  const [showFeedback, setShowFeedback] = useState(false)
  const [showQrScan, setShowQrScan] = useState(false)
  const [loading, setLoading] = useState(false)
  const [api] = useApi()

  useEffect(() => {
    if (coil) {
      setLoading(true)
      api.defaultApi
        .detectPointAnomaliesGetRecommendationPost({
          breite: coil.breite,
          dicke_vorn: coil.dickeVorn,
          dicke_hinten: coil.dickeHinten,
          zugfestigkeit_a: coil.zugfestigkeitA || 0.0,
          zugfestigkeit_e: coil.zugfestigkeitE || 0.0,
          streckgrenze_a: coil.streckgrenzeA || 0.0,
          streckgrenze_e: coil.streckgrenzeE || 0.0,
          bruchdehnung_a: coil.bruchdehnungA || 0.0,
          bruchdehnung_e: coil.bruchdehnungE || 0.0,
        })
        .then((response) => {
          return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              setRecommendation({
                cm50In: -2.6,
                cm50Out: 1.8,
                cm70In: -2.0,
                cm70Out: 1.8,
                tension: 0.0,
              })
              resolve()
            }, 2500)
          })
        })
        .catch((error) => {
          console.log(error)
          toaster.negative(`${error}`, { key: 'api' })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [api, coil])

  return (
    <div
      className={css({
        paddingLeft: theme.sizing.scale600,
        paddingRight: theme.sizing.scale600,
        paddingBottom: theme.sizing.scale600,
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <Layer>
        <div
          style={{
            boxSizing: 'border-box',
            width: '100vw',
            position: 'fixed',
            top: '71px',
            left: '0',
          }}
        >
          {loading && (
            <ProgressBar
              infinite
              successValue={100}
              overrides={{
                BarContainer: {
                  style: {
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                  },
                },
              }}
            />
          )}
        </div>
      </Layer>
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
          onClick={() => setShowQrScan(true)}
          startEnhancer={<Icon path={mdiQrcodeScan} size={'1rem'} />}
          overrides={{
            StartEnhancer: {
              style: ({ $theme }) => ({
                marginRight: $theme.sizing.scale300,
              }),
            },
          }}
        >
          Scannen
        </Button>{' '}
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
                Lieferant:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                })}
              >
                {coil?.hersteller || '--'}
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
                {coil?.materialNummer || '--'}
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
                {coil?.guete || '--'}
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
                {coil?.breite || '--'} mm
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
                {coil?.dickeVorn || '--'} mm
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
      <div>
        <img src={Schema} alt={'Anlagenschema'} width={'100%'} />
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr);',
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
              value={setpoint.cm70In}
              type={'number'}
              step={0.1}
              min={-5}
              max={10}
              onChange={(e) => {
                setSetpoint({
                  ...setpoint,
                  cm70In: e.currentTarget.valueAsNumber,
                })
              }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM70 Auslauf'}>
            <Input
              endEnhancer={'mm'}
              value={setpoint.cm70Out}
              type={'number'}
              step={0.1}
              min={-5}
              max={10}
              onChange={(e) => {
                setSetpoint({
                  ...setpoint,
                  cm70Out: e.currentTarget.valueAsNumber,
                })
              }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Einlauf'}>
            <Input
              endEnhancer={'mm'}
              value={setpoint.cm50In}
              type={'number'}
              step={0.01}
              min={-5}
              max={10}
              onChange={(e) => {
                setSetpoint({
                  ...setpoint,
                  cm50In: e.currentTarget.valueAsNumber,
                })
              }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Auslauf'}>
            <Input
              endEnhancer={'mm'}
              value={setpoint.cm50Out}
              type={'number'}
              step={0.1}
              min={-5}
              max={10}
              onChange={(e) => {
                setSetpoint({
                  ...setpoint,
                  cm50Out: e.currentTarget.valueAsNumber,
                })
              }}
            />
          </FormControl>
        </div>
        <div
          className={css({
            ...theme.typography.LabelLarge,
            paddingTop: theme.sizing.scale600,
          })}
        >
          Empfehlung (aus SRS):
        </div>
        <div>
          <FormControl label={() => 'CM70 Einlauf'}>
            <CustomInput
              endEnhancer={'mm'}
              value={recommendation.cm70In}
              disabled
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM70 Auslauf'}>
            <CustomInput
              endEnhancer={'mm'}
              value={recommendation.cm70Out}
              disabled
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Einlauf'}>
            <CustomInput
              endEnhancer={'mm'}
              value={recommendation.cm50In}
              disabled
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Auslauf'}>
            <CustomInput
              endEnhancer={'mm'}
              value={recommendation.cm50Out}
              disabled
            />
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
          if (coil !== undefined) {
            setCoil(coil)
          }
        }}
      />
      <QrScan
        isOpen={showQrScan}
        onClose={(coil) => {
          setShowQrScan(false)
          if (coil !== undefined) {
            toaster.positive('Barcode erfolgreich gescannt!', {
              key: 'qr-scan',
              autoHideDuration: 2000,
            })
            setCoil(coil)
          }
        }}
      />
      <Feedback
        isOpen={showFeedback}
        onClose={() => {
          setShowFeedback(false)
        }}
      />
      <ToasterContainer />
    </div>
  )
})

export { DigitalCoil }
