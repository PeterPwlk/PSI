import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfig {
  constructor(private configService: ConfigService) {
    this.userPoolId = this.getSetting('COGNITO_USER_POOL_ID');
    this.clientId = this.getSetting('COGNITO_CLIENT_ID');
    this.clientSecret = this.getSetting('COGNITO_CLIENT_SECRET');
    this.region = this.getSetting('COGNITO_REGION');
    this.authority = `https://cognito-idp.${this.getSetting(
      'COGNITO_REGION',
    )}.amazonaws.com/${this.getSetting('COGNITO_USER_POOL_ID')}`;
    this.redirectUrl = this.getSetting('COGNITO_CODE_REDIRECT');
    this.tokenUrl = this.getSetting('COGNITO_TOKEN_URL');
    this.logoutRedirectUrl = this.getSetting('COGNITO_LOGOUT_REDIRECT');
  }

  private getSetting(settingName: string): string {
    return this.configService.get(settingName);
  }

  public userPoolId: string;
  public clientId: string;
  public clientSecret: string;
  public region: string;
  public authority;
  public redirectUrl;
  public tokenUrl;
  public logoutRedirectUrl;
}
