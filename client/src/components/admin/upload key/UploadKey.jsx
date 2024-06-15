export default function UploadKey() {
  return <div>
    <h1 className="mb-4">Upload A Key</h1>
    <p className="max-w-[70ch]">You can upload a key to use for grading. You can upload a .csv file with student responses and scores, or a .txt file with student responses only.</p>
    <h2 className="mt-8">Test Name: SAT Math Practice Test</h2>
    <div className="flex items-center gap-4 mt-4 mb-6">
      <div>
        <label htmlFor="file">File</label>
        <input type="text" className="border-2 block p-2 rounded-lg mt-2" placeholder="no file uploaded" />
      </div>
      <div>
        <label htmlFor="uploaded">Upload</label>
        <input type="file" className="border-2 block p-2 rounded-lg mt-2" />
      </div>
    </div>
    <button className="rounded-3xl bg-[#F5F0E5] mr-4">Cancel</button>
    <button className="btn-primary rounded-3xl">Upload</button>
  </div>
}