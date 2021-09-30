import Ajv from 'ajv'
import draft6MetaSchema from 'ajv/dist/refs/json-schema-draft-06.json'
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
import React, { useCallback, useState } from 'react'
import QrReader from 'react-qr-reader'

import schema from '../qr-code.json'
import { Coil } from './DigitalCoil'

const ajv = new Ajv()
ajv.addMetaSchema(draft6MetaSchema)
const validate = ajv.compile(schema)

const QrScan: React.FC<{
  isOpen: boolean
  onClose: (coil?: Coil) => void
}> = React.memo(({ isOpen, onClose }) => {
  const [invalid, setInvalid] = useState(false)
  const handleScan = useCallback(
    (data) => {
      if (data !== null) {
        try {
          const coil = JSON.parse(data) as Coil
          if (coil && validate(coil)) {
            setInvalid(false)
            onClose({
              ...coil,
              hersteller: 'Mendritzki',
              materialNummer: '123',
              guete: 'DC01',
            })
          } else {
            setInvalid(true)
          }
        } catch (error) {
          setInvalid(true)
        }
      }
    },
    [onClose]
  )

  const handleError = useCallback((erro) => {}, [])
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
      <ModalHeader>QR-Code scannen</ModalHeader>
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
            Unbekannter QR-Code
          </Notification>
        )}
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
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
