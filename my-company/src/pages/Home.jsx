   function Home() {
     return (
       <div style={{display: "flex", justifyContent: "center", alignItems: "center" , flexDirection: "column", background: "url(./src/assets/background.jpg) no-repeat center center/cover", height: "500px", color: "#6d2440ff", width: "100%"}}>
         <h1 style={{fontSize: "2rem", padding: "20px"}}>Welcome to Our Company</h1>
         <p style={{fontSize: "1.3rem", padding: "20px", fontWeight: "bold"}}>We are dedicated to delivering excellence in all our services.</p>
       </div>
     );
   }

   export default Home;
