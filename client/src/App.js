import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { Top } from './Top';
import { MarketDetail } from './discount/pages/MarketDetail';
import { MarketEdit } from './discount/pages/MarketEdit';
import Search from './discount/pages/Search';

import "./App.css"


export const App = () => {  
  return(
    <div>
      <Header />
      <Routes>
          <Route path="/" element={<Top />} />
          <Route path='/search/:query' element={<Search />} />
          <Route path='/supermarket/:id/foods' element={<MarketDetail />} />
          <Route path='/supermarket/:id/edit' element={<MarketEdit />} />
          <Route render={() => <h4>not found...</h4>} />
      </Routes>
    </div>
  )  
}