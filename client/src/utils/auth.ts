import { jwtDecode } from 'jwt-decode';
// import { JwtPayload } from 'jwt-decode';

interface UserToken {
  username: string;
  exp: number;
}

// Code copied from challenge 18 authentication file

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken() || '');
  }

  loggedIn() {
   
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

 
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);

      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      } 
      
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  login(token: string) {
 
    localStorage.setItem('token', token);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('token');
   
    window.location.assign('/');
  }
}

export default new AuthService();








