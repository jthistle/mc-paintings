import React from 'react';
import Layout, { Column } from '../../components/Layout';
import { c_PRIMARY } from '../../theme';
import UploadInput from '../../components/UploadInput';

const Home = () => {
  return (
    <Layout>
      <Column>
        <h1>Some testing text goes right here, but it's a bit big</h1>
        <UploadInput />
      </Column>
      <Column>
        <h1>
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
          dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
        </h1>
      </Column>
    </Layout>
  );
};

export default Home;
