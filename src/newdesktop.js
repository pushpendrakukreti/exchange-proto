import {useEffect,useState } from 'react';
import DesktHeader from './components/header/desktheader'
import { DesktopTradeView } from './components/tradeview/deskttradeview'

const NewDesktop =(props)=>{
    const [sideBarToggleState, setSideBarToggleState] =useState(false);
    const toggleSideBar = () => {

    setSideBarToggleState(true);
    }
  return(
    <><DesktHeader toggleSettings={toggleSideBar} sidebarstate={sideBarToggleState} />
    <DesktopTradeView />
  </>)
}
export default NewDesktop;
