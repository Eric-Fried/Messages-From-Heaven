import { useEffect, useState } from 'react';
import { fetchProduct, type Plan, toDollars } from '../lib';
import './ProductDetails.css';
import { Link, useParams } from 'react-router-dom';
import { PurchaseForm } from '../Components/PurchaseForm';

export function ProductDetails() {
  // TODO: Retrieve productId from the route
  const { planId } = useParams();
  const [plan, setPlan] = useState<Plan>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadProduct(planId: number) {
      try {
        const plan = await fetchProduct(planId);
        setPlan(plan);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (planId) {
      setIsLoading(true);
      loadProduct(+planId);
    }
  }, [planId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Product {planId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  if (!plan) return null;
  const { name, description, pricePerMonth } = plan;
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
            {/* <div className="col-12 col-sm-6 col-md-5">
              <img src={imageUrl} alt={name} className="image" />
            </div> */}
            <div className="col-12 col-sm-6 col-md-7">
              <h2>{name}</h2>
              <h5 className="text-secondary">{toDollars(pricePerMonth)}</h5>
              <p>{description}</p>
            </div>
          </div>
          <div className="row purchase-form">
            <PurchaseForm />
          </div>
        </div>
      </div>
    </div>
  );
}
