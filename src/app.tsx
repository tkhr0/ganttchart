import ReactDOM from "react-dom/client";

const rootDom = document.getElementById("root");
if (rootDom) {
  const root = ReactDOM.createRoot(rootDom);
  root.render(<h1>Hello, world!</h1>);
}
