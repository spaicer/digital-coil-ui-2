import { mdiPencil, mdiQrcodeScan } from '@mdi/js'
import Icon from '@mdi/react'
import { useStyletron, withStyle } from 'baseui'
import { Button, KIND, SIZE } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input, InputProps, StyledEndEnhancer, StyledInput } from 'baseui/input'
import { toaster, ToasterContainer } from 'baseui/toast'
import React, { useEffect, useState } from 'react'

import { useApi } from '../ApiProvider'
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
  zugfestigkeitA: number
  zugfestigkeitE: number
  streckgrenzeA: number
  streckgrenzeE: number
  bruchdehnungA: number
  bruchdehnungE: number
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
    cm50In: 0.0,
    cm50Out: 0.0,
    cm70In: 0.0,
    cm70Out: 0.0,
    tension: 0.0,
  })
  const [showCoilInfo, setShowCoilInfo] = useState(false)
  const [coil, setCoil] = useState<Coil>()
  const [showFeedback, setShowFeedback] = useState(false)
  const [showQrScan, setShowQrScan] = useState(false)
  const [api] = useApi()

  useEffect(() => {
    if (coil) {
      api.defaultApi
        .detectPointAnomaliesGetRecommendationPost({
          breite: coil.breite,
          dicke_vorn: coil.dickeVorn,
          dicke_hinten: coil.dickeHinten,
          zugfestigkeit_a: coil.zugfestigkeitA,
          zugfestigkeit_e: coil.zugfestigkeitE,
          streckgrenze_a: coil.streckgrenzeA,
          streckgrenze_e: coil.streckgrenzeE,
          bruchdehnung_a: coil.bruchdehnungA,
          bruchdehnung_e: coil.bruchdehnungE,
        })
        .then((response) => {
          setRecommendation({
            cm50In: response.data.cm50_einlauf,
            cm50Out: response.data.cm50_auslauf,
            cm70In: response.data.cm70_einlauf,
            cm70Out: response.data.cm70_auslauf,
            tension: response.data.bandzug,
          })
        })
    }
  }, [api, coil])

  useEffect(() => {
    setSetpoint(recommendation)
  }, [recommendation])

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
          Aktuelles Coil zu Artikel-Nr. 123-abc
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
                Hersteller:
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
                M {coil?.materialNummer || '--'}
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
                {coil?.dickeVorn || '--'} mm / {coil?.dickeHinten || '--'} mm
              </td>
            </tr>
            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Zugfestigkeit:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                  textAlign: 'right',
                })}
              >
                {coil?.zugfestigkeitA || '--'} MPa /{' '}
                {coil?.zugfestigkeitE || '--'} MPa
              </td>
            </tr>
            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Streckgrenze:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                  textAlign: 'right',
                })}
              >
                {coil?.streckgrenzeA || '--'} N/mm² /{' '}
                {coil?.streckgrenzeE || '--'} N/mm²
              </td>
            </tr>
            <tr>
              <td
                className={css({
                  ...theme.typography.LabelMedium,
                })}
              >
                Bruchdehnung:
              </td>
              <td
                className={css({
                  paddingLeft: theme.sizing.scale600,
                  textAlign: 'right',
                })}
              >
                {coil?.bruchdehnungA || '--'} % / {coil?.bruchdehnungE || '--'}{' '}
                %
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
              step={0.1}
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
        <div>
          <FormControl label={() => 'Bandzug'}>
            <Input
              endEnhancer={'%'}
              value={setpoint.tension}
              type={'number'}
              step={1}
              min={0}
              max={100}
              onChange={(e) => {
                setSetpoint({
                  ...setpoint,
                  tension: e.currentTarget.valueAsNumber,
                })
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
        <div>
          <FormControl label={() => 'Bandzug'}>
            <CustomInput
              endEnhancer={'%'}
              value={recommendation.tension}
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
            toaster.positive('QR-Code erfolgreich gescannt!', {
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
