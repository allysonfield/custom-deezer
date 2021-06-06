import '@testing-library/jest-native/extend-expect';
import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '~/pages/HomeScreen';
// import TechList from '../../TechList';

describe('Home Screen', () => {
  it('Should be able to render Home', async () => {
    const tree = render(<HomeScreen />);
    const { findByText } = tree;
    const title = findByText('Músicas');
    await waitFor(() => {
      expect(title).toBeTruthy();
    });
    // fireEvent.changeText(
    //   tree.getByTestId('email'),
    //   'calebeoliverxico@gmail.com'
    // );
    // fireEvent.changeText(tree.getByTestId('password'), 'xico');
    // fireEvent.press(tree.getByText('Entrar'));
    // await waitFor(() => {
    //   expect(mockedHistoryPush).toHaveBeenCalledWith('HomeTabs');
    // });
    // const treeJson = tree.toJSON();
    // expect(treeJson).toMatchSnapshot();
    // treeJson.props.logPost();
  });
});
