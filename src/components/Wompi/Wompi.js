import React from "react";
import "./Wompi.scss";
import wompiLogo from '../../assets/img/wompi-logo.png'
export const Wompi = ({ value }) => {
  return (
    <div className="wompi">
      <form action="https://checkout.wompi.co/p/" method="GET">
        <input
          type="hidden"
          name="public-key"
          value="pub_test_uKhuxkz2igWudj3iub33AeParmU11dXM"
        />
        <input type="hidden" name="currency" value="COP" />
        <input type="hidden" name="amount-in-cents" value={value} />
        <input type="hidden" name="reference" value="AD002901221" />
        <button type="submit">Pagar con <img className="logo" src={wompiLogo} /></button>
      </form>
    </div>
  );
};
