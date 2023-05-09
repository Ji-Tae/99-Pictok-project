import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const getPictures = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

const signupPost = async ({username, password, confirmPassword}) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {username, password, confirmPassword});
};

const loginPost = async ({username, password}) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {username, password});
};

export const useGetPicturesQuery = () => {
  return useQuery('pictures', getPictures);
};

export const useSignupPostMutation = () => {
  return useMutation(signupPost);
};

export const useLoginPostMutation = () => {
  return useMutation(loginPost);
};