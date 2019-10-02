import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    let { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      let { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    let {name, value} = event.target;

    this.setState({[name]: value});
  }

  render() {
    let { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account.</h2>
        <span>Sign up with you email and password.</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            label="Display name"
            handleChange={this.handleChange}
            value={displayName}
            required
          />
          <FormInput
            name="email"
            type="email"
            label="Email"
            handleChange={this.handleChange}
            value={email}
            required
          />

          <FormInput
            name="password"
            type="password"
            label="Password"
            handleChange={this.handleChange}
            value={password}
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm password"
            handleChange={this.handleChange}
            value={confirmPassword}
            required
          />
          <CustomButton type="submit">Sign up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
