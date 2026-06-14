// src/components/CreditCard.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import "./CreditCard.css";

export default function CreditCard() {
  const { totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saved, setSaved] = useState(false);

  // Strip non-digits, cap at 16, then insert a space every 4 digits
  // to produce the required "1234 5678 9012 3456" format.
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  };

  // Auto-insert the slash so the user types MMYY and sees MM/YY.
  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleSubmit = () => {
    const digits = cardNumber.replace(/\s/g, "");
    if (!cardName || digits.length !== 16 || expiry.length !== 5 || cvv.length < 3) {
      alert("Please complete every field with a valid 16-digit card number.");
      return;
    }

    // Persist card data to localStorage as required by the assignment.
    // NOTE: the CVV is intentionally NOT stored. PCI DSS forbids retaining
    // the security code after authorization, even in a prototype.
    const cardData = {
      cardName,
      cardNumber, // saved in the grouped "1234 5678 9012 3456" display format
      expiry,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("eztech_card", JSON.stringify(cardData));

    clearCart();
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="payment-page">
        <div className="payment-confirm">
          <h2 className="payment-heading">Payment Saved</h2>
          <p className="confirm-text">
            Card ending in {cardNumber.slice(-4)} is securely saved for this
            session.
          </p>
          <button className="pay-btn" onClick={() => navigate("/")}>
            Return to StreamList
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      {/* Live preview card */}
      <div className="card-preview">
        <div className="card-chip" />
        <div className="card-number-preview">
          {cardNumber || "1234 5678 9012 3456"}
        </div>
        <div className="card-meta">
          <span>{cardName || "CARDHOLDER NAME"}</span>
          <span>{expiry || "MM/YY"}</span>
        </div>
      </div>

      {/* Payment form (button onClick keeps it simple and avoids a page reload) */}
      <div className="payment-form">
        <h2 className="payment-heading">Payment Details</h2>

        <label className="payment-label">
          Cardholder Name
          <input
            className="payment-input"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Earnest M. Walker"
          />
        </label>

        <label className="payment-label">
          Card Number
          <input
            className="payment-input"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
          />
        </label>

        <div className="payment-row">
          <label className="payment-label">
            Expiry
            <input
              className="payment-input"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              inputMode="numeric"
            />
          </label>

          <label className="payment-label">
            CVV
            <input
              className="payment-input"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              inputMode="numeric"
            />
          </label>
        </div>

        <div className="payment-total">Total Due: ${totalPrice.toFixed(2)}</div>

        <button className="pay-btn" onClick={handleSubmit}>
          Save Card &amp; Pay
        </button>
      </div>
    </div>
  );
}