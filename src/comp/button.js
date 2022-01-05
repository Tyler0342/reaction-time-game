import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/button.module.css';

import { getAll, getSingle } from '../util/localstorage';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogin() {
    window.addEventListener('message', authComplete);

    const h = 500;
    const w = 350;
    const left = (screen.width / 2) - (w / 2);
    const top  = (screen.height / 2) - (h / 2);

    const authWindow = window.open(
      `https://repl.it/auth_with_repl_site?domain=${location.host}`,
      '_blank',
      `modal=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );

    function authComplete(e) {
      if (e.data != 'auth_complete') {
        return;
      }

      window.removeEventListener('message', authComplete);

      authWindow.close();

      fetch("/coder100s-api", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
          single: getSingle(),
          average: getAll()
        })
      })

      location.reload();
    }
  }

  render() {
    if (this.props.type == "login") {
      return (
        <button
          onClick={this.handleLogin}
          className={`${styles.auth} ${this.props.css} ${styles.red}`}
        >{this.props.children}</button>
      );
    }

    if (this.props.disabled) {
      return (
        <a
          onClick={this.props.onClick}
          className={`${this.props.css || ''} ${styles[this.props.type]} ${styles.btn}`}
        >
          {this.props.children}
        </a>
      );
    }

    return (
      <Link
        to={this.props.to}
        onClick={this.props.onClick}
        className={`${this.props.css || ''} ${styles[this.props.type]} ${styles.btn}`}
      >
        {this.props.children}
      </Link>
    );
  }
}

export default Button;