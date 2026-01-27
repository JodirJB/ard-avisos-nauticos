export class JwtAuthResult {
  accessToken = '';
  userName = '';
  isAdmin = false;
  isAuthenticated = false;
  accessTokenExpiration!: Date;
  refreshTokenExpiration!: Date;
}