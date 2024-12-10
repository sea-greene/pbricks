
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import Task  from '../Task'
import React from 'react';

test("Task renders", () => {
    const { getByText } = render(<Task 
        id='testID' 
              completed={false}
              markCompleted={() => {}}
              updateTask={() => {}} 
              title={''} 
              content={''} 
              deleteTask={() => {}}/>);
    expect(getByText(/Edit/i)).toBeInTheDocument();
});

test("Error message shows when title is not entered", () => {
    const { getByText } = render(<Task 
        id='testID' 
              completed={false}
              markCompleted={() => {}}
              updateTask={() => {}} 
              title={''} 
              content={''} 
              deleteTask={() => {}}/>);
    const input = screen.getByLabelText('Enter a title')
    fireEvent.change(input, {target: {value: ''}})
    fireEvent.blur(input)
    expect(getByText('* Enter a title')).toBeInTheDocument();
});

test("Error message shows when content is not entered", () => {
    const { getByText } = render(<Task 
        id='testID' 
              completed={false}
              markCompleted={() => {}}
              updateTask={() => {}} 
              title={''} 
              content={''} 
              deleteTask={() => {}}/>);
    const input = screen.getByLabelText('Enter content')
    fireEvent.change(input, {target: {value: ''}})
    fireEvent.blur(input)
    expect(getByText('* Enter a description')).toBeInTheDocument();
});
