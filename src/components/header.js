import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import { theme, Link, Button, LeftFrame, RightFrame } from '../theme'
import logo from '../logo_white.png';

const HeaderFrame = styled.div`
  background-color: ${theme.annaGray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;

  :hover {
    cursor: pointer;
  }

  #link {
    text-decoration-color: ${theme.UniswapPink};
  }

  #title {
    display: inline;
    font-size: 1rem;
    font-weight: 500;
    color: ${theme.wisteriaPurple};
    :hover {
      color: ${darken(0.1, theme.wisteriaPurple)};
    }
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0.5rem 0.5rem 0;

  :hover {
    cursor: pointer;
  }

  #link {
    text-decoration-color: ${theme.UniswapPink};
  }

  #title {
    display: inline;
    font-size: 1rem;
    font-weight: 500;
    color: ${theme.wisteriaPurple};
    :hover {
      color: ${darken(0.1, theme.wisteriaPurple)};
    }
  }
`

const StatusGeneric = styled.button`
  width: 100%;
  font-size: 0.9rem;
  align-items: center;
  padding: 0.5rem;
  border-radius: 2rem;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`

const StatusConnect = styled(StatusGeneric)`
  background-color: transparent;
  border: 1px solid ${theme.royalBlue};
  color: ${theme.royalBlue};
  font-weight: 500;

  :hover,
  :focus {
    border: 1px solid ${darken(0.1, theme.royalBlue)};
    color: ${darken(0.1, theme.royalBlue)};
  }

  :active {
    background-color: ${darken(0.1, theme.backgroundColor)};
  }
`

const LogoFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const LogoElement = styled.div`
  margin-right: 0.4rem;
  display: flex;
  min-width: 0;
  align-items: center;
`

const Status = styled.div`
  display: flex;
  align-items: center;
`

const StatusElement = styled.div`
  margin: 0.5rem 0.5rem 0.5rem 0;
`

export default function Header({app}) {
  let location = !window.channel ? (
    "All messages"
  ) : (!window.threadId ? (
    window.channel
  ) : (
    window.channel + " » " + window.threads.get(window.threadId).name
  ))
  return (
    <HeaderFrame id="header">
      <LeftFrame>
        <Logo>
          <Link id="link" href="https://nearprotocol.com">
            <LogoFrame>
              <LogoElement>
              <img src={logo} width="22" height="22" alt="logo"/>
              </LogoElement>
              <LogoElement>
              <h1 id="title">Near Share</h1>
              </LogoElement>
            </LogoFrame>
          </Link>
        </Logo>
      </LeftFrame>
      <RightFrame>
        <Title>
          {location}
        </Title>
        {app.state.connected ? (
          <Status>
            {app.state.signedIn && app._accountKey ? (
              <Title>Full Access</Title>
            ) : (
              <Title>Limited Access</Title>
            )}
            {app.unauthorizedDeviceKey ? (
              <StatusElement>
                <Button onClick={() => app.authorizeDeviceKey()}>Auth Device</Button>
              </StatusElement>
            ) : (null)}
            {app.state.signedIn ? (
              <StatusElement>
                <StatusConnect onClick={() => app.requestSignOut()}>Sign Out</StatusConnect>
              </StatusElement>
            ) : (
              <StatusElement>
                <Button onClick={() => app.requestSignIn()}>Log In</Button>
              </StatusElement>
            )}
          </Status>
        ) : (
          <Status>
            <Title>No Access</Title>
            <StatusElement>
              <StatusConnect onClick={() => window.location.reload()}>Connecting...</StatusConnect>
            </StatusElement>
          </Status>
        )}
      </RightFrame>
    </HeaderFrame>
  )
}
