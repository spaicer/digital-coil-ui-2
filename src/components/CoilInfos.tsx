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
import { Select } from 'baseui/select'
import React, { useCallback, useEffect, useState } from 'react'

import { Coil } from './DigitalCoil'

const CoilInfos: React.FC<{
  coil?: Coil
  isOpen: boolean
  onClose: (coil?: Coil) => void
}> = React.memo(({ coil, isOpen, onClose }) => {
  const [hersteller, setHersteller] = useState(coil?.hersteller)
  const [materialNummer, setMaterialNummer] = useState(coil?.materialNummer)
  const [guete, setGuete] = useState(coil?.guete)
  const [breite, setBreite] = useState(coil?.breite)
  const [dickeVorn, setDickeVorn] = useState(coil?.dickeVorn)
  const [dickeHinten, setDickeHinten] = useState(coil?.dickeHinten)
  const [zugfestigkeitA, setZugfestigkeitA] = useState(coil?.zugfestigkeitA)
  const [zugfestigkeitE, setZugfestigkeitE] = useState(coil?.zugfestigkeitE)
  const [streckgrenzeA, setStreckgrenzeA] = useState(coil?.streckgrenzeA)
  const [streckgrenzeE, setStreckgrenzeE] = useState(coil?.streckgrenzeE)
  const [bruchdehnungA, setBruchdehnungA] = useState(coil?.bruchdehnungA)
  const [bruchdehnungE, setBruchdehnungE] = useState(coil?.bruchdehnungE)

  useEffect(() => {
    setHersteller(coil?.hersteller)
    setMaterialNummer(coil?.materialNummer)
    setGuete(coil?.guete)
    setBreite(coil?.breite)
    setDickeVorn(coil?.dickeVorn)
    setDickeHinten(coil?.dickeHinten)
    setZugfestigkeitA(coil?.zugfestigkeitA)
    setZugfestigkeitE(coil?.zugfestigkeitE)
    setStreckgrenzeA(coil?.streckgrenzeA)
    setStreckgrenzeE(coil?.streckgrenzeE)
    setBruchdehnungA(coil?.bruchdehnungA)
    setBruchdehnungE(coil?.bruchdehnungE)
  }, [coil])

  const isValid = useCallback(() => {
    return (
      hersteller !== undefined &&
      materialNummer !== undefined &&
      guete !== undefined &&
      breite !== undefined &&
      dickeVorn !== undefined &&
      dickeHinten !== undefined &&
      zugfestigkeitA !== undefined &&
      zugfestigkeitE !== undefined &&
      streckgrenzeA !== undefined &&
      streckgrenzeE !== undefined &&
      bruchdehnungA !== undefined &&
      bruchdehnungE !== undefined
    )
  }, [
    breite,
    bruchdehnungA,
    bruchdehnungE,
    dickeHinten,
    dickeVorn,
    guete,
    hersteller,
    materialNummer,
    streckgrenzeA,
    streckgrenzeE,
    zugfestigkeitA,
    zugfestigkeitE,
  ])

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
            value={hersteller ? [{ id: hersteller }] : []}
            options={[{ label: 'Mendritzki', id: 'Mendritzki' }]}
            onChange={(params) => {
              setHersteller(params.option?.id as string)
            }}
          />
        </FormControl>
        <FormControl label={() => 'Materialnummer'}>
          <Input
            value={materialNummer || ''}
            startEnhancer={'M'}
            onChange={(e) => {
              setMaterialNummer(e.currentTarget.value)
            }}
          />
        </FormControl>
        <FormControl label={() => 'Materialgüte'}>
          <Input
            value={guete || ''}
            onChange={(e) => {
              setGuete(e.currentTarget.value)
            }}
          />
        </FormControl>
        <FormControl label={() => 'Bandbreite'}>
          <Input
            value={breite || ''}
            endEnhancer={'mm'}
            onChange={(e) => {
              setBreite(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={10}
          />
        </FormControl>
        <FormControl label={() => 'Banddicke (vorn)'}>
          <Input
            value={dickeVorn || ''}
            endEnhancer={'mm'}
            onChange={(e) => {
              setDickeVorn(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
        <FormControl label={() => 'Banddicke (hinten)'}>
          <Input
            value={dickeHinten || ''}
            endEnhancer={'mm'}
            onChange={(e) => {
              setDickeHinten(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
        <FormControl label={() => 'Zugfestigfkeit A'}>
          <Input
            value={zugfestigkeitA || ''}
            endEnhancer={'MPa'}
            onChange={(e) => {
              setZugfestigkeitA(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
        <FormControl label={() => 'Zugfestigfkeit E'}>
          <Input
            value={zugfestigkeitE || ''}
            endEnhancer={'MPa'}
            onChange={(e) => {
              setZugfestigkeitE(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
        <FormControl label={() => 'Streckgrenze A'}>
          <Input
            value={streckgrenzeA || ''}
            endEnhancer={'N/mm²'}
            onChange={(e) => {
              setStreckgrenzeA(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
        <FormControl label={() => 'Streckgrenze E'}>
          <Input
            value={streckgrenzeE || ''}
            endEnhancer={'N/mm²'}
            onChange={(e) => {
              setStreckgrenzeE(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
        <FormControl label={() => 'Bruchdehnung A'}>
          <Input
            value={bruchdehnungA || ''}
            endEnhancer={'%'}
            onChange={(e) => {
              setBruchdehnungA(e.currentTarget.valueAsNumber)
            }}
            type={'number'}
            step={0.1}
            min={0}
            max={1000}
          />
        </FormControl>
        <FormControl label={() => 'Bruchdehnung E'}>
          <Input
            value={bruchdehnungE || ''}
            endEnhancer={'%'}
            onChange={(e) => {
              setBruchdehnungE(e.currentTarget.valueAsNumber)
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
          disabled={!isValid()}
          onClick={() => {
            if (isValid()) {
              onClose({
                hersteller: hersteller as string,
                materialNummer: materialNummer as string,
                guete: guete as string,
                breite: breite as number,
                dickeVorn: dickeVorn as number,
                dickeHinten: dickeHinten as number,
                zugfestigkeitA: zugfestigkeitA as number,
                zugfestigkeitE: zugfestigkeitE as number,
                streckgrenzeA: streckgrenzeA as number,
                streckgrenzeE: streckgrenzeE as number,
                bruchdehnungA: bruchdehnungA as number,
                bruchdehnungE: bruchdehnungE as number,
              })
            }
          }}
        >
          OK
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
})

export { CoilInfos }
