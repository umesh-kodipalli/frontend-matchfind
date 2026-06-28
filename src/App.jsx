import NameForm from "./components/NameForm";

// App stays intentionally thin: it just centers the page and renders the
// form. Keeping layout here (rather than inside NameForm) means more
// sections/forms can be added to the page later without touching the
// form's own logic.


function App() {
  return (
    <div className="app">
      <NameForm />
    </div>
  );
}

export default App;