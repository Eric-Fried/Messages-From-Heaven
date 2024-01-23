import { FormEvent, useState } from 'react';
import './PurchaseForm.css';
import { useParams } from 'react-router-dom';

export function PurchaseForm() {
  const [error, setError] = useState<unknown>();
  const { planId } = useParams();

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      };
      const response = await fetch('/api/planInfo', options);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
    } catch (err) {
      console.error('Purchase Form Error', err);
      setError(err);
    }
  }

  if (error)
    return (
      <div>
        Error saving Plan {planId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="planId" value={planId} />
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
        <textarea
          className="message-box"
          name="message"
          placeholder="Your Message Goes Here"
        />
      </label>

      <div className="button-row">
        <button>Sign Up</button>
      </div>
    </form>
  );
}
