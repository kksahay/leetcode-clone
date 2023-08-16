import { useState } from "react"
import Layout from "../../components/layout/Layout"
import axios from "axios"
import { useAuth } from "../../context/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, {
        username,
        password
      })
      if (res && res.data) {
        setAuth({
          ...auth,
          username: res.data.user.username,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username*: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password*: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </Layout >
  )
}
export default Login