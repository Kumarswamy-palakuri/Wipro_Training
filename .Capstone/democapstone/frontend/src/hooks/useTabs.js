import { useState } from "react";
export default function useTabs(defaultKey) {
  const [active, setActive] = useState(defaultKey);
  const TabList = ({ tabs }) => (
    <div style={{ display: "flex", gap: 8, marginBottom: 12, borderBottom: "1px solid var(--color-border)" }}>
      {tabs.map(t => (
        <button
          key={t.key}
          className={active === t.key ? "btn btn-primary" : "btn btn-ghost"}
          onClick={() => setActive(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
  const Panel = ({ when, children }) => active === when ? children : null;
  return { active, setActive, TabList, Panel };
}
