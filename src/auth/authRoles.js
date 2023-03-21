export const authRoles = {
  su: ['SU'], // Only Super Admin has access
  admin: ['SU', 'ADMIN'], // Only SU & Admin has access
  editor: ['SU', 'ADMIN', 'EDITOR'], // Only SU & Admin & Editor has access
  guest: ['SU', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
};
