import { KIND } from 'baseui/button'
import { Input } from 'baseui/input'
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
import React, { useEffect, useState } from 'react'

const QrScan: React.FC<{
  isOpen: boolean
  onClose: (coilId?: string) => void
}> = React.memo(({ isOpen, onClose }) => {
  const [invalid, setInvalid] = useState(true)
  const [coilId, setCoilId] = useState('')

  useEffect(() => {
    if (coilId.startsWith('FM')) {
      setInvalid(false)
    } else {
      setInvalid(true)
    }
  }, [coilId])

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
        <Input
          autoFocus
          value={coilId}
          onChange={(e) => setCoilId(e.currentTarget.value)}
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
        <ModalButton
          kind={KIND.primary}
          disabled={invalid}
          onClick={() => {
            onClose(coilId)
          }}
        >
          OK
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
})

export { QrScan }
