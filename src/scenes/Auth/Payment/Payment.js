import React from "react";
import { Wompi } from "../../../components/Wompi/Wompi";
import logo from "../../../assets/img/Logo.png";


export const Payment = () => {
  return (
    <div className="payment">
      <div className="invoice-card">
        <img className="payment__logo" alt="logo" src={logo} />
        <div className="invoice-title">
          <div id="main-title">
            <h4>FACTURA DE PAGO</h4>
            <span>#001</span>
          </div>
          <span className="mt-10" id="date">Arturo diaz bravo</span>
          <span id="date">22/03/2019</span>
        </div>
        <div className="invoice-details">
          <table className="invoice-table">
            <thead>
              <tr>
                <td>Producto</td>
                <td>Valor</td>
              </tr>
            </thead>
            <tbody>
              <tr className="row-data">
                <td>Plan de publicidad basico </td>
                <td>150.000</td>
              </tr>
              <tr className="calc-row">
                <td><b>Total</b></td>
                <td>150.000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoice-footer">
          <button className=""><Wompi value={150000} /></button>
        </div>
      </div>
    </div>
  );
};
