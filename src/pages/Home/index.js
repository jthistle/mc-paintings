import React from 'react';
import Layout from '../../components/Layout';
import { c_PRIMARY } from '../../theme';
import UploadInput from '../../components/UploadInput';

const Home = () => {
  return (
    <Layout columns={2}>
      <UploadInput />
    </Layout>
  );
};

export default Home;
