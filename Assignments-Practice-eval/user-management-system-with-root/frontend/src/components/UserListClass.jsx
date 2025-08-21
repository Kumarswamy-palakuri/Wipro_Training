import React from "react";

class UserListClass extends React.Component {
  render() {
    return (
      <div>
        <h2>User List (Class Component)</h2>
        <ul>
          {this.props.users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserListClass;
