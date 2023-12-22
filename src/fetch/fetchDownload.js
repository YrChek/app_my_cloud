/**
 * Функция сохранения файла на устройстве с заданным именем
 */
export default async function fetchDownloadFile(url, filename) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const down = async (blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
    await down(blob)
    setTimeout(() => URL.revokeObjectURL(url), 0)
    return 'OK'
  } catch (error) {
    console.log(error)
    return 'ERROR'
  }
}
