export function hasRole(user: { role_id: string }, roleEnv: string) {
  const roleId = process.env[roleEnv];
  return user.role_id === roleId;
}

export function hasSomeRole(user: { role_id: string }, roleEnvs: string[]) {
  return roleEnvs.some(env => hasRole(user, env));
}

export function isSelfOrHasSomeRole(user: { id: string, role_id: string }, targetId: string, roleEnvs: string[]) {
  return user.id === targetId || hasSomeRole(user, roleEnvs);
} 