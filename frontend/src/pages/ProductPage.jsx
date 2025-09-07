import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import {
  ArrowLeftIcon,
  CircleDollarSignIcon,
  ImageIcon,
  PackageSearchIcon,
  UploadCloud,
} from "lucide-react";

const ProductPage = () => {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  {
    error && <div className="alert alert-error shadow-lg mb-4"></div>;
  }

  {
    loading && (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-4">
        <ArrowLeftIcon className="size-5" />
        Back to Product
      </button>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="w-1/2">
          <img src={currentProduct?.image} alt={currentProduct?.name} />
        </figure>
        <div className="card-body w-1/2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id);
              navigate("/");
            }}
            className="space-y-6"
          >
            <label className="input input-bordered flex items-center gap-2">
              <PackageSearchIcon className="size-5" />
              <input
                type="text"
                className="grow"
                placeholder="product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <CircleDollarSignIcon className="size-5" />
              <input
                type="text"
                className="grow"
                placeholder="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <ImageIcon className="size-5" />
              <input
                type="text"
                className="grow"
                placeholder="image url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </label>
            <div className="card-actions justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (
                    window.confirm(
                      "Are you sure you want to delete this product?"
                    )
                  ) {
                    deleteProduct(id);
                    navigate("/");
                  }
                }}
                className="btn btn-neutral"
              >
                Delete
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  !formData.name ||
                  !formData.price ||
                  !formData.image ||
                  loading
                }
              >
                {loading ? (
                  <div className="flex justify-center items-center min-h-[50vh]">
                    <span className="loading loading-infinity loading-xl"></span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="size-5" />
                    Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
