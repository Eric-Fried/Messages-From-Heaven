import { FormEvent, useState } from 'react';
import '../pages/SignInForm.css';

import { Link } from 'react-router-dom';
// import { PurchaseForm } from '../Components/PurchaseForm';

export function SignInForm() {
  const [error, setError] = useState<unknown>();

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
      const response = await fetch('/api/auth/sign-up', options);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
    } catch (err) {
      console.error('SignUp  Form Error', err);
      setError(err);
    }
  }

  if (error)
    return (
      <div>
        Error Signing up
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
                <label>
                  User Name:
                  <input name="username" />
                </label>

                <label>
                  Password:
                  <input name="password" type="password" />
                </label>

                <div className="button-row">
                  <button>Sign In</button>
                </div>
                <p>Dont Have An Account?</p>

                <div className="button-row">
                  <Link to="/sign-up">
                    <button>Sign Up Here</button>
                  </Link>
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
