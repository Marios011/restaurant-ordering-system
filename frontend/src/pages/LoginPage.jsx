import {useState} from 'react'

function LoginPage({onLogin}){
	
	const [username, setUsername]=useState('')
	const [password, setPassword]=useState('')
	const [error, setError]=useState('')
	
	const handleSubmit=(e)=>{
		e.preventDefault()
		
		const success=onLogin(username, password)
		
		if(!success){
			setError('invalid username or password')
		}
	}
	
	return(
		<div className="container d-flex justify-content-center 
		       align-items-center" style={{minHeight: '100vh'}}>
		    <div className="card p-4 shadow" style={{width: '100%', maxWidth: '400px'}}  >
		      <h2 className="text-center mb-4">Login</h2>
			  
			  <form onSubmit={handleSubmit}>
			    <div className="mb-3">
				   <label className="form-label">Username</label>
				   <input
				       type="text"
					   className="form-control"
					   value={username}
					   onChange={(e)=>setUsername(e.target.value)}
					   placeholder="Enter username"
				   />
				</div>
				
				<div className="mb-3">
				  <label className="form-label">Password</label>
				  <input
				    type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter password"
				  />
				</div>
				
				{error && <div className="alert alert-danger py-2">{error}</div>}
				
				<button type="submit" className="btn btn-dark w-100">
				  Login
				</button>  
				
			  </form>
			  
			  <div className="mt-3 small text-muted">
			     <div>Admin: admin / 1234</div>
				 <div>Waiter: waiter / 1234</div>
			  </div>
			  
			</div>
		</div>	   
	
	)
	
}


export default LoginPage