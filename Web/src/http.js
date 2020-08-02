/**
 * Custom HTTP Library for making HTTP requests
 *
 **/

export const myHTTP = (baseUrl = "http://localhost:8181/") => {
  const jointFetch = async (method, endPoint, data = null) => {
    const init = {
      method,
    };
    if (data) {
      init.body = JSON.stringify(data);
      init.headers = {
        "content-type": "application/json",
      };
    }
    const response = await fetch(`${baseUrl}${endPoint}`, init);
    if (!response.ok) {
      throw Error(`${response.status}: ${response.statusText}`);
    }
    if(method == 'DELETE') {
        return response;
    }
    const resData = await response.json();
    return resData;
  };

  // make GET, POST, PUT, DELETE requests
  return {
    get(endPoint) {
      return jointFetch("GET", endPoint);
    },
    post(endPoint, data) {
      return jointFetch("POST", endPoint, data);
    },
    put(endPoint, data) {
      return jointFetch("PUT", endPoint, data);
    },
    delete(endPoint) {
      return jointFetch("DELETE", endPoint);
    },
  };
};