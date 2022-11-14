import ReactDOM from "react-dom/client";

import { Tasks } from "./features/tasks";
import { Provider } from "urql";
import { client } from "./graphql/client";

const App = () => (
  <Provider value={client}>
    <Tasks />
  </Provider>
);

const rootDom = document.getElementById("root");
if (rootDom) {
  const root = ReactDOM.createRoot(rootDom);
  root.render(<App />);
}
