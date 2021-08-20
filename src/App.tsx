import { BaseProvider, LightTheme } from 'baseui'
import {
  ALIGN,
  HeaderNavigation as Navigation,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation'
import { Layer } from 'baseui/layer'
import { StyledLink } from 'baseui/link'
import React from 'react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'

import logoBmwi from './assets/logo_bmwi.png'
import logoSpaicer from './assets/logo_spaicer.png'
import { DigitalCoil } from './components/DigitalCoil'
import { Footer } from './components/Footer'
const engine = new Styletron()

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Navigation
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                paddingRight: $theme.sizing.scale600,
                borderBottomColor: $theme.colors.mono400,
              }),
            },
          }}
        >
          <NavigationList $align={ALIGN.left}>
            <NavigationItem>
              <StyledLink href={'https://spaicer.de'}>
                <img
                  src={logoSpaicer}
                  alt={'SPAICER'}
                  height={'20px'}
                  style={{
                    paddingTop: '6px',
                  }}
                />
              </StyledLink>
            </NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.center}>
            <NavigationItem>Digitales Coil</NavigationItem>
          </NavigationList>
          <NavigationList $align={ALIGN.right}>
            <NavigationItem>
              <StyledLink href={'https://bmwi.de'}>
                <img src={logoBmwi} alt={'BMWi'} height={'45px'} />
              </StyledLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
        <Layer>
          <div
            style={{
              boxSizing: 'border-box',
              width: '100vw',
              position: 'fixed',
              bottom: '0',
              left: '0',
            }}
          >
            <Footer />
          </div>
        </Layer>
        <DigitalCoil />
      </BaseProvider>
    </StyletronProvider>
  )
}

export default App
