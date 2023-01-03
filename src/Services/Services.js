const base_url = "https://pos-dev.myignite.online/connector/api";

export function UpdateUser(endPoint, values, id) {
  let token = localStorage.getItem("user_token");

  return new Promise((resolve, reject) => {
    fetch(base_url + endPoint + "/" + id, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        /* Accept: "application/json", */
      },
    })
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}
