import { FormEvent, useState } from 'react';
import './PurchaseForm.css';
import { useParams, useNavigate } from 'react-router-dom';
import { postPlanInfo } from '../lib';

export function PurchaseForm() {
  const [error, setError] = useState<unknown>();
  const { planId } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    // e.preventDefault();
    navigate('/');
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    try {
      await postPlanInfo(values);
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
        Recipient Name:
        <input name="addressedTo" />
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
        <button>Buy</button>
      </div>
    </form>
  );
}
