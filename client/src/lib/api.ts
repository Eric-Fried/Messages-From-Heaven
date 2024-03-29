export type Plan = {
  planId: number;
  name: string;
  description: string;
  planType: string;
  pricePerMonth: number;
};

export type DonorPlan = {
  donorPlanId: number;
  name: string;
  description: string;
  planType: string;
  price: number;
};

/**
 * Fetches all products from the API.
 * @returns Promise that resolves to an array of products.
 */
export async function fetchCatalog(): Promise<Plan[]> {
  const res = await fetch('/api/plans');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches a single product from the API.
 * @param {number} productId The ID of the product to fetch.
 * @returns Promise that resolves to the product.
 */
export async function fetchProduct(planId: number): Promise<Plan> {
  const res = await fetch(`/api/plans/${planId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
export async function postPlanInfo(values: object): Promise<void> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  };
  const response = await fetch('/api/planInfo', options);
  if (!response.ok) throw new Error(`Server error: ${response.status}`);
}

export async function fetchDonorCatalog(): Promise<DonorPlan[]> {
  const res = await fetch('/api/donorPlans');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchDonorProduct(
  donorPlanId: number
): Promise<DonorPlan> {
  const res = await fetch(`/api/donorPlans/${donorPlanId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
