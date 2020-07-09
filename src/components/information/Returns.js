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

class Returns extends React.Component {
  render() {
    return (
      <StyledWrapperDiv>
        <div>
          <p><b>Returns, Refunds, and Exchanges</b></p>
          <p>Thank you for shopping at Hely Cosmetics! We want to ensure that you are happy with your purchase.</p>
          <p>Customers of Hely Cosmetics. (the “Company,”), and/or www.helycosmetics.com (the “Site”) may obtain a refund with a 15% restocking fee on all refunded orders or exchange of their product(s) if the return is made within thirty (30) calendar days from the date when the product was purchased by the Customer from the Company and/or the Site, and in accordance with the Policies below.</p>
          <p>Please notify info@helycosmetics.com within 15 days after tracking states delivered regarding any questions on your order.</p>
          <p>Open and/or used items cannot be refunded/exchanged under any circumstances.</p>
          <b>1. RETURNS</b><br/>
          <p>In order for the item to be eligible for a return, it must be unused, undamaged, and returned in the same condition in which it was received from the Company or the Store. It must also be returned in the original packaging.</p>
          <p><span>Please note once an order is placed we can not modify the order, only cancel and issue a store credit.</span></p>
          <p><b>Exceptions</b></p>
          <p>The following types of goods may not be returned:</p>
          <ul>
            <li>Gift cards</li>
          </ul>
          <p><b>Requirements:</b></p>
          <p>In order to complete your return, you must provide a valid receipt or proof of purchase with the returned item. Also include your order ID, phone number, email address and shipping address if different from the original order. Upon receipt of returned items, Hely Cosmetics will contact you to confirm your exchange needs and arrange collection of your billing information to ship the exchanged products to you (including a 15% restocking for the items exchanged and new shipping costs).</p>
          <p>Refunds will not be given for any items that are:</p>
          <ul>
            <li>Not returned in their original condition;</li>
            <li>Not purchased from the Company and/or Site;</li>
            <li>Damaged or missing parts for reasons not due to Company error, or</li>
            <li>Returned more than thirty (30) days after the date of purchase.</li>
          </ul>
          <b>2. REFUNDS (IF APPLICABLE)</b><br/>
          <p>Once your return is received, processed, and inspected, we will send you an email or call to notify you that we have received your returned item, at which point we will also notify you of the approval or rejection of your refund.</p>
          <p>If your refund is approved and processed, within fourteen (14) business days, you will receive credit for your purchase in one of the following ways:</p>
          <ul>
            <li>Store Credit</li>
            <li>Electronic Gift Card</li>
          </ul>
          <p>Please note, when a product is out of stock we will issue an electronic gift card for total amount of product paid for.</p>
          <p>If you do not receive your credit within two weeks of its approval, please email us at info@helycosmetics.com</p>
          <p><span><em>2. REEMBOLSOS (SI ES APLICABLE)</em></span></p>
          <p><span><em>Una vez recibida, procesada e inspeccionada su devolución, le enviaremos un correo electrónico o una llamada para notificarle que hemos recibido su artículo devuelto, también le notificaremos la aprobación o el rechazo de su reembolso.</em></span></p>
          <p><span><em>Si su reembolso es aprobado y procesado, dentro de los catorce (14) días hábiles, recibirá crédito por su compra de una de las siguientes maneras:</em></span></p>
          <ul>
            <li><span><em>Crédito de la tienda</em></span></li>
            <li><span><em>Tarjeta de regalo electrónica</em></span></li>
          </ul>
          <p>Cuando un producto esté agotado, emitiremos una tarjeta de regalo electrónica por la cantidad total del producto pagado.</p>
          <p><span><em>Si no recibe su crédito dentro de las dos semanas posteriores a su aprobación, envíenos un correo electrónico a info@helycosmetics.com</em></span></p>
          <b>3. SALE ITEMS</b><br/>
          <p>Only the cost of regular priced items will be credited. Sale items are final sale.</p>
          <p><span><em>3. VENTA DE ARTÍCULOS Solo se acreditará el costo de los artículos de precio regular. Los artículos en venta son venta final.</em></span></p>
          <b>4. REPLACEMENTS/EXCHANGES</b><br/>
          <p>We only replace items at no cost to the customer if there is a manufacturing defect.</p>
          <p>If the customer wants to exchange a purchased item for another size, model or color of equal value, the customer will be charged a 15% restocking fee.</p>
          <p>If you need to exchange a purchase, please email us at info@helycosmetics.com for instructions.</p>
          <b>5. GIFTS</b><br/>
          <p>If you received an item from our store as a gift and wish to return the item in accordance with our Returns Policy, we will provide you with an electronic gift certificate for the current retail value of the item.</p>
          <b>6. PAYMENT METHODS</b><br/>
          <p>The Company accepts the following methods of payment: Visa, MasterCard, American Express, Discover Card, JCB and Paypal.</p>
          <b>7. CURRENCY</b><br />
          <p>All prices for merchandise are stated in U.S. Dollars.</p>
          <b>8. SHIPPING</b><br />
          <p>To return or exchange your product, please mail your product to:</p>
          <div><b>TBD</b></div>
          <div><b>TBD</b></div>
          <p>A traceable method of shipment is highly recommended to prove your product was received.</p>
          <p>You will be responsible for paying for your own return shipping costs for returning your item, unless there was a manufacturer defect. Original shipping costs are non-refundable.</p>
          <p>The time it may take for your exchanged product to reach you may vary depending on your shipping address.</p>
        </div>
      </StyledWrapperDiv>
    )
  }
};

export default Returns;