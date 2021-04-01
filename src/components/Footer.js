import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>0</strong> item(s) left
      </span>
      <ul className="filters">
        <li>
          <Link href="/">All</Link>
        </li>
        <li>
          <Link href="/active">Active</Link>
        </li>
        <li>
          <Link href="/completed">Completed</Link>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={(event) => props.clearComplete(event)}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
