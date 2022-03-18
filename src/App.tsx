function App() {
  const kek = window.env;

  return (
    <div>
      window env:
      <p>API_URL: {JSON.stringify(window.env.API_URL)}</p>
      <hr />
      <p>NODE_ENV: {JSON.stringify(window.env.NODE_ENV)}</p>
      <hr />
      <p>
        BOOL: {JSON.stringify(window.env.BOOL)} ({typeof window.env.BOOL})
      </p>
      <hr />
      <p>
        NUM: {JSON.stringify(window.env.NUM)} ({typeof window.env.NUM})
      </p>
      <hr />
      <pre>{JSON.stringify(window.env, null, 2)}</pre>
    </div>
  );
}

export default App;
