import React from 'react';
import { ScrollView } from 'react-native';
import SelectedOrganizationsCard from '../../../components/Connections/SelectedOrganizationCard';

const SelectedOrganizationsScreen = () => {
  return (
    <ScrollView>
      <SelectedOrganizationsCard />
    </ScrollView>
  );
};

export default SelectedOrganizationsScreen;
