import { useEffect, useState } from 'react';
import { fetchCatalog, type Plan, toDollars } from '../lib';
import { Link } from 'react-router-dom';
import './Catalog.css';

export function Catalog() {
  const [plans, setPlans] = useState<Plan[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const products = await fetchCatalog();
        setPlans(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <div className="container">
      <h1>Catalog</h1>
      <hr />
      <div className="row">
        {plans?.map((plan) => (
          <div key={plan.planId} className="col-12 col-md-6 col-lg-4">
            <ProductCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}

type CardProps = {
  plan: Plan;
};
function ProductCard({ plan }: CardProps) {
  const { planId, name, pricePerMonth, description } = plan;
  return (
    <Link
      to={`/plans/${planId}`}
      className="product text-dark card mb-4 shadow-sm text-decoration-none">
      {/* TODO: Instead of a div, the above should link to `/details/:productId` */}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-secondary">{toDollars(pricePerMonth)}</p>
        <p className="description card-text">{description}</p>
      </div>
    </Link>
  );
}
