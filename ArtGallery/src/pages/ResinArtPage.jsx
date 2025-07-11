import ProductCategoryPage from '../components/ProductCategoryPage';

const priceRanges = [
  { label: 'Under ₹1000', min: 0, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: 'Above ₹2000', min: 2000, max: Infinity },
];

const subcategories = [
  'All',
  'NewBorn',
  'Marriage',
  'Anniversary',
  'Birthday',
  'Decorative',
  'Memorial',
];

export default function ResinArtPage() {
  return (
    <ProductCategoryPage
      category="resin"
      title="Resin Art"
      subcategories={subcategories}
      priceRanges={priceRanges}
    />
  );
}
