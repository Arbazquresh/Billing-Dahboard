import React from "react";
import "./setting.css";

export const Setting = () => {
  return (
    <div>
      <div className="invoice-box">
        <div className="invoice-header">
          <img src="" alt="Logo" className="logo" />
          <h1>Medipharma</h1>
          <p>apple tree cottage, telco colony, jabhulwadi road - 69104</p>
          <p>+917902725377</p>
          <p>demo@demo.com</p>
        </div>

        <div className="invoice-details">
          <div className="invoice-table">
            <h3>Order Invoice</h3>
          </div>
          <table>
            <tr>
              <td>Order No:</td>
            </tr>
            <tr>
              <td>Order Date:</td>
            </tr>
            <tr>
              <td>Delivery Date:</td>
            </tr>
          </table>
        </div>

        <table className="service-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Rate</th>
              <th>QTY</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>

        <div className="invoice-to">
          <p>Invoice To:</p>
        </div>

        <table className="summary-table">
          <tr>
            <td>Sub Total:</td>
          </tr>
          <tr>
            <td>Addon:</td>
          </tr>
          <tr>
            <td>Discount:</td>
          </tr>
          <tr>
            <td>Tax (1%):</td>
          </tr>
          <tr>
            <td>Gross Total:</td>
          </tr>
          <tr>
            <td>Paid Amount:</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
