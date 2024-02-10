import React from "react";
import Card from "react-credit-cards-2";
import * as b from "../components/styles/Booking.styles"
import * as s from "../components/styles/SummaryBlock.styles";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
  formatPassword
} from "./utils";

import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default class PaymentForm extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
    password: ""
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    } else if (target.name === "cardpassword") {
      target.value = formatPassword(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };
  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment" className="mt-4">
        <div className="flex justify-between">

          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <s.input_text
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <s.input_text
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <s.input_text
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <s.input_text
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <s.input_text
                  type="tel"
                  name="cardpassword"
                  className="form-control"
                  pattern="\d{0,9}"

                  placeholder="카드 비밀번호 앞 두자리"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <s.input_text type="hidden" name="issuer" value={issuer} />

            <div className="form-actions flex justify-end">
              <s.black_upload_button >PAY</s.black_upload_button>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}