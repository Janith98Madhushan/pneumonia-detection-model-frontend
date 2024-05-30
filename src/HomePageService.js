import axios, { AxiosRequestConfig } from "axios";
// import { saveAs } from 'file-saver'
// import { publicIpv4 } from 'public-ip'
// import store from '../../store'
// import { setTokens } from '../../store/user/actions'
//import { errorHandling } from '../../utils/ResponseHandler'

const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

let ip;

class HomePageService {
  /**
   * Api get function.
   * @param {string} path path.
   */

  async apiGet(path) {
    const config = {
      headers: {
        "x-real-ip": `${ip}`,
      },
    };
    const response = await axiosInstance.get(process.env.baseUrl + path, {
      ...config,
    });

    return response;
  }

  async apiGet1(path) {
    const response = await axiosInstance.get(process.env.baseUrl + path);

    return response;
  }

  /**
   * Api post function.
   * @param {Object} body body.
   * @param {string} path path.
   */
  async apiPost(path, body) {
    // const ip = await publicIpv4()
    const config = {
      headers: {
        "x-real-ip": `${ip}`,
      },
    };

    const json = JSON.stringify(body);
    const response = await axiosInstance.post(
      process.env.baseUrl + path,
      json,
      { ...config }
    );
    return response;
  }
  async apiPostLogin(path, body) {
    // const ip = await publicIpv4()

    const config = {
      headers: {
        "x-real-ip": `${ip}`,
        // 'x-real-ip': `124.43.16.185`,
      },
    };
    const json = JSON.stringify(body);
    const response = await axiosInstance.post(
      process.env.baseUrl + path,
      json,
      { ...config }
    );

    return response;
  }

  async apiPostDel(path, body) {
    // const ip = await publicIpv4()
    const config = {
      headers: {
        "x-real-ip": `${ip}`,
      },
    };
    // const json = JSON.stringify(body)

    const response = await axios.delete(path, { ...config });
    return response;
  }

  /**
   * Api put function.
   * @param {Object} body body.
   * @param {string} path path.
   * @param {number} id id.
   */
  async apiPut(path, id, body) {
    // const ip = await publicIpv4()
    const config = {
      headers: {
        "x-real-ip": `${ip}`,
      },
    };
    const json = JSON.stringify(body);
    const response = await axiosInstance.put(
      `${process.env.baseUrl}${path}/${id}`,
      json,
      { ...config }
    );

    return response;
  }

  async apiPutPathParam(path, body) {
    const json = JSON.stringify(body);
    const response = await axiosInstance.put(process.env.baseUrl + path, json);

    return response;
  }

  /**
   * Api delete function.
   * @param {string} path path.
   * @param {number} id id.
   */
  async apiDelete(path, id) {
    // const ip = await publicIpv4()

    const config = {
      headers: {
        "x-real-ip": `${ip}`,
      },
    };

    const url = id
      ? `${process.env.baseUrl}${path}/${id}`
      : process.env.baseUrl + path;

    const response = await axiosInstance.delete(url, { ...config });

    return response;
  }

  /**
   * Api post function.
   * @param {string} path path.
   * @param {number} id id.
   */
  async apiPostFormData(path, body) {
    // const ip = await publicIpv4()
    const config = {
      headers: {
        "x-real-ip": `${ip}`,
        "Content-type": "multipart/form-data",
      },
    };
    const response = await axiosInstance.post(
      process.env.baseUrl + path,
      body,
      { ...config }
    );
    // .then(responseHandling)
    // .catch(errorHandling)

    return response;
  }

  /**
   * Api EOD post function.
   * @param {Object} body body.
   * @param {string} path path.
   */
  async apiEODPost(path, body) {
    // const ip = await publicIpv4()
    const config = {
      headers: {
        "x-real-ip": `${ip}`,
      },
    };
    const json = JSON.stringify(body);
    const response = await axiosInstance.post(
      process.env.eodEnginBaseUrl + path,
      json,
      { ...config }
    );

    return response;
  }
}

export default new HomePageService();
