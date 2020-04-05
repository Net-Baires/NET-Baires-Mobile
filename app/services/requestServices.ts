import Config, { getGlobalToken } from "./config";
import { manageServicesError } from "./errorsServices";
interface File {}

export const getRequest = <TResponse>(
  url: string,
  defaultValue: TResponse | null = null
): Promise<TResponse> => doRequest("GET", url, {}, defaultValue);

export const putRequest = <TBody, TResponse>(
  url: string,
  body: TBody = {} as TBody,
  defaultValue: TResponse | null = null
): Promise<any> => doRequest("PUT", url, body, defaultValue);

export const postRequest = <TBody, TResponse>(
  url: string,
  body: TBody = {} as TBody,
  defaultValue: TResponse | null = null
): Promise<any> => doRequest("POST", url, body, defaultValue);

export const deleteRequest = <TBody, TResponse>(
  url: string,
  body: TBody = {} as TBody,
  defaultValue: TResponse | null = null
): Promise<any> => doRequest("DELETE", url, body, defaultValue);

const doRequest = <TBody, TResponse>(
  method: string,
  url: string,
  body: TBody = {} as TBody,
  defaultValue: TResponse | null = null
): Promise<TResponse> => {
  return fetch(
    `${Config.api.url}/${url}`,
    generateOptions<TBody>(method, body)
  ).then(response => {
    if (response.status === 204) return defaultValue;
    // if (response.status.toString() == "404")
    //   window.history.pushState({}, null as any, "/NotFound");
    if (response.status.toString().indexOf("40") >= 0)
      return Promise.reject(response.status);
    return response.json();
  })
  .catch(x=> {
    manageServicesError(x);
  });
};
export const generateOptions = <TBody>(
  method: string,
  body: TBody
): RequestInit => {
  let options: RequestInit = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getGlobalToken()}`
    }
  };
  if (method != "GET") {
    options.body = JSON.stringify(body);
  }
  return options;
};

export const postWithFileRequest = <TBody>(
  url: string,
  file: File,
  body: TBody
) => WithFileRequest("POST", url, file, body);

export const putWithFileRequest = <TBody>(
  url: string,
  file: File,
  body: TBody
) => WithFileRequest("PUT", url, file, body);

const WithFileRequest = <TBody>(
  action: string,
  url: string,
  file: any,
  body: TBody
) => {
  var formData: any = new FormData();
  var value: any = file.uri;
  formData.append("ImageFile", {
    uri: value,
    type: "image/jpeg", // or photo.type
    name: "testPhotoName"
  });
  Object.keys(body).forEach((key: string) =>
    formData.append(key, (body as any)[key])
  );
  const options: RequestInit = {
    method: action,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getGlobalToken()}`
    },
    body: formData
  };
  return fetch(`${Config.api.url}/${url}`, options).then((x: any) => {
    var contentType = x.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return x.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
};
