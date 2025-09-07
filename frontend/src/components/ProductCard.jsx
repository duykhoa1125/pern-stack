import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-lg text-warning">{product.price}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${product.id}`} className="btn btn-neutral">
            <EditIcon className="size-4" />
          </Link>

          <button
            className="btn btn-primary"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
