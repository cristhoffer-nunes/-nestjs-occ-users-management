import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { stringify } from 'qs';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getLoginToken(environment: string, appKey: string) {
    const response = await lastValueFrom(
      this.httpService.post(
        `${environment}/ccadmin/v1/login`,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${appKey}`,
          },
        },
      ),
    );

    if (response.status === 200) {
      return response.data.access_token;
    }
  }
  async getMfaLoginToken(
    environment: string,
    email: string,
    password: string,
    totp_code: string,
  ) {
    const data = stringify({
      grant_type: 'password',
      username: `${email}`,
      password: `${password}`,
      totp_code: `${totp_code}`,
    });

    const response = await lastValueFrom(
      this.httpService.post(`${environment}/ccadmin/v1/mfalogin`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );

    if (response.status === 200) {
      return response.data.access_token;
    }
  }

  findAll() {
    return `This action returns all profiles`;
  }

  async findOne(email: string, environment: string, appKey: string) {
    const response = await lastValueFrom(
      this.httpService.get(
        `${environment}/ccadmin/v1/adminProfiles?fields=id,firstName,lastName,email,active,roles&q=email eq "${email}"&queryFormat=SCIM`,
        {
          headers: {
            Authorization: `Bearer ${await this.getLoginToken(
              environment,
              appKey,
            )}`,
          },
        },
      ),
    );

    return response.data;
  }

  async update(
    environment: string,
    email: string,
    password: string,
    userId: string,
    totp_code: string,
  ) {
    const response = await lastValueFrom(
      this.httpService.put(
        `${environment}/ccadmin/v1/adminProfiles/${userId}?fields=id,firstName,lastName,email,active,roles&queryFormat=SCIM`,
        {
          active: false,
        },
        {
          headers: {
            Authorization: `Bearer ${await this.getMfaLoginToken(
              environment,
              email,
              password,
              totp_code,
            )}`,
          },
        },
      ),
    );

    return response.data;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
