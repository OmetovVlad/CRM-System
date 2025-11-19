// // Класс
// class TokenManager {
//   private accessToken: string | null = null;
//
//   setToken(accessToken: string | null): void {
//     this.accessToken = accessToken;
//   }
//
//   getToken(): string | null {
//     return this.accessToken;
//   }
//
//   clearToken(): void {
//     this.accessToken = null;
//   }
// }

// export const tokenManager = new TokenManager();

// Замыкание
function TokenManager() {

  let token: string | null = null;

  return {
    setToken: (accessToken: string | null) => {
      token = accessToken;
    },
    getToken: () => {
      return token
    },
    clearToken: () => {
      token = null;
    }
  }

}

export const tokenManager = TokenManager();