import {
  CircleDollarSignIcon,
  ImageIcon,
  PackageSearch,
  PackageSearchIcon,
  PlusCircleIcon,
} from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const AddProductModal = () => {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <>
      <dialog id="add_product_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Add New Product!</h3>

          <form onSubmit={addProduct} className="space-y-6">
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
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost">Cancel</button>
              </form>
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
                    <PlusCircleIcon className="size-5" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AddProductModal;
