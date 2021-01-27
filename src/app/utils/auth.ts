import { AuthService } from '@services/auth/auth.service';

export function checkUserLogged(authService: AuthService): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise<void>((resolve) => {
      authService.checkUserLogged();
      resolve();
    });
  };
}
