import { useEffect, useState } from 'react';
import { fetchDonorProduct, type DonorPlan, toDollars } from '../lib';
import './ProductDetails.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PurchaseForm } from '../Components/PurchaseForm';

export function DonorProductDetails() {
  const isLoggedIn = localStorage.getItem('token');
  // TODO: Retrieve productId from the route
  const { donorPlanId } = useParams();
  const [plan, setPlan] = useState<DonorPlan>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();
  console.log('donor plan', donorPlanId);
  console.log(isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in');
    }
  }, []);

  useEffect(() => {
    async function loadProduct(donorPlanId: number) {
      try {
        const plan = await fetchDonorProduct(donorPlanId);
        setPlan(plan);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    console.log(donorPlanId);
    if (donorPlanId) {
      setIsLoading(true);
      loadProduct(+donorPlanId);
    }
  }, [donorPlanId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Product {donorPlanId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  if (!plan) return null;
  const { name, description, price } = plan;
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
              <h5 className="text-secondary">{toDollars(price)}</h5>
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
