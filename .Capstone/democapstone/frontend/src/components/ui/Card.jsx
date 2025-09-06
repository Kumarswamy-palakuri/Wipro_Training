export function Card({ children, style }) {
  return <div className="card" style={style}><div className="card-body">{children}</div></div>;
}
export function Panel({ title, right, children }) {
  return (
    <section className="card" style={{ overflow: "hidden" }}>
      <div className="panel-header">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div>{right}</div>
      </div>
      <div className="card-body">{children}</div>
    </section>
  );
}
