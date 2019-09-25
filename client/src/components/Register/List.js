import React from "react";
import { connect } from "react-redux";
const ConnectedList = ({ users }) => (
  <ul className="list-group list-group-flush">
    {users.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.email}
      </li>
    ))}
  </ul>
);
const mapStateToProps = state => {
  return { users: state.users };
};
const List = connect(mapStateToProps)(ConnectedList);
export default List;