import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import ClassList from './components/CLassList';
import Login from './components/Login';
import { logout } from './state/actions/auth';
import { IStoreState } from './state/reducers';
import { IClassState } from './types/models';

const AppContainer = styled(`div`)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw'
});

interface IAppProps {
  isAuth: string,
  loading: string,
  classes: IClassState[],
  logout: () => void
}

class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props)
  }
  public render() {
    return (
      <AppContainer>
        {
          this.props.loading ?
            <div>Loading...</div> :
            this.props.isAuth ?
              <ClassList classes={this.props.classes} logout={this.props.logout} /> :
              <Login />
        }
      </AppContainer>

    )
  }
}

const mapStateToProps = (state: IStoreState) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
  classes: state.auth.classes
})

// @ts-ignore
export default connect(mapStateToProps, { logout })(App);
