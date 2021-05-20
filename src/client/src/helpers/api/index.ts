import { getReasonPhrase } from 'http-status-codes';

class APIError extends Error {
  status = 0;
  desc = '';
  details:Record<string, unknown> = {};
}

declare global {
  interface Window {
    env:Record<string,unknown>;
  }
}

class API {
  static async get(route:string): Promise<any|APIError> {
    return new Promise((resolve, reject) => {
      fetch(`${window.env.API_ENDPOINT}${route}`, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }).then(rawResponse => {
        const { status } = rawResponse;
        const contentType = rawResponse.headers.get('Content-Type') || '';
    
        if (status >= 400) {
          if (contentType.startsWith('application/json')) {
            rawResponse.json().then(json => {
              const error = new APIError();
    
              const { message, details } = json;
      
              error.status = status;
              error.desc = message || getReasonPhrase(status);
              error.details = details;
              reject(error);
            });
          } else {
            const desc = getReasonPhrase(status);
            const error = new APIError();
        
            error.status = status;
            error.desc = desc;
        
            reject(error);
          }
        } else if (status >= 200) {
          if (contentType.startsWith('application/json')) {
            rawResponse.json().then(resolve);
          }
        } else {
          // The rawResponse can be treated locally
          // Includes gateway and informational responses (100–199)
          resolve(rawResponse);
        }
      })
      .catch(error => {
        error.desc = error.desc || "Le service est temporairement indisponible";
        reject(error)
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async post(route:string, body:Record<string, unknown>): Promise<any|APIError> {
    return new Promise((resolve, reject) => {
      fetch(`${window.env.API_ENDPOINT}${route}`, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body) // body data type must match "Content-Type" header
      }).then(rawResponse => {
        const { status } = rawResponse;
        const contentType = rawResponse.headers.get('Content-Type') || '';
    
        if (status >= 400) {
          if (contentType.startsWith('application/json')) {
            rawResponse.json().then(json => {
              const error = new APIError();
    
              const { message, details } = json;
      
              error.status = status;
              error.desc = message || getReasonPhrase(status);
              error.details = details;
              reject(error);
            });
          } else {
            const desc = getReasonPhrase(status);
            const error = new APIError();
        
            error.status = status;
            error.desc = desc;
        
            reject(error);
          }
        } else if (status >= 200) {
          if (contentType.startsWith('application/json')) {
            rawResponse.json().then(resolve);
          }
        } else {
          // The rawResponse can be treated locally
          // Includes gateway and informational responses (100–199)
          resolve(rawResponse);
        }
      })
      .catch(error => {
        error.desc = error.desc || "Le service est temporairement indisponible";
        reject(error)
      });
    });
  }
}

export default API;
