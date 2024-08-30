import { Link } from "react-router-dom";

export default function MyTodo() {
  return (
    <Link to="/">
      <h1 className="font-bold text-2xl p-3">
        <span className="bg-blue-300 px-1 rounded-md hover:bg-blue-500">
          My Todo
        </span>
      </h1>
    </Link>
  );
}
