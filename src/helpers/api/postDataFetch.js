export const postDataFetch = (url = "", data = {}) => {
  
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then( resp => resp.json())
    .then(data => data)
    .catch(error =>{
        console.log(error);
        return error
    })
};
