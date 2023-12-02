/**
 * 
 * Конвертор байт в килобайты и т.д
 */

export default function bytesConverter(bytes) {
  // Найдено в интернете
  if (!Number(bytes)) {
    return '0 Bytes';
  }

  const bytesInKilobytes = 1024;
  const round = 1;
  const sizesText = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(bytesInKilobytes),
  );

  return `${parseFloat(
    (bytes / Math.pow(bytesInKilobytes, index)).toFixed(round),
  )} ${sizesText[index]}`;
}
