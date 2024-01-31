import { useEffect, useState } from 'react';
import { fetchDonorCatalog, toDollars, DonorPlan } from '../lib';
import { Link } from 'react-router-dom';
import './Catalog.css';

export function DonorCatalog() {
  const [plans, setPlans] = useState<DonorPlan[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadDonorCatalog() {
      try {
        const products = await fetchDonorCatalog();
        setPlans(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadDonorCatalog();
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
      <h1>Our Donation Plans</h1>
      <hr />
      <div className="row">
        {plans?.map((plan) => (
          <div key={plan.donorPlanId} className="col-12 col-md-6 col-lg-4">
            <ProductCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}

type CardProps = {
  plan: DonorPlan;
};
function ProductCard({ plan }: CardProps) {
  const { donorPlanId, name, price, description } = plan;
  return (
    <Link
      to={`/donorPlans/${donorPlanId}`}
      className="product text-dark card mb-4 shadow-sm text-decoration-none">
      {/* TODO: Instead of a div, the above should link to `/details/:productId` */}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-secondary">{toDollars(price)}</p>
        <p className="description card-text">{description}</p>
      </div>
    </Link>
  );
}
