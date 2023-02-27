import BaseContainer from 'components/BaseContainer';
import React from 'react';
import CustomersTable from './CustomersTable';

const Customers = () => {
  return (
    <BaseContainer
      title="Customers"
      subtitle="See here all users of your platform"
    >
      <CustomersTable />
    </BaseContainer>
  );
};

export default Customers;
