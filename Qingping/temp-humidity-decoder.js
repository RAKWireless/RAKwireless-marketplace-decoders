function Decoder(bytes, port) 
{
  var decoded = {};

  var deviceAddress = bytes[0].toString(16).toUpperCase();
  var reportCode = bytes[1].toString(16).toUpperCase();
  decoded.deviceAddress = deviceAddress;
  decoded.reportCode = reportCode;

  var dataLength = parseInt(bytes[2].toString(16), 16);
  decoded.dataLength = dataLength;

  var dataType = bytes[3].toString(16).toUpperCase();
  decoded.dataType = dataType;

  if (dataType === "1") 
  {
    var timestampBytes = bytes.slice(4, 8);
    var timestamp = bytesToHex(timestampBytes);
    decoded.timestamp = timestamp;

    var temperatureHumidityBytes = bytes.slice(8, 11);
    var temperatureHumidityHex = bytesToHex(temperatureHumidityBytes);
    var temperatureHumidityValue = parseInt(temperatureHumidityHex, 16);
    var temperature = ((temperatureHumidityValue >> 12) - 500) / 10;
    var humidity = (temperatureHumidityValue & 0xfff) / 10;
    decoded.temperature = temperature;
    decoded.humidity = humidity;

    var UndefinedBytes = bytes.slice(11, 13);
    var UndefinedValue = parseInt(bytesToHex(UndefinedBytes), 16);

    var battery = parseInt(bytes[13].toString(16), 16);
    decoded.battery = battery;

    var versionCodeBytes = bytes.slice(14, 20);
    var versionCode = bytesToHex(versionCodeBytes);
    decoded.versionCode = versionCode;

    var crcBytes = bytes.slice(20, 22);
    var crc = bytesToHex(crcBytes);
    decoded.crc = crc;
  }

  return decoded;
}

function bytesToHex(bytes) 
{
  var hexArray = [];
  for (var i = 0; i < bytes.length; i++) 
  {
    var hex = (bytes[i] & 0xff).toString(16).toUpperCase();
    if (hex.length === 1) 
    {
      hex = '0' + hex;
    }
    hexArray.push(hex);
  }
  return hexArray.join('');
}