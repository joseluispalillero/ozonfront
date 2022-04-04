import axios from "axios";

const setupInterceptors = (history) => {
  axios.interceptors.request.use((request) => {
    document.getElementById("spinner").style.visibility = "visible";
    return request;
  });

  axios.interceptors.response.use(
      (response) => {
        document.getElementById("spinner").style.visibility = "hidden";
        return response;
      },
      (error) => {
        document.getElementById("spinner").style.visibility = "hidden";
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            console.log("error", error);
          }

          if (error.response.status === 404) {
            history.push("/not-found");
          }
        }
        return Promise.reject(error);
      }
  );
}

export default setupInterceptors
