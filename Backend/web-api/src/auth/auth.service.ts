import { AuthConfig } from './auth.config';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { URLSearchParams } from 'url';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;
  constructor(
    @Inject('AuthConfig')
    private readonly authConfig: AuthConfig,
    private httpService: HttpService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  authenticateUser(user: { name: string; password: string }) {
    const { name, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async generateToken(code: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('client_id', this.authConfig.clientId);
    params.append('redirect_uri', this.authConfig.redirectUrl);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = this.httpService.post(
        `${this.authConfig.tokenUrl}/oauth2/token`,
        params,
        config,
      );
      const responsePromise = response.toPromise();
      const token = await responsePromise;
      return token.data.id_token;
    } catch (e) {
      console.log(e);
    }

    return '';
  }

  async logout(): Promise<any> {
    try {
      const url = `${this.authConfig.tokenUrl}/logout?client_id=${this.authConfig.clientId}&redirect_uri=${this.authConfig.logoutRedirectUrl}`;
      const promise = this.httpService.get(url).toPromise();
      return await promise;
    } catch (e) {
      console.log();
    }
  }
}
