function UserProfile(props){
  return (
    <div className="container">
    <h2 className="header">{props.name}</h2>
    <p className="age">Age: {props.age}</p>
    <p className="bio">Bio: {props.bio}</p>
    </div>
  )
}
export default UserProfile;
