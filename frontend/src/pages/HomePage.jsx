import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PlusCircleIcon, RefreshCcwIcon } from "lucide-react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5" />
          Add Product
        </button>
        <button className="btn btn-secondary" onClick={fetchProducts}>
          <RefreshCcwIcon className="size-5" />
          Refresh
        </button>
      </div>

      <AddProductModal />

      {error && toast.error(error)}

      {products.length === 0 && !loading && (
        <div className="card bg-base-100 shadow-xl rounded-3xl">
          <div className="card-body items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-base-content/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v6m0 0v6m0-6h6"
              />
            </svg>
            <h2 className="text-lg font-bold">No products found</h2>
            <p>Get started by adding your first product to the inventory</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
