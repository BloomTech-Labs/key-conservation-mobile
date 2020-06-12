import 'react-native';
import React from 'react';
import CampaignNotications from '../components/Notifications/CampaignNotification.js';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const snap = renderer.create(<CampaignNotications />).toJSON();
  expect(snap).toMatchSnapshot();
});
