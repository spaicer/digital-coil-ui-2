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
import React, { useCallback } from 'react'
import QrReader from 'react-qr-reader'

import { Coil } from './DigitalCoil'

const QrScan: React.FC<{
  isOpen: boolean
  onClose: (coil?: Coil) => void
}> = React.memo(({ isOpen, onClose }) => {
  const handleScan = useCallback(
    (data) => {
      if (data !== null) {
        const coil = JSON.parse(data)
        if (coil) {
          onClose({
            ...coil,
            hersteller: 'Mendritzki',
            materialNummer: '123',
            guete: 'DC01',
          })
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
