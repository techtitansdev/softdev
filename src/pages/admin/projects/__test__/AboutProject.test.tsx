import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { NewEditor } from '~/components/editor/Editor';


describe('NewEditor', () => {
  test('renders editor component for about', async () => {
    const onChanges = jest.fn();
    render(<NewEditor onChanges={onChanges} />);
    
    // Wait for the component to finish rendering
    await waitFor(() => {

      const editorElement = document.getElementById('editor');
    });
  });
});
