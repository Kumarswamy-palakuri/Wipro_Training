import { useSelector } from "react-redux";

export default function Profile() {
  const { user, token } = useSelector((s) => s.auth);
  return (
    <section style={{ padding: 16 }}>
      <h2>Profile</h2>
      <div style={{
        marginTop: 12, padding: 12, border: "1px solid #e5e7eb", borderRadius: 10, maxWidth: 520
      }}>
        <p><strong>Username:</strong> {user?.username}</p>
        <p style={{ wordBreak: "break-all" }}>
          <strong>Token:</strong> {token}
        </p>
      </div>
    </section>
  );
}
// import React from 'react';
// import { useSelector } from 'react-redux';

// export default function Profile() {
//   const user = useSelector((s) => s.auth.user);
//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Profile</h1>
//       <p>Username: {user?.username}</p>
//     </div>
//   );
// }
