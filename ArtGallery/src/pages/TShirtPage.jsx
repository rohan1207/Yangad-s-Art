import ProductCategoryPage from '../components/ProductCategoryPage';

const priceRanges = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹700', min: 500, max: 700 },
  { label: 'Above ₹700', min: 700, max: Infinity },
];

const subcategories = [
  'All',
  'Name Printing',
  'Photo Print',
  'Designed Print',
  'Couple Sets',
  'Occasion Print',
  'Sports Print',
  'Group Sets',
  'Text Print',
  'Business Print',
];

export default function TShirtPage() {
  return (
    <ProductCategoryPage
      category="tshirt"
      title="T-Shirts"
      subcategories={subcategories}
      priceRanges={priceRanges}
    />
  );
}
