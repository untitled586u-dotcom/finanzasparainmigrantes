import { Route, Switch } from "wouter";
import { Provider } from "./components/provider";
import { Layout } from "./components/layout";
import { AgentFeedback } from "@runablehq/website-runtime";

// Todas las páginas se importan de forma síncrona a propósito.
// El sitio se pre-renderiza a HTML estático: si una ruta llegara con React.lazy,
// la hidratación mostraría el fallback de Suspense y sustituiría el HTML ya
// pintado por un esqueleto, provocando un salto de layout enorme (CLS ~0.12).
// El peso extra vive en los chunks de vendor, que ya están separados.
import Index from "./pages/index";
import BlogPage from "./pages/blog";
import CategoryPage from "./pages/category";
import ArticlePage from "./pages/article";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import PrivacyPage from "./pages/privacy";
import TermsPage from "./pages/terms";
import AuthorPage from "./pages/author";
import EditorialPage from "./pages/editorial";
import HowWeMakeMoneyPage from "./pages/how-we-make-money";
import NotFound from "./pages/not-found";

function App() {
  return (
    <Provider>
      <Layout>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/articulos" component={BlogPage} />
          <Route path="/categoria/:slug" component={CategoryPage} />
          <Route path="/articulo/:slug" component={ArticlePage} />
          <Route path="/sobre-nosotros" component={AboutPage} />
          <Route path="/autor/:slug" component={AuthorPage} />
          <Route path="/politica-editorial" component={EditorialPage} />
          <Route path="/como-ganamos-dinero" component={HowWeMakeMoneyPage} />
          <Route path="/contacto" component={ContactPage} />
          <Route path="/privacidad" component={PrivacyPage} />
          <Route path="/terminos" component={TermsPage} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
    </Provider>
  );
}

export default App;
