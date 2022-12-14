import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null,
  };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1085807079777-u9gpd7vmmajss6rlkhtqjhepggm3gas8.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "stream-twitch",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({
      isSignedIn: this.auth.isSignedIn.get(),
    });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.onSignOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button 
        className="ui red google button"
        onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button 
        className="ui red google button"
        onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign in with google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default connect(null, {signIn, signOut})(GoogleAuth);
