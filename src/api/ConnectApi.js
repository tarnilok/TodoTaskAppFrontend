import { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";

export const ConnectApi = (url, changeHandler) => {
  const [dataState, setDataState] = useState({ data: [] });
  const { setLoading } = useContext(AuthContext);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get(url);
        setDataState({ ...dataState, data: response.data });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchDataFromApi();
  }, [changeHandler]);
  return [dataState];
};

export const RegisterApi = async (url, data) => {
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: {
        username: data.userName,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        password2: data.password2,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const LoginApi = async (url, data) => {
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const LogoutApi = async (url) => {
  try {
    const response = await axios.post(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const CrudApi = async (url, data, key, method) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: { Authorization: `Token ${key}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
