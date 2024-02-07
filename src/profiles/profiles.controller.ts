import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { EnvironmentsService } from 'src/enviroments/environments.service';
import { TOTPGenerator } from 'src/utils/totp-generator.utils';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly environmentsService: EnvironmentsService,
  ) {}

  @ApiOperation({
    summary: 'Consultar o perfil em todos os ambientes.',
    description:
      'Este endpoint permite consultar o perfil em todos os ambientes e informa se o perfil está cadastrado ou não. Caso esteja cadastrado, também informa se está ativo ou não.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista o perfil em todos os ambientes do OCC.',
  })
  @Get('/findAll')
  async findAll(@Query('email') email: string) {
    try {
      const profileArray = [];
      const enviroments = await this.environmentsService.findAll();

      for (let i = 0; i < enviroments.length; i++) {
        if (enviroments[i].active === true) {
          const { items } = await this.profilesService.findOne(
            email,
            enviroments[i].url,
            enviroments[i].appKey,
          );

          if (items.length > 0) {
            const firstName = items[0].firstName;
            const lastName = items[0].lastName;
            const active = items[0].active;
            const userExist = true;

            const profileObject = {
              Cliente: enviroments[i].customer,
              Ambiente: enviroments[i].environment,
              Nome: `${firstName} ${lastName}`,
              Email: email,
              Ativo: active,
              Cadastrado: userExist,
            };

            profileArray.push(profileObject);
          } else {
            const userExist = false;

            const profileObject = {
              Cliente: enviroments[i].customer,
              Ambiente: enviroments[i].environment,
              Email: email,
              Cadastrado: userExist,
            };

            profileArray.push(profileObject);
          }
        }
      }

      return profileArray;
    } catch (error) {
      throw new HttpException(
        {
          message: `${error.message} - ${error.config.url}`,
          status: error.response.status,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: 'Verificar e atualizar o acesso do perfil em todos os ambientes.',
    description:
      'Este endpoint verifica se o perfil existe em todos os ambientes. Se o perfil existir, ele verifica se está ativo ou não. Se estiver ativo, desativa o acesso do perfil ao ambiente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Atualizar o perfil em todos os ambientes.',
  })
  @Put('/updateAll')
  async update(@Query('email') email: string) {
    try {
      const profileArray = [];
      const environments = await this.environmentsService.findAll();

      for (let i = 0; i < environments.length; i++) {
        const isPRD = environments[i].environment === 'prd';
        const adminActive = environments[i].active === true;

        if (!isPRD && adminActive) {
          const { items } = await this.profilesService.findOne(
            email,
            environments[i].url,
            environments[i].appKey,
          );
          if (items.length > 0) {
            const status = items[0].active;
            if (status === true) {
              const userId = items[0].id;
              const profileUpdate = await this.profilesService.update(
                environments[i].url,
                environments[i].email,
                environments[i].password,
                userId,
                environments[i].totp_code,
              );
              const firstName = profileUpdate.firstName;
              const lastName = profileUpdate.lastName;
              const active = profileUpdate.active;
              const userExist = true;
              const profileObject = {
                Cliente: environments[i].customer,
                Ambiente: environments[i].environment,
                Nome: `${firstName} ${lastName}`,
                Email: email,
                Ativo: active,
                Cadastrado: userExist,
              };
              profileArray.push(profileObject);
            }
          }
        } else if (isPRD && adminActive) {
          const totpCode = await TOTPGenerator(environments[i].adminKey);
          const { items } = await this.profilesService.findOne(
            email,
            environments[i].url,
            environments[i].appKey,
          );
          if (items.length > 0) {
            const status = items[0].active;
            if (status === true && environments[i].customer) {
              const userId = items[0].id;
              const profileUpdate = await this.profilesService.update(
                environments[i].url,
                environments[i].email,
                environments[i].password,
                userId,
                totpCode,
              );
              const firstName = profileUpdate.firstName;
              const lastName = profileUpdate.lastName;
              const active = profileUpdate.active;
              const userExist = true;
              const profileObject = {
                Cliente: environments[i].customer,
                Ambiente: environments[i].environment,
                Nome: `${firstName} ${lastName}`,
                Email: email,
                Ativo: active,
                Cadastrado: userExist,
              };
              profileArray.push(profileObject);
            }
          }
        }
      }

      return profileArray;
    } catch (error) {
      throw new HttpException(
        {
          message: `${error.message} - ${error.config.url}`,
          status: error.response.status,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
