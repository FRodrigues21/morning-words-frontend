import jwtDecode, { JwtPayload } from 'jwt-decode';

class Auth {
  user: JwtPayload | null;
  token: string | null;
  onUserChange: (newUser: JwtPayload | null) => void = (
    newUser: JwtPayload | null
  ) => console.log(newUser);

  constructor(user?: JwtPayload) {
    if (user) {
      this.user = user;
    }

    this.decodeToken();
    window.addEventListener(
      'storage',
      (e) => e.key === 'token' && this.decodeToken()
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.decodeToken();
  }

  decodeToken() {
    try {
      this.token = localStorage.getItem('token') || '';
      this.user = jwtDecode(this.token);
      this.onUserChange(this.user);
    } catch (e) {
      this.logout();
    }
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.setItem('token', '');
    this.onUserChange(this.user);
  }

  isAuthenticated() {
    if (this.user) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return new Date().getTime() < this.user.exp! * 1000;
    }
    return false;
  }

  getUser() {
    return this.user;
  }
}

export default Auth;
