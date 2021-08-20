import { KIND } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
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
import { Select, Value } from 'baseui/select'
import React, { useEffect, useState } from 'react'

import { Coil } from './DigitalCoil'

const CoilInfos: React.FC<{
  coil?: Coil
  isOpen: boolean
  onClose: (coil?: Coil) => void
}> = React.memo(({ coil, isOpen, onClose }) => {
  const [manufacturer, setManufacturer] = useState<Value>(() => {
    if (coil?.manufacturer) {
      return [{ id: coil.manufacturer }]
    }
    return []
  })
  const [materialNumber, setMaterialNumber] = useState<string | undefined>(
    coil?.materialNumber
  )
  const [materialQuality, setMaterialQuality] = useState<string | undefined>(
    coil?.materialQuality
  )
  const [materialThickness, setMaterialThickness] = useState<
    number | undefined
  >(coil?.materialThickness)
  const [materialWidth, setMaterialWidth] = useState<number | undefined>(
    coil?.materialWidth
  )

  useEffect(() => {
    if (coil?.manufacturer) {
      setManufacturer([{ id: coil.manufacturer }])
    } else {
      setManufacturer([])
    }
    setMaterialNumber(coil?.materialNumber)
    setMaterialQuality(coil?.materialQuality)
    setMaterialThickness(coil?.materialThickness)
    setMaterialWidth(coil?.materialWidth)
  }, [coil])
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
      <ModalHeader>Coil bearbeiten</ModalHeader>
      <ModalBody>
        <FormControl label={() => 'Hersteller'}>
          <Select
            placeholder={'Hersteller wählen ...'}
            value={manufacturer}
            options={[{ label: 'ACME Inc.', id: 'acme' }]}
            onChange={(params) => {
              setManufacturer(params.value)
            }}
          />
        </FormControl>
        <FormControl label={() => 'Materialnummer'}>
          <Input
            value={materialNumber}
            startEnhancer={'M'}
            onChange={(e) => {
              setMaterialNumber(e.currentTarget.value)
            }}
          />
        </FormControl>
        <FormControl label={() => 'Materialgüte'}>
          <Input
            value={materialQuality}
            onChange={(e) => {
              setMaterialQuality(e.currentTarget.value)
            }}
          />
        </FormControl>
        <FormControl label={() => 'Banddicke'}>
          <Input
            value={materialThickness}
            endEnhancer={'mm'}
            onChange={(e) => {
              setMaterialThickness(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={10}
          />
        </FormControl>
        <FormControl label={() => 'Bandbreite'}>
          <Input
            value={materialWidth}
            endEnhancer={'mm'}
            onChange={(e) => {
              setMaterialWidth(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind={KIND.tertiary}
          onClick={() => {
            onClose()
          }}
        >
          Abbrechen
        </ModalButton>
        <ModalButton
          kind={KIND.primary}
          onClick={() => {
            onClose({
              manufacturer: manufacturer[0]?.id as string | undefined,
              materialNumber,
              materialQuality,
              materialThickness,
              materialWidth,
            })
          }}
        >
          OK
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
})

export { CoilInfos }
