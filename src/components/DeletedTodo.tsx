import { Link } from "react-router-dom";

export default function DeletedTodo() {
  return (
    <Link to="#!">
      <h1 className="text-2xl p-3">
        <span className="bg-red-300 px-1 rounded-md hover:bg-red-500">
          Deleted Items
        </span>
      </h1>
    </Link>
  );
}
