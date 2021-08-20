import { styled } from 'baseui'
import React from 'react'

import logoDFKI from '../assets/logo_dfki.png'
import logoFeintool from '../assets/logo_feintool.png'
import logoSeitec from '../assets/logo_seitec.png'

const StyledContainer = styled('div', ({ $theme }) => ({
  backgroundColor: $theme.colors.mono300,
  height: $theme.sizing.scale900,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale300,
}))

const StyledLogoContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}))

const StyledTextContainer = styled('div', ({ $theme }) => ({
  ...$theme.typography.LabelXSmall,
  flex: 'auto',
}))

const StyledLink = styled('a', ({ $theme }) => ({
  textDecoration: 'none',
  paddingLeft: $theme.sizing.scale600,
}))

const Footer = React.memo(() => {
  return (
    <StyledContainer>
      <StyledTextContainer>© 2021 SEITEC GmbH</StyledTextContainer>
      <StyledLogoContainer>
        <StyledLink href={'https://feintool.com'}>
          <img src={logoFeintool} alt={'Feintool'} height={'32px'} />
        </StyledLink>
        <StyledLink href={'https://dfki.de'}>
          <img src={logoDFKI} alt={'DFKI'} height={'20px'} />
        </StyledLink>
        <StyledLink href={'https://seitec.info'}>
          <img src={logoSeitec} alt={'SEITEC GmbH'} height={'24px'} />
        </StyledLink>
      </StyledLogoContainer>
    </StyledContainer>
  )
})

export { Footer }
