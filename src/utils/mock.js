// prettier-ignore
export const mockTestSuites = [
  // ---------------- IoT Gateway Test Cases (IDs 1–18) ----------------
  {
    uut: 'IoT Gateway',
    uutId: 'UUT-1',
    powerSpec: '115VAC 360–800Hz',
    testCases: [
      {
        testId: 1,
        title: 'Connector Orientation Test',
        requirement: 'ARINC 836A',
        steps: [
          {
            stepId: '1.1',
            action: 'Mount IoT Gateway on ATS fixture',
            command: 'ats.mount(uut)',
            expected: 'UUT mechanically secured',
            result: 'PASS',
          },
          {
            stepId: '1.2',
            action: 'Capture connector images from multiple angles',
            command: 'camera.capture(connector, multiAngle=true)',
            evidence: 'img/connector_all.png',
            result: 'PASS',
          },
          {
            stepId: '1.3',
            action:
              'Compare pin orientation and keying against ARINC drawings',
            command: 'vision.compare(arinc836a)',
            expected: 'Orientation, keying and alignment compliant',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 2,
        title: 'LED Designation Test',
        steps: [
          {
            stepId: '2.1',
            action: 'Inspect enclosure for LED labels',
            command: 'camera.capture(led_labels)',
            expected: 'All LEDs labeled',
            result: 'PASS',
          },
          {
            stepId: '2.2',
            action: 'Verify label position, font size and legibility',
            command: 'vision.verifyText()',
            expected: 'Readable at normal viewing distance',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 3,
        title: 'Power & Consumption Test',
        limits: { powerW: 40, currentA: 1.5 },
        steps: [
          {
            stepId: '3.1',
            action: 'Configure ATS power supply',
            command: 'psu.set(115,400)',
            expected: '115VAC @ 360–800Hz',
            result: 'PASS',
          },
          {
            stepId: '3.2',
            action: 'Power ON IoT Gateway',
            command: 'uut.powerOn()',
            expected: 'Boot initiated',
            result: 'PASS',
          },
          {
            stepId: '3.3',
            action: 'Measure steady-state current',
            command: 'meter.current()',
            value: '1.34A',
            result: 'PASS',
          },
          {
            stepId: '3.4',
            action: 'Measure steady-state power',
            command: 'meter.power()',
            value: '37.2W',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 4,
        title: 'USB Host Mode Test',
        steps: [
          {
            stepId: '4.1',
            action: 'Insert FAT32 USB flash drive',
            command: 'usb.insert()',
            expected: '/dev/sda detected',
            result: 'PASS',
          },
          {
            stepId: '4.2',
            action: 'Verify enumeration as mass storage',
            command: 'usb.enumerate()',
            expected: 'MSC class',
            result: 'PASS',
          },
          {
            stepId: '4.3',
            action: 'Perform file write operation',
            command: 'fs.write(/mnt/usb/test.txt)',
            result: 'PASS',
          },
          {
            stepId: '4.4',
            action: 'Perform file read and checksum verify',
            command: 'fs.readVerify(/mnt/usb/test.txt)',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 5,
        title: 'USB Device Mode Test',
        steps: [
          {
            stepId: '5.1',
            action: 'Connect IoT Gateway to PC',
            command: 'usb.deviceMode()',
            expected: 'USB device enumerated',
            result: 'PASS',
          },
          {
            stepId: '5.2',
            action: 'Open serial console',
            command: 'serial.open()',
            expected: 'Console accessible',
            result: 'PASS',
          },
          {
            stepId: '5.3',
            action: 'Simulate boot failure',
            command: 'uut.simulateBootFail()',
            expected: 'Console remains active',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 6,
        title: 'USB Recovery Mode Test',
        steps: [
          {
            stepId: '6.1',
            action: 'Enter recovery mode',
            command: 'uut.enterRecovery()',
            expected: 'RCM detected',
            result: 'PASS',
          },
          {
            stepId: '6.2',
            action: 'Flash software using SDK Manager',
            command: 'sdk.flash(image)',
            result: 'PASS',
          },
          {
            stepId: '6.3',
            action: 'Exit recovery and verify normal boot',
            command: 'uut.reboot()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 7,
        title: 'Maintenance Ethernet Test',
        steps: [
          {
            stepId: '7.1',
            action: 'Connect Cat6 cable',
            command: 'eth.linkCheck()',
            expected: '1Gbps link',
            result: 'PASS',
          },
          {
            stepId: '7.2',
            action: 'Perform ping and data transfer',
            command: 'net.throughputTest()',
            result: 'PASS',
          },
          {
            stepId: '7.3',
            action: 'Negative test with Cat5 cable',
            command: 'eth.linkCheck(cat5)',
            expected: 'Link downgrade or failure',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 8,
        title: 'Software Load & Security',
        steps: [
          {
            stepId: '8.1',
            action: 'Load valid signed software',
            command: 'fw.load(valid)',
            result: 'PASS',
          },
          {
            stepId: '8.2',
            action: 'Attempt unsigned software load',
            command: 'fw.load(invalid)',
            expected: 'Rejected',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 9,
        title: '615A Device Software Reporting',
        steps: [
          {
            stepId: '9.1',
            action: 'Query reported software PN/version',
            command: 'sw.report()',
            expected: 'Matches loaded version',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 10,
        title: 'RTC Presence Test',
        limits: { drift: '≈1min' },
        steps: [
          {
            stepId: '10.1',
            action: 'Read RTC time',
            command: 'rtc.read()',
            result: 'PASS',
          },
          {
            stepId: '10.2',
            action: 'Power OFF for 60 seconds',
            command: 'uut.powerOff(60)',
            result: 'PASS',
          },
          {
            stepId: '10.3',
            action: 'Power ON and read RTC',
            command: 'rtc.read()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 11,
        title: 'RTC Backup Test',
        limits: { drift: '±2min/24h' },
        steps: [
          {
            stepId: '11.1',
            action: 'Power OFF for 24 hours',
            command: 'uut.powerOff(86400)',
            result: 'PASS',
          },
          {
            stepId: '11.2',
            action: 'Read RTC after restore',
            command: 'rtc.read()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 12,
        title: 'Unnecessary Discharge Test',
        steps: [
          {
            stepId: '12.1',
            action: 'Power OFF with jumper connected',
            command: 'rtc.verifyRetention()',
            result: 'PASS',
          },
          {
            stepId: '12.2',
            action: 'Power OFF without jumper',
            command: 'rtc.verifyNoRetention()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 13,
        title: 'LED Serviceability Test',
        steps: [
          {
            stepId: '13.1',
            action: 'Send LED blink command',
            command: 'led.blink(all)',
            expected: 'All LEDs visible',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 14,
        title: 'LED Color Test',
        steps: [
          {
            stepId: '14.1',
            action: 'Cycle LEDs through supported colors',
            command: 'led.cycleColors()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 15,
        title: 'Discrete Input Test',
        steps: [
          {
            stepId: '15.1',
            action: 'Apply discrete input levels sequentially',
            command: 'dio.applyInputs()',
            result: 'PASS',
          },
          {
            stepId: '15.2',
            action: 'Verify software state changes',
            command: 'dio.verifyState()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 16,
        title: 'Discrete Output Test',
        steps: [
          {
            stepId: '16.1',
            action: 'Command outputs HIGH/LOW',
            command: 'dio.setOutputs()',
            result: 'PASS',
          },
          {
            stepId: '16.2',
            action: 'Measure output voltages',
            command: 'meter.voltage()',
            result: 'PASS',
          },
        ],
      },
    ],
  },
];

export const mockIotGatewayTestSuites = [
  {
    title: '1. Input Power Test:',
    status: 'PASS',
    results: [
      {
        id: '1.1',
        name: 'Apply nominal input voltage (28VDC)',
        value: '2.9 V',
        result: 'PASS',
      },
      {
        id: '1.2',
        name: 'Measure current draw during boot-up',
        value: '1.2 A',
        result: 'PASS',
      },
      {
        id: '1.3',
        name: 'Verify total power consumption (≤ 42W expected)',
        value: '33 W',
        result: 'PASS',
      },
    ],
  },
  {
    title: '2. 0 to –10 VDC Output Test:',
    status: 'PASS',
    results: [
      {
        id: '2.1',
        name: 'Apply input reference signal',
        value: '-2.8 V',
        result: 'PASS',
      },
      {
        id: '2.2',
        name: 'Sweep input across range',
        value: '-7.5 V',
        result: 'PASS',
      },
    ],
  },
];

export const mockRemoteHeadTestSuites = [
  {
    uut: 'Remote Head',
    uutId: 'UUT-2',
    powerSpec: '28VDC',
    testCases: [
      {
        testId: 26,
        title: 'Connector Orientation Test',
        steps: [
          {
            stepId: '26.1',
            action: 'Capture connector images',
            command: 'camera.capture()',
            result: 'PASS',
          },
          {
            stepId: '26.2',
            action: 'Compare against ARINC drawings',
            command: 'vision.compare(arinc)',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 27,
        title: 'Input Power Test',
        limits: { powerW: 42, currentA: 1.5 },
        steps: [
          {
            stepId: '27.1',
            action: 'Apply 28VDC',
            command: 'psu.set(28)',
            result: 'PASS',
          },
          {
            stepId: '27.2',
            action: 'Measure current during boot and steady state',
            command: 'meter.current()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 28,
        title: 'Battery Type (RTC Through Power Loss)',
        steps: [
          {
            stepId: '28.1',
            action: 'Read RTC before power off',
            command: 'rtc.read()',
            result: 'PASS',
          },
          {
            stepId: '28.2',
            action: 'Power OFF for 1 minute',
            command: 'uut.powerOff(60)',
            result: 'PASS',
          },
          {
            stepId: '28.3',
            action: 'Read RTC after power restore',
            command: 'rtc.read()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 29,
        title: 'USB-C Port Test',
        steps: [
          {
            stepId: '29.1',
            action: 'Connect via USB-C',
            command: 'usb.connect()',
            result: 'PASS',
          },
          {
            stepId: '29.2',
            action: 'Flash test firmware',
            command: 'usb.flash()',
            result: 'PASS',
          },
          {
            stepId: '29.3',
            action: 'Execute troubleshooting commands',
            command: 'usb.console()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 30,
        title: 'Software Load Security Test',
        steps: [
          {
            stepId: '30.1',
            action: 'Install valid signed package',
            command: 'fw.load(valid)',
            result: 'PASS',
          },
          {
            stepId: '30.2',
            action: 'Attempt invalid package',
            command: 'fw.load(invalid)',
            expected: 'Rejected',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 31,
        title: 'Part / Serial Number Storage',
        steps: [
          {
            stepId: '31.1',
            action: 'Read identifiers',
            command: 'id.read()',
            result: 'PASS',
          },
          {
            stepId: '31.2',
            action: 'Reflash software',
            command: 'fw.reflash()',
            result: 'PASS',
          },
          {
            stepId: '31.3',
            action: 'Verify identifiers persistence',
            command: 'id.read()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 32,
        title: 'Discrete Pass-Through Inputs',
        steps: [
          {
            stepId: '32.1',
            action: 'Apply 28V/GND sequentially',
            command: 'dio.applyInputs()',
            result: 'PASS',
          },
          {
            stepId: '32.2',
            action: 'Verify output mapping',
            command: 'dio.verifyMapping()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 33,
        title: 'Discrete Pass-Through Outputs',
        steps: [
          {
            stepId: '33.1',
            action: 'Command outputs HIGH/LOW',
            command: 'dio.setOutputs()',
            result: 'PASS',
          },
          {
            stepId: '33.2',
            action: 'Measure output levels',
            command: 'meter.voltage()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 34,
        title: 'ID Strapping Test',
        steps: [
          {
            stepId: '34.1',
            action: 'Apply strap configurations',
            command: 'id.applyStraps()',
            result: 'PASS',
          },
          {
            stepId: '34.2',
            action: 'Verify interpreted ID',
            command: 'id.read()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 35,
        title: 'Water Transmitter Interface',
        limits: { tolerance: '±5%' },
        steps: [
          {
            stepId: '35.1',
            action: 'Apply test voltages (0 to −10V)',
            command: 'signal.applySweep()',
            result: 'PASS',
          },
          {
            stepId: '35.2',
            action: 'Compute deviation',
            command: 'signal.computeError()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 36,
        title: '0–20 mA Output Regulation',
        steps: [
          {
            stepId: '36.1',
            action: 'Apply 4mA, 12mA, 20mA',
            command: 'current.applySweep()',
            result: 'PASS',
          },
          {
            stepId: '36.2',
            action: 'Validate regulation accuracy',
            command: 'current.verify()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 37,
        title: 'Water Level Data Reporting',
        steps: [
          {
            stepId: '37.1',
            action: 'Apply reference inputs',
            command: 'signal.apply(5V,10mA)',
            result: 'PASS',
          },
          {
            stepId: '37.2',
            action: 'Verify HEX data and reporting interval',
            command: 'data.verify(interval<=60)',
            result: 'PASS',
          },
          {
            stepId: '37.3',
            action: 'Simulate transfer failure',
            command: 'comm.fail()',
            expected: 'No residual data',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 38,
        title: 'LoRa RF Test',
        limits: { txPower: '+15/+30dBm', sensitivity: '-140dBm' },
        steps: [
          {
            stepId: '38.1',
            action: 'Select band and configure TX power',
            command: 'lora.config()',
            result: 'PASS',
          },
          {
            stepId: '38.2',
            action: 'Measure output power',
            command: 'rf.measurePower()',
            result: 'PASS',
          },
          {
            stepId: '38.3',
            action: 'Inject sensitivity signal',
            command: 'rf.inject(-140)',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 39,
        title: 'Encryption Test',
        steps: [
          {
            stepId: '39.1',
            action: 'Capture USB-C and LoRa packets',
            command: 'sniffer.capture()',
            result: 'PASS',
          },
          {
            stepId: '39.2',
            action: 'Verify encrypted payload',
            command: 'crypto.verifyEncrypted()',
            result: 'PASS',
          },
        ],
      },
      {
        testId: 40,
        title: 'ETI Test',
        steps: [
          {
            stepId: '40.1',
            action: 'Operate for 2 hours',
            command: 'uut.run(7200)',
            result: 'PASS',
          },
          {
            stepId: '40.2',
            action: 'Verify ETI persistence after reflash and power cycle',
            command: 'eti.read()',
            result: 'PASS',
          },
        ],
      },
    ],
  },
];
