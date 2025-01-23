export class TokenMixin {
    static async safeToken(data) {
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("refreshToken", data.refresh_token);
    }

    static async clearToken() {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
    }

    static async tokenData() {
        return [sessionStorage.getItem("accessToken"), sessionStorage.getItem("refreshToken")];
    }
}