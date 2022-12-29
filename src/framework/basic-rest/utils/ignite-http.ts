import axios from "axios";

// import { getToken } from "./get-token";


let baseURL:any, token:any;


 if (process && process.env.NEXT_PUBLIC_APP_ENV === 'local') {
  baseURL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_BASE_URL;
  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA5MmE2ZmYxNWNjNWQ3MTBiNWU5MGE4YmNhY2YzZTI5NTE5ODdiNDM1Y2Q0ZTU5ZGI0OWNhNWQ0ODMzMjA0N2UzZmQ5ZmNmOWFhNDhiNDhmIn0.eyJhdWQiOiIzMiIsImp0aSI6IjA5MmE2ZmYxNWNjNWQ3MTBiNWU5MGE4YmNhY2YzZTI5NTE5ODdiNDM1Y2Q0ZTU5ZGI0OWNhNWQ0ODMzMjA0N2UzZmQ5ZmNmOWFhNDhiNDhmIiwiaWF0IjoxNjYyMDM5Njk0LCJuYmYiOjE2NjIwMzk2OTQsImV4cCI6MTY5MzU3NTY5NCwic3ViIjoiNjA5Iiwic2NvcGVzIjpbXX0.YEGU7LYddcuHnTUaLXQBczzbrejkAb3DnjnzYfrsKO2Z9ybehpKGLbuUIthW5x55ukJ1UWYeQLLmTdngUazBur5jkEVO4rop8J0rS_FRawc5KVRiZ5fmEb-wJj4aap2dwhko00Jq9egyBkFqQkkiMnDSfZp2LO3CdSkHIJ481NN-hAh9b0m7EwW1INKcW0voD98h324O86fQYdwd3JOD7A3PjdVdLdhByZFaRHbQozU2_VwCq6kWjE1w1X0zPGO-UpNX7sryiXwAxtYBitYx0V8Q6YBNU5umHHH9O7xJJmV_Ip6opHqnF1J7FEZD5GHmVeJdzlaTn9NcSrF1_luEDThYZf_hYPKYXeixnP3sjUHTeppDlN8G9dsB0hKUXLC4u3vJeUEkyPBy7pxyx5DHDmcV4GBnJTyiR4j9aYzFsACOHUZ8IvrIu-xg-N_7flTqCH4fFMQlkznwYed0FtWWthVf9d9MmxuMtH3wbVUtGCbaZd5Zdu44L99bOQJL-yuuGPiB2JmY3EWqbYb99i9lE-hJou83tW9nONupkt6YnOVgUy3Qwk-JZhNis1TTcwxTdLht-vMGHnDs-mJLTnEcRDYplTcLMnKwqtVJuH4RNaVlY_BQ9Qn1eJVWE44efSTy6DkvV6Ey8pyzw2kHN2ccB6wIzr78d3Wedwu9LZBvy58";
}
else if (process && process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  baseURL = process.env.NEXT_PUBLIC_IGNITE_BACKEND_BASE_URL;
 
  // hard coded token of sf-dev.myignite.online
 token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxNGVkMmQwZmZiY2U5YzQ2NGQzYmQyYzMxZWIwNGQ1OGMzZDBlOTBlZDE3MTA1MDNiZDhjNjExOWE0YzE0Y2EzNTBmMTdhODY1ZWE2YzBjIn0.eyJhdWQiOiIzMiIsImp0aSI6IjcxNGVkMmQwZmZiY2U5YzQ2NGQzYmQyYzMxZWIwNGQ1OGMzZDBlOTBlZDE3MTA1MDNiZDhjNjExOWE0YzE0Y2EzNTBmMTdhODY1ZWE2YzBjIiwiaWF0IjoxNjY4NTg1MDU4LCJuYmYiOjE2Njg1ODUwNTgsImV4cCI6MTcwMDEyMTA1OCwic3ViIjoiODc1Iiwic2NvcGVzIjpbXX0.ZvK1RxFj6d88z5BIzNgv8yD-oD0agNSORK0pWKx6RpbRiwPUuDKt77tJwxNl6W3szMfvr7m8N3UNqBvjASplPkWvk2YIFTGmHjMl4UxlbqSa-vyqTdtvWUOOBUnPdA27x6B0dkDTe8IK_RFvFSrb9mk_vdmFRQo075mBUbPmt-hBNSCsISRAGYnMm5WRRJ16ec02gFUjnqH61HnnbN3XUEZ7_o1tK4K7Dfj6krrZL6u_4AcJzWUEafQSLZV4enTb35NM1n9nwGjGS_gQYUPPM8mj6de5BD2zDbl5SrruG6Wr2O_gaW4mHSYI7Dr9HPCkUIVh27bjUQmfG84dFyaPqouuk49Hb3jToSi-OjidU2iBjCE9XXdoqZ0CXFGVDdleNB-l0Yd7EeMFjf1iB_tuVzSYITldfA81W5iAXqOzM3QBh3BEa2TMC3z5WGFIhRJy5G_EFcTCxj2u4Q-cV5aT2JUJRy7KTs-2Byaifun3FtzsLe2YX7sNxXxf_inOlXxMnswCh5atHqpsNBbwqzG6snW5JyKr96QeYB5p2Vcfi0fLJgJV94clN0skadnTeY0du3lnyRjVLNp-uckoEBJJIuMv0gLApyo880fzT4i7xFBSk-sFd6MWYMBvxYYHUJPebJyikxqE26lnYD64l3l_cwwt3T3wYVvRIFoG7U9W58c";


} 

const http = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
   //  const token = getToken();

   
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
