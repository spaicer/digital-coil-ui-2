import { mdiQrcodeScan } from '@mdi/js'
import Icon from '@mdi/react'
import { useStyletron, withStyle } from 'baseui'
import { Button, KIND, SIZE } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input, InputProps, StyledEndEnhancer, StyledInput } from 'baseui/input'
import { Layer } from 'baseui/layer'
import { ProgressBar } from 'baseui/progress-bar'
import { toaster, ToasterContainer } from 'baseui/toast'
import React, { useState } from 'react'

import { useApi } from '../ApiProvider'
import Schema from '../assets/Linie_8_Bandanlage_mit_Schrift.png'
import { Feedback } from './Feedback'
import { QrScan } from './QrScan'

export type Coil = {
  hersteller: string
  artikelNr: string
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

const CustomInput: React.FC<InputProps & { difference?: boolean }> = React.memo(
  (props) => {
    return (
      <Input
        {...props}
        overrides={{
          Input: {
            component: CustomStyledInput,
            style: ({ $theme }) => ({
              backgroundColor: props.difference
                ? $theme.colors.warning300
                : $theme.colors.inputFillDisabled,
            }),
          },
          EndEnhancer: {
            component: CustomEndEnhancer,
            style: ({ $theme }) => ({
              backgroundColor: props.difference
                ? $theme.colors.warning300
                : $theme.colors.inputFillDisabled,
            }),
          },
        }}
      />
    )
  }
)

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
  const [coil, setCoil] = useState<Coil>()
  const [showFeedback, setShowFeedback] = useState(false)
  const [showQrScan, setShowQrScan] = useState(false)
  const [loading, setLoading] = useState(false)
  const [api] = useApi()

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
          onClick={() => {
            setShowQrScan(true)
          }}
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
                Artikel-Nr.:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                })}
              >
                {coil?.artikelNr || '--'}
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
            <CustomInput
              endEnhancer={'mm'}
              value={setpoint.cm70In}
              disabled
              difference={setpoint.cm70In !== recommendation.cm70In}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM70 Auslauf'}>
            <CustomInput
              endEnhancer={'mm'}
              value={setpoint.cm70Out}
              disabled
              difference={setpoint.cm70Out !== recommendation.cm70Out}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Einlauf'}>
            <CustomInput
              endEnhancer={'mm'}
              value={setpoint.cm50In}
              disabled
              difference={setpoint.cm50In !== recommendation.cm50In}
            />
          </FormControl>
        </div>
        <div>
          <FormControl label={() => 'CM50 Auslauf'}>
            <CustomInput
              endEnhancer={'mm'}
              value={setpoint.cm50Out}
              disabled
              difference={setpoint.cm50Out !== recommendation.cm50Out}
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
      <QrScan
        isOpen={showQrScan}
        onClose={(coilId) => {
          setShowQrScan(false)
          if (coilId !== undefined) {
            toaster.positive('Barcode erfolgreich gescannt!', {
              key: 'qr-scan',
              autoHideDuration: 2000,
            })
            setLoading(true)
            api.defaultApi
              .requestMetadataRecommendationRequestMetadataRecommendationPost({
                id_fm: coilId,
              })
              .then((response) => {
                setCoil({
                  hersteller: response.data.supplier,
                  artikelNr: response.data.id_material,
                  materialNummer: coilId,
                  guete: response.data.quality_description,
                  breite: response.data.width,
                  dickeHinten: response.data.thickness,
                  dickeVorn: response.data.thickness,
                })
                setRecommendation({
                  cm50In: response.data.cm50_einlauf,
                  cm50Out: response.data.cm50_auslauf,
                  cm70In: response.data.cm70_einlauf,
                  cm70Out: response.data.cm70_auslauf,
                  tension: 0,
                })
              })
              .finally(() => {
                setLoading(false)
              })
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
