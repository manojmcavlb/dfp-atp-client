import React from "react";
import "./styles.css";

const instrumentData = [
  { name: "DC Power Supply", port: "TCPIP0::A-N6974A-00127.local::inst0::INSTR" },
  { name: "AC Power Supply", port: "TCPIPO::192.168.1.2::inst0::INSTR" },
  { name: "Digital Multimeter", port: "TCPIPO::A-34461A-00000.local::inst0::INSTR" },
  { name: "Digital Oscilloscope", port: "TCPIPO::192.168.1.4::inst0::INSTR" },
  { name: "DC Load 1", port: "COM3" },
  { name: "DC Load 2", port: "COM4" },
  { name: "DAQ Card", port: "DAQ" },
  { name: "Matrix Card", port: "PXI4::14::INSTR" },
  { name: "Battery Simulator", port: "TCPIP0::192.168.1.5::5025::SOCKET" },
  { name: "I2C Adapter", port: "COM8" },
  { name: "RS232 Port", port: "COM1" },
  { name: "Cyclone Programmer", port: "COM6" },
];

function Instrument() {
  return (
    <div className="page-bg">
      <main className="instrument-wrap">
        <h2 className="page-title">Instrument Settings</h2>
        <div className="table-container">
          <table className="instrument-table">
            <thead>
              <tr>
                <th>Instruments Name</th>
                <th>Instruments Port</th>
              </tr>
            </thead>
            <tbody>
              {instrumentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.port}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Instrument;
