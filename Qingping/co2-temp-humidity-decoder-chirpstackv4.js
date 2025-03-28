function decodeUplink(input) {
  var decoded = {};

  var deviceAddress = input.bytes[0].toString(16).toUpperCase();
  var reportCode = input.bytes[1].toString(16).toUpperCase();
  decoded.deviceAddress = deviceAddress;
  decoded.reportCode = reportCode;

  var dataLength = parseInt(input.bytes[2].toString(16), 16);
  decoded.dataLength = dataLength;

  var dataType = input.bytes[3].toString(16).toUpperCase();
  decoded.dataType = dataType;

  if (dataType === "1") {
    var timestampBytes = input.bytes.slice(4, 8);
    var timestamp = bytesToHex(timestampBytes);
    decoded.timestamp = timestamp;

    var temperatureHumidityBytes = input.bytes.slice(8, 11);
    var temperatureHumidityHex = bytesToHex(temperatureHumidityBytes);
    var temperatureHumidityValue = parseInt(temperatureHumidityHex, 16);
    var temperature = ((temperatureHumidityValue >> 12) - 500) / 10;
    var humidity = (temperatureHumidityValue & 0xfff) / 10;
    decoded.temperature = temperature;
    decoded.humidity = humidity;

    var co2Bytes = input.bytes.slice(11, 13);
    var co2Value = parseInt(bytesToHex(co2Bytes), 16);
    decoded.co2 = co2Value;

    var battery = parseInt(input.bytes[13].toString(16), 16);
    decoded.battery = battery;

    var versionCodeBytes = input.bytes.slice(14, 20);
    var versionCode = bytesToHex(versionCodeBytes);
    decoded.versionCode = versionCode;

    var crcBytes = input.bytes.slice(20, 22);
    var crc = bytesToHex(crcBytes);
    decoded.crc = crc;
  }

  // Return the decoded data in the expected format
  return { data: decoded };
}

function bytesToHex(bytes) {
  var hexArray = [];
  for (var i = 0; i < bytes.length; i++) {
    var hex = (bytes[i] & 0xff).toString(16).toUpperCase();
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    hexArray.push(hex);
  }
  return hexArray.join('');
}
