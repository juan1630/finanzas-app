export function fetchEgresos(url = "", payload) {

    if (url.length > 10) {
      return fetch(url, {
        body: JSON.stringify(payload),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((resp) => {
          if(resp.ok){
              return resp.data
          }else {
              return []
          }
        });
    }
  }
  