import { KIND } from 'baseui/button'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal'
import { KIND as NOTIFICATION_KIND, Notification } from 'baseui/notification'
import { Select, Value } from 'baseui/select'
import React, { useCallback, useEffect, useState } from 'react'
import BarcodeScannerComponent from 'react-qr-barcode-scanner'

import { Coil } from './DigitalCoil'

const QrScan: React.FC<{
  isOpen: boolean
  onClose: (coil?: Coil) => void
}> = React.memo(({ isOpen, onClose }) => {
  const [invalid, setInvalid] = useState(false)
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDevice, setSelectedDevice] = React.useState<Value>()
  const handleScan = useCallback(
    (error, result) => {
      if (result) {
        if ((result.text as string).startsWith('FM')) {
          setInvalid(false)
          onClose({
            hersteller: 'Reinhold Mendritzki Kaltwalzwerk GmbH & Co. KG',
            materialNummer: result.text,
            guete: 'DC01',
            breite: 355.4,
            dickeHinten: 1.77,
            dickeVorn: 1.77,
          })
        } else {
          setInvalid(true)
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      // List cameras
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          return devices.filter(({ kind }) => kind === 'videoinput')
        })
        .then(setVideoDevices)
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`)
        })
    }
  }, [])

  useEffect(() => {
    if (videoDevices.length > 0) {
      setSelectedDevice([{ id: videoDevices[0].deviceId }])
    }
  }, [videoDevices])

  const handleError = useCallback((error) => {
    console.log(error)
  }, [])
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
      }}
      unstable_ModalBackdropScroll
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Barcode scannen</ModalHeader>
      <ModalBody>
        {invalid && (
          <Notification
            kind={NOTIFICATION_KIND.negative}
            overrides={{
              Body: {
                style: ({ $theme }) => ({
                  width: 'auto',
                  marginBottom: $theme.sizing.scale800,
                }),
              },
            }}
            closeable
            onClose={() => {
              setInvalid(false)
            }}
          >
            Unbekannter Barcode
          </Notification>
        )}
        {videoDevices.length > 1 && (
          <Select
            options={videoDevices.map(({ label, deviceId }) => ({
              label,
              id: deviceId,
            }))}
            value={selectedDevice}
            placeholder={'Select Video Device'}
            onChange={(params) => setSelectedDevice(params.value)}
            searchable={false}
            clearable={false}
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  marginBottom: $theme.sizing.scale600,
                }),
              },
            }}
          />
        )}
        <BarcodeScannerComponent
          width={'100%'}
          height={'100%'}
          videoConstraints={{
            deviceId: selectedDevice?.[0]?.id as string | undefined,
          }}
          onUpdate={handleScan}
          onError={handleError}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind={KIND.primary}
          onClick={() => {
            onClose()
          }}
        >
          Abbrechen
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
})

export { QrScan }
