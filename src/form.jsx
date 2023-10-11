import postFetch from "./fetch";

export default function Form() {

  const handleChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      const blob_str = e.target.result
      const indx = blob_str.indexOf(',')
      const str = blob_str.slice(indx + 1)
      postFetch(file.name, str)

      console.log(str.length);
    })
    reader.readAsDataURL(file);

  }

  return (
    <div className="form_container">
      <input type="file" onChange={(e) => handleChange(e)}/>
    </div>
  )
}
