import React from 'react';
import { Button } from '../components/ui/button';

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-4">
      <div className="order-2 md:order-1 w-full md:w-2/3 bg-gray-100 p-4 rounded-lg flex flex-col h-full">
        <div className='h-2/3 '><Button onClick={() => alert("hello")}>Click me</Button></div>
        <div className='h-1/3 '></div>
      </div>

      <div className="order-1 md:order-2 w-full md:w-1/3 bg-gray-200 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Sidebar Content</h2>
        <p>Some content for the sidebar.</p>
      </div>
    </div>
  );
};

export default HomePage;
