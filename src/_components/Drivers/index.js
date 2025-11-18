import { useEffect, useState } from 'react';
import Ethernet from './Ethernet';
import Serial from './RS232';

export default function Drivers() {
  return (
    <>   
      <Serial />
      <Ethernet />
    </>
  );
}
