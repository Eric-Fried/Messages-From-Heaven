import type { FormEvent } from 'react';
import './PurchaseForm.css';

export function PurchaseForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    console.log('uncontrolled values:', values);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name of Planholder:
        <input name="Purchaser " />
      </label>
      <label>
        Reciepient Name:
        <input name="recepient" />
      </label>
      <label>
        Message:
        <input
          className="message-box"
          name="message"
          value="Your Message Goes Here"
        />
      </label>
      <label>
        Username
        <input name="password" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <div className="button-row">
        <button>Sign Up</button>
      </div>
    </form>
  );
}
