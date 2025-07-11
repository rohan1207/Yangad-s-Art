import ProductCategoryPage from '../components/ProductCategoryPage';

const priceRanges = [
  { label: 'Under ₹300', min: 0, max: 300 },
  { label: '₹300 - ₹600', min: 300, max: 600 },
  { label: 'Above ₹600', min: 600, max: Infinity },
];

const subcategories = [
  'All',
  'bookmarks',
  'wall decor',
  'home accessories',
  'baby items',
  'accessories',
];

export default function CrochetPage() {
  return (
    <ProductCategoryPage
      category="crochet"
      title="Crochet"
      subcategories={subcategories}
      priceRanges={priceRanges}
    />
  );
}
