import { Link }  from 'react-router-dom'


export default function Navbar() {
  return (
    <nav>
      <ul style={{backgroundColor: '#e8e6faff', color: "#a10023ff",display: "flex", justifyContent: "center" , alignItems: "center", margin: "center" }}>
        <li style={{ listStyle: "none", padding: "10px"}}><Link to='/'>Home</Link></li>
        <li style={{ listStyle: "none", padding: "10px"}}><Link to='/About'>About</Link></li>
        <li style={{ listStyle: "none", padding: "10px"}}><Link to='/Services'>Services</Link></li>
        <li style={{ listStyle: "none", padding: "10px"}}><Link to='/Contact'>Contact</Link></li>
      </ul>
    </nav>
  )
}
