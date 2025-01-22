export class TokenMixin {
    static async safeToken(data) {
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("refreshToken", data.refresh_token);
    }
}