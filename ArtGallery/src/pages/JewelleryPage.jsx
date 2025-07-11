import ProductCategoryPage from '../components/ProductCategoryPage';

const priceRanges = [
  { label: 'Under ₹1000', min: 0, max: 1000 },
  { label: '₹1000 - ₹1500', min: 1000, max: 1500 },
  { label: 'Above ₹1500', min: 1500, max: Infinity },
];

const subcategories = [
  'All',
  'Necklace',
  'Bracelet',
  'Ring'
];

export default function JewelleryPage() {
  return (
    <ProductCategoryPage
      category="jewellery"
      title="Jewellery"
      subcategories={subcategories}
      priceRanges={priceRanges}
    />
  );
}
