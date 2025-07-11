import ProductCategoryPage from '../components/ProductCategoryPage';

const priceRanges = [
  { label: 'Under ₹300', min: 0, max: 300 },
  { label: '₹300 - ₹500', min: 300, max: 500 },
  { label: 'Above ₹500', min: 500, max: Infinity },
];

const subcategories = [
  'All',
  'Sports Theme Candle',
  'Jar Candles',
  'Bouquet Candles',
  'Personalised Candles',
  'Flower Candle',
];

export default function CandlesPage() {
  return (
    <ProductCategoryPage
      category="candle"
      title="Candles"
      subcategories={subcategories}
      priceRanges={priceRanges}
    />
  );
}
