import React from "react";
import "../../../assets/styles/main.css";
import "./styles.css";

const instrumentData = [
  { name: "DC Power Supply", port: "TCPIP0::A-N6974A-00127.local::inst0::INSTR" },
  { name: "AC Power Supply", port: "TCPIPO::192.168.1.2::inst0::INSTR" },
  { name: "Digital Multimeter", port: "TCPIPO::A-34461A-00000.local::inst0::INSTR" },
  { name: "Digital Oscilloscope", port: "TCPIPO::192.168.1.4::inst0::INSTR" },
  { name: "Radio Commuication Tester", port: "TCPIPO::192.168.1.5::inst0::INSTR" },
  { name: "Power Sensor COM3", port: "COM4" },
  { name: "DAQ Card", port: "DAQ" },
  { name: "Matrix Card", port: "PXI4::14::INSTR" },
  { name: "Battery Simulator", port: "TCPIP0::192.168.1.5::5025::SOCKET" },
  { name: "I2C Adapter", port: "COM8" },
  { name: "RS232 Port", port: "COM1" },
  { name: "Cyclone Programmer", port: "COM6" },
];

const portOptions = [
  "TCPIP0::A-N6974A-00127.local::inst0::INSTR",
  "TCPIPO::192.168.1.2::inst0::INSTR",
  "TCPIPO::A-34461A-00000.local::inst0::INSTR",
  "TCPIPO::192.168.1.4::inst0::INSTR",
  "COM1",
  "COM2",
  "COM3",
  "COM4",
  "COM5",
  "COM6",
  "COM7",
  "COM8",
  "DAQ",
  "PXI4::14::INSTR",
  "TCPIP0::192.168.1.5::5025::SOCKET",
];

function Instrument() {
  return (
    <div className="page-bg">
      <main className="page-wrap">
        <h2 className="page-title">Instrument Settings</h2>
        <div className="table-container">
          <table className="page-table">
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
                  <td>
                    <select className="select select-instrument" defaultValue={item.port}>
                      {portOptions.map((port, portIndex) => (
                        <option key={portIndex} value={port}>
                          {port}
                        </option>
                      ))}
                    </select>
                  </td>
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