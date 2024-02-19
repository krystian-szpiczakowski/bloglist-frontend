const UserDetails = ({ user, onLogout }) => {
  return (
    <div>
      <p>User {user.name} is logged in</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserDetails;
