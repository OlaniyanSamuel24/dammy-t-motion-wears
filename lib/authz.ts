import {getServerSession} from 'next-auth';
import {authOptions} from '../auth';
import {Role} from '@prisma/client/index';

export async function requireAuth(){const session=await getServerSession(authOptions);const user=session?.user as ({id?:string;email?:string;role?:Role}|undefined);if(!user?.id)throw new Error('UNAUTHENTICATED');return user as {id:string;email?:string;role?:Role}}
export async function requireRole(...roles:Role[]){const user=await requireAuth();if(!user.role||!roles.includes(user.role))throw new Error('FORBIDDEN');return user}
export const requireAdmin=()=>requireRole(Role.ADMIN);
export const requireSeller=()=>requireRole(Role.SELLER,Role.ADMIN);
export function authError(error:unknown){if(error instanceof Error&&error.message==='UNAUTHENTICATED')return {error:'Authentication required',status:401};if(error instanceof Error&&error.message==='FORBIDDEN')return {error:'You do not have permission to perform this action',status:403};return {error:'Request failed',status:400}}
