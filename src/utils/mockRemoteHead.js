// prettier-ignore
export const mockTestSuites = [
    // ---------------- IoT Gateway Test Cases (IDs 1–18) ----------------
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
