export function Field({ label, children }) {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      {children}
    </div>
  );
}
export function TextInput(props) { return <input className="input" {...props} />; }
export function Select(props) { return <select className="select" {...props} />; }
