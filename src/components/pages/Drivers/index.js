import Ethernet from './Ethernet';
import Serial from './Serial';

export default function Drivers() {
  return (
    <>
      <Serial />
      <Ethernet />
    </>
  );
}
