function App() {
  const kek = window.env;

  return (
    <div>
      window env:
      <pre>{JSON.stringify(window.env.API_URL, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(window.env.NODE_ENV, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(window.env, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(kek.API_URL, null, 2)}</pre>
    </div>
  );
}

export default App;
