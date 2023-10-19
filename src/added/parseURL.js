/**
 * Функция для разбития URL-адреса на отдельные части
 * @param url - ссылка для парсинга 
 * @returns протокол, hostname, pathname, search, hash
 */
export default function parseURL(url) {
  let a = document.createElement('a');
  a.href = url;
  return {
  protocol: a.protocol,
  hostname: a.hostname,
  port: a.port,
  pathname: a.pathname,
  search: a.search,
  hash: a.hash
  };
}
