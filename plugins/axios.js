let tokenExcludedEndpoints = [
  "/auth/login",
  "/auth/register"
]

export default function ({ $axios, error: nuxtError }) {
  $axios.onRequest(config => {
    console.log(config)
    if(!tokenExcludedEndpoints.includes(config.url)) {
    }
    return config;
  })
  $axios.onError(error => {
    // console.log(error);
    // console.log(error.response);
    if(error.status === 401) {
      // console.log(error.data);
      if(error.data.error === "Authorization token expired.") {
        console.log("need to refresh token")
        $auth.refreshTokens()
      }
    }
    return error.response;
  })
}