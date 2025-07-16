import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowForward, IoFilterOutline } from "react-icons/io5";
import { RiPriceTag3Line } from "react-icons/ri";
import { useProducts } from "../hooks/useProducts";

/**
 * Generic storefront page for a single product category.
 * Props:
 *   - category (string) backend category key
 *   - title (string) page heading
 *   - subcategories (string[]) list of subcategory options (first should be "All")
 *   - priceRanges ({label,min,max}[])
 */
const ProductCategoryPage = ({
  category,
  title,
  subcategories,
  priceRanges,
}) => {
  const [products, loading, error] = useProducts(category);

  const [filters, setFilters] = useState({
    subcategory: "All",
    priceRange: null,
    colour: "All",
  });
  const [visible, setVisible] = useState(6);
  const [filterMenu, setFilterMenu] = useState(false);

  // Derive colour list from data
  const colourOptions = useMemo(() => {
    const colourMap = new Map(); // Use Map to track case-insensitive unique colors

    products.forEach((p) => {
      let colours = [];
      if (Array.isArray(p.colours)) {
        colours = p.colours;
      } else if (typeof p.colours === "string") {
        colours = p.colours.split(",");
      }

      colours.forEach((c) => {
        const color = c.trim();
        // Skip empty colors or whitespace-only strings
        if (color) {
          // Convert to lowercase for case-insensitive comparison
          const lowerColor = color.toLowerCase();
          // Only add if we haven't seen this color before (case-insensitive)
          // Keep the first casing we encounter
          if (!colourMap.has(lowerColor)) {
            colourMap.set(lowerColor, color);
          }
        }
      });
    });

    // Get the unique colors with their original casing
    const uniqueColors = Array.from(colourMap.values()).sort((a, b) =>
      a.localeCompare(b)
    ); // Sort alphabetically

    return ["All", ...uniqueColors];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const subOK =
        filters.subcategory === "All" || p.subcategory === filters.subcategory;
      const priceOK =
        !filters.priceRange ||
        (Number(p.mrpPrice) >= filters.priceRange.min &&
          Number(p.mrpPrice) <= filters.priceRange.max);
      const colOK =
        filters.colour === "All" ||
        (Array.isArray(p.colours)
          ? p.colours
              .map((c) => c.trim().toLowerCase())
              .includes(filters.colour.toLowerCase())
          : (p.colours || "")
              .split(",")
              .map((c) => c.trim().toLowerCase())
              .includes(filters.colour.toLowerCase()));
      return subOK && priceOK && colOK;
    });
  }, [products, filters]);

  const viewMore = () => setVisible((v) => Math.min(v + 4, filtered.length));

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px] mt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-6"></div>
        <div className="text-2xl font-serif text-amber-600 mb-2">
          Happiness is loading...
        </div>
        <div className="text-gray-500 text-lg">
          Smile! Your art is on its way 😊
        </div>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">{title}</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full"
          onClick={() => setFilterMenu((o) => !o)}
        >
          <IoFilterOutline /> Filters
        </button>
        {filterMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded shadow-md w-full md:w-auto"
          >
            {/* subcat */}
            <div>
              <h4 className="font-medium mb-2">Subcategory</h4>
              <div className="flex flex-wrap gap-2">
                {subcategories.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilters({ ...filters, subcategory: s })}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      filters.subcategory === s
                        ? "bg-amber-500 text-white"
                        : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* price */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <RiPriceTag3Line /> Price
              </h4>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((pr) => (
                  <button
                    key={pr.label}
                    onClick={() => setFilters({ ...filters, priceRange: pr })}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      filters.priceRange?.label === pr.label
                        ? "bg-amber-500 text-white"
                        : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                    }`}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* colour */}
            <div>
              <h4 className="font-medium mb-2">Colour</h4>
              <div className="flex flex-wrap gap-2">
                {colourOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilters({ ...filters, colour: c })}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      filters.colour === c
                        ? "bg-amber-500 text-white"
                        : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Products grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.slice(0, visible).map((p) => (
            <Link key={p._id} to={`/product/${p._id}`}>
              <motion.div
                key={p._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 sm:h-64">
                  <img
                    src={p.mainImage}
                    alt={p.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-medium line-clamp-1 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs mb-2 text-gray-600 line-clamp-2">
                    {p.description}
                  </p>
                  <span className="text-amber-600">₹{p.mrpPrice}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible < filtered.length && (
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={viewMore}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-full"
          >
            View More <IoArrowForward />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProductCategoryPage;
