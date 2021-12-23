import type { IAuthorizationRole } from '../authorization-roles/authorization-roles-interfaces.d.ts';
import { AuthorizationTokenController } from '../authorization-tokens/authorization-tokens-controller.ts';
import { Config } from '../../../config.ts';


export interface IUserAuthorizationInfo {
  permissions: string[];
  roles: IAuthorizationRole[];
}

export async function getAuthorizationInfoForUser(userId: string): Promise<IUserAuthorizationInfo> {
  if (!userId) return { permissions: [], roles: [] };

  const authorizationToken = await AuthorizationTokenController.findBy({
    filters: {
      user: userId
    },
    populates: {
      'roles': ''
    }
  });

  if (!authorizationToken) {
    if (!Config.authorization.defaultPermissions || Config.authorization.defaultPermissions.length === 0) {
      return { permissions: [], roles: [] };
    }

    await AuthorizationTokenController.create({
      document: {
        user: userId,
        permissions: Config.authorization.defaultPermissions,
        roles: []
      }
    });

    return {
      permissions: Config.authorization.defaultPermissions,
      roles: []
    };

  }

  const permissions: string[] = [
    ...authorizationToken.permissions,
    ...(
      ((authorizationToken.roles || []) as unknown as IAuthorizationRole[]).flatMap(it =>
        it.permissions
      )
    )
  ];

  return {
    permissions,
    roles: authorizationToken.roles as unknown as IAuthorizationRole[]
  };

}


export function matchPermission(permit: string, permission: string): boolean {

  const permitParts = permit.split('.');
  const permissionParts = permission.split('.');
  const minLength = Math.min(permitParts.length, permissionParts.length);

  for (let index = 0; index < minLength; index++) {

    const permission = permissionParts[index];
    const permit = permitParts[index];

    if (permit.includes('**')) {
      return permission.startsWith( permit.slice(0, permit.indexOf('**')) );
    }
    else if (permit.includes('*')) {

      const testReg = new RegExp(`^${permit.replaceAll('*', '.+')}$`);

      if (!testReg.test(permission)) {
        return false;
      }

    }
    else if (permit !== permission) {
      return false;
    }

  }

  return permitParts.length === permissionParts.length;

}
