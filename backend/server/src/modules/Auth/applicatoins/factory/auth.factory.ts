import AuthProvider from '../../domains/entities/AuthProvider';
import AuthRepository from '../../domains/repositories/abstraction';

import AppAuth from '../strategies/login/appAuth';
import GoogleAuth from '../strategies/login/googleAuth';
import GithubAuth from '../strategies/login/githubAuth';

export default class AuthLoginFactory {
  static create(provider: AuthProvider, repo: AuthRepository) {
    switch (provider) {
      case AuthProvider.APP:
        return new AppAuth(repo);
      case AuthProvider.GOOGLE:
        return new GoogleAuth(repo);
      case AuthProvider.GITHUB:
        return new GithubAuth(repo);
      default:
        throw new Error('Provider não suportado');
    }
  }
}
