import React from 'react';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  min-height: 500px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 0px 10px;
`;

const StyledHeaderDiv = styled.div`
  text-align: center;
  font-size: 0.8em;
  p {
    text-align: left;
  }
`;

const StyledTableTd = styled.td`
  padding-right: 16px;
`;

export default function Shipping() {
  return (
    <StyledWrapperDiv>
      <div>
        <StyledHeaderDiv>
          <b>SHIPPING COSTS &amp; DELIVERY TIMES:</b>
        </StyledHeaderDiv>
        <p>Orders must be placed by 11am EST to start processing the same day. Processing time typically process within&nbsp;3-5 business days (Monday - Friday).</p>
        <p>Delivery times are based on orders placed between Monday-Friday (excluding holidays, holiday weekends).</p>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <StyledTableTd>
                <p><b>Shipping Method</b></p>
              </StyledTableTd>
              <StyledTableTd>
                <p><b>Costs</b></p>
              </StyledTableTd>
              <StyledTableTd>
                <p><b>Total Delivery Time</b></p>
              </StyledTableTd>
            </tr>
            <tr>
              <StyledTableTd>
                <p>Standard Shipping via USPS on orders $60 and over</p>
              </StyledTableTd>
              <StyledTableTd>
                <p>FREE</p>
              </StyledTableTd>
              <StyledTableTd>
                <p>3-7 Business Days</p>
              </StyledTableTd>
            </tr>
            <tr>
              <StyledTableTd>
                <p>Standard Shipping via USPS&nbsp;</p>
              </StyledTableTd>
              <StyledTableTd>
                <p>Rates Vary</p>
              </StyledTableTd>
              <StyledTableTd>
                <p>3-7 Business Days</p>
              </StyledTableTd>
            </tr>
            <tr>
              <StyledTableTd>
                <p>International Shipping via DHL</p>
              </StyledTableTd>
              <StyledTableTd>
                <p>Rates Vary</p>
              </StyledTableTd>
              <StyledTableTd>
                <p>25-30 Business Days</p>
              </StyledTableTd>
            </tr>
          </tbody>
        </table>
        <p>Hely Cosmetics&nbsp;SHALL NOT BE LIABLE for any lost, stolen, custom fees, custom duties countries may apply, damaged packages or for any delay caused by act or default of the shipping carrier.&nbsp;</p>
        <p><strong>RETURNED PACKAGES</strong></p>
        <p>If a package is returned due to wrong address, non-deliverable, or refused package customer is responsible for shipping to resend package.</p>
        <p><span>Please notify our customer service team within 15 days after tracking states delivered regarding any questions on your order.&nbsp;</span></p>
        <p><b>INTERNATIONAL ORDERS</b></p>
        <p>We currently offer international shipping for the following countries: Mexico, United States, and Canada. Please note that shipping may take up to 25-30 days.&nbsp;</p>
        <p><strong><em>Please note we are not responsible for custom fees&nbsp;&amp; custom duties. If you refuse to pay custom fee &amp; custom duties. Your package will be sent back. We will only refund you for the product cost only, no shipping fees will be covered</em>.&nbsp;</strong></p>
        <p>&nbsp;</p>
        <p><b>QUESTIONS</b></p>
        <p>Please email info@helycosmetics.com </p>
      </div>
    </StyledWrapperDiv>
  );
}