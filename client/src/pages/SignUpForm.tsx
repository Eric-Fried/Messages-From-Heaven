import { FormEvent, useState } from 'react';
import '../pages/SignUpForm.css';

import { Link, useParams } from 'react-router-dom';
// import { PurchaseForm } from '../Components/PurchaseForm';

export function SignUpForm() {
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
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <Link to="/" className="btn text-secondary">
                {/* TODO: Instead of a div, the above should link to `/` */}
                &lt; Back to catalog
              </Link>
            </div>
          </div>
          <div className="row mb-4 plan-description">
            <div>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="planId" value={planId} />

                <label>
                  User Name:
                  <input name="addressedTo" />
                </label>

                <label>
                  Password:
                  <input name="password" type="password" />
                </label>

                <div className="button-row">
                  <button>Sign Up</button>
                </div>
                <p>Already Have An Account?</p>

                <div className="button-row">
                  <button>Sign in Here</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-7">
            <h2>
              {' '}
              <div></div>
            </h2>
            <h5 className="text-secondary">
              <div></div>
            </h5>
            <p>{<div></div>}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
