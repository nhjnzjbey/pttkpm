export class LoginConstant {
    public static API_ENDPOINT = 'http://localhost:8500/';
    public static API_ENDPOINT_AUTH = LoginConstant.API_ENDPOINT + 'oauth/authorize';
    public static REDIRECT_ENDPOINT = 'http://localhost:4200/';
    public static PROVIDER_ID = 'Local Friend';
    public static CLIENT_ID = 'OaBeDxtbV5u6o70JZYY5U3AvLw5dBQ495sKiRXkKy1d5dTFn9OhZlKSP9NuNBIzk';
    public static DEFAULT_LIFE_TIME = 3600;
    public static SCOPES = ['read'];
    public static TYPE = 'token';

}

